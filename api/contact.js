const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'info@skeye.ai';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Skeye.ai <info@skeye.ai>';

const requiredFields = ['name', 'email', 'organization', 'interest'];

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function readBody(request) {
  if (request.body && typeof request.body === 'object') {
    return request.body;
  }

  if (typeof request.body === 'string') {
    return JSON.parse(request.body || '{}');
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : {};
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildMessage(form) {
  const rows = [
    ['Name', form.name],
    ['Email', form.email],
    ['Organization', form.organization],
    ['Role', form.role || 'Not provided'],
    ['Interest', form.interest],
    ['Message', form.message || 'No additional notes.'],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const htmlRows = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e8e8e8;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e8e8e8;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>
    `)
    .join('');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.5;">
      <h1 style="font-size:20px;margin:0 0 16px;">New Skeye.ai contact inquiry</h1>
      <table style="border-collapse:collapse;width:100%;max-width:720px;border:1px solid #e8e8e8;">
        ${htmlRows}
      </table>
    </div>
  `;

  return { text, html };
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(503).json({ error: 'Email service is not configured' });
  }

  try {
    const form = await readBody(request);

    const missingField = requiredFields.find((field) => !String(form[field] || '').trim());
    if (missingField || !isValidEmail(form.email)) {
      return response.status(400).json({ error: 'Invalid request' });
    }

    const message = buildMessage(form);
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: form.email,
        subject: `Skeye.ai contact: ${form.organization}`,
        text: message.text,
        html: message.html,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error('Resend contact send failed', errorBody);
      return response.status(502).json({ error: 'Email delivery failed' });
    }

    const data = await resendResponse.json();
    return response.status(200).json({ ok: true, id: data.id });
  } catch (error) {
    console.error('Contact form failed', error);
    return response.status(500).json({ error: 'Contact form failed' });
  }
}
