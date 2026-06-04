import { useEffect, useState } from 'react';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js';
import Bot from 'lucide-react/dist/esm/icons/bot.js';
import Building2 from 'lucide-react/dist/esm/icons/building-2.js';
import Check from 'lucide-react/dist/esm/icons/check.js';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.js';
import CircleDot from 'lucide-react/dist/esm/icons/circle-dot.js';
import Eye from 'lucide-react/dist/esm/icons/eye.js';
import Menu from 'lucide-react/dist/esm/icons/menu.js';
import Plane from 'lucide-react/dist/esm/icons/plane.js';
import Radar from 'lucide-react/dist/esm/icons/radar.js';
import Shield from 'lucide-react/dist/esm/icons/shield.js';
import Target from 'lucide-react/dist/esm/icons/target.js';
import UsersRound from 'lucide-react/dist/esm/icons/users-round.js';
import X from 'lucide-react/dist/esm/icons/x.js';
import logo from './assets/skeye-logo.png';
import device from './assets/skeye-device.png';
import packaging from './assets/skeye-packaging.jpg';
import heroStartVideo from './assets/skeye-homepage-start.mp4';
import heroPoster from './assets/skeye-hero-poster.jpg';
import connorPhoto from './assets/team-connor-smith.png';
import robertPhoto from './assets/team-robert-mack.png';
import kylePhoto from './assets/team-kyle-mcconnell.png';
import aarronPhoto from './assets/team-aarron-deliu.png';
import enigmaPhoto from './assets/advisor-enigmafund.png';
import joaoPhoto from './assets/advisor-joao-amaral.png';

const CONTACT_EMAIL = 'info@skeye.ai';
const APP_URL = '/app/';

const heroScenes = [
  {
    kicker: 'Skeye.ai',
    line: 'A camera node for the low altitude layer.',
  },
  {
    kicker: 'Optical AI',
    line: 'Detect. Classify. Track. Verify.',
  },
  {
    kicker: 'Terminal Environment Operations',
    line: 'Turn visible airspace into searchable evidence.',
  },
];

const layerRows = [
  {
    name: 'Radar',
    signal: 'Range + velocity',
    gap: 'Limited context on small, ambiguous, low altitude objects.',
    tone: 'amber',
    coverage: '48%',
  },
  {
    name: 'ADS-B / radio',
    signal: 'Cooperative signals',
    gap: 'Silent aircraft, drones, birds, and unknowns can disappear.',
    tone: 'slate',
    coverage: '45%',
  },
  {
    name: 'Human scan',
    signal: 'Visual judgement',
    gap: 'Fatigue, angle, workload, and weather create blind spots.',
    tone: 'gray',
    coverage: '42%',
  },
  {
    name: 'Skeye',
    signal: 'Optical AI evidence',
    gap: 'Sees the visible world and produces a timestamped event record.',
    tone: 'accent',
    coverage: '94%',
  },
];

const capabilities = [
  { value: '360 deg', label: 'Optical observation from a ground node' },
  { value: '1.7 km', label: 'Current pilot validation range' },
  { value: 'Always-on', label: 'Timestamped clips and metadata' },
  { value: 'Passive', label: 'No emissions, no spectrum coordination' },
];

const useCases = [
  {
    icon: Plane,
    title: 'Airport Safety',
    text: 'Give non-towered and towered airports a visual layer around runways, pattern traffic, and terminal operations.',
  },
  {
    icon: Shield,
    title: 'Defense + Security',
    text: 'Add an affordable passive sensor that complements radar, RF, command systems, and response workflows.',
  },
  {
    icon: Bot,
    title: 'Autonomous Operations',
    text: 'Support vertiports, launch corridors, and recovery zones with local evidence for low altitude traffic.',
  },
];

const workflow = ['Detect', 'Classify', 'Track', 'Verify', 'Record'];

const coreTeam = [
  {
    name: 'Connor Smith',
    role: 'Founder / CTO',
    photo: connorPhoto,
    bio: 'Aerospace and defense industry engineer with hardware engineering experience at IBM, executive experience at an IoT firm, and prior Northrop Grumman work.',
  },
  {
    name: 'Robert Mack',
    role: 'Founder / CEO',
    photo: robertPhoto,
    bio: 'Former U.S. Navy F/A-18E pilot and T-45C instructor pilot with 10+ years in strategic planning, personnel management, and operational leadership.',
  },
  {
    name: 'Kyle McConnell',
    role: 'Founder',
    photo: kylePhoto,
    bio: 'Former CEO of Dubbz, backed by Alliance.xyz, with deep experience in blockchain communities, product strategy, and early-stage go-to-market.',
  },
  {
    name: 'Aarron Deliu',
    role: 'CMO',
    photo: aarronPhoto,
    bio: 'Airshow and air race pilot with 10+ years of public relations experience and aviation-native credibility across enthusiast and operator communities.',
  },
];

const advisors = [
  { name: 'EnigmaFund', photo: enigmaPhoto },
  { name: 'João Amaral', photo: joaoPhoto },
];

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const mix = (from, to, progress) => from + (to - from) * progress;
const fadeWindow = (progress, start, peakStart, peakEnd, end) => {
  if (progress < start || progress > end) return 0;
  if (progress < peakStart) return clamp((progress - start) / (peakStart - start));
  if (progress > peakEnd) return clamp((end - progress) / (end - peakEnd));
  return 1;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / max, 1));

      const hero = document.querySelector('[data-hero-sequence]');
      if (hero) {
        const heroStart = hero.offsetTop;
        const heroDistance = Math.max(hero.offsetHeight - window.innerHeight, 1);
        const nextHeroProgress = clamp((window.scrollY - heroStart) / heroDistance);
        setHeroProgress(nextHeroProgress);
      }
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className={`site ${heroProgress < 0.84 ? 'is-hero-intro' : ''}`} style={{ '--scroll': scrollProgress, '--hero-progress': heroProgress }}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero progress={heroProgress} />
        <LayerSection />
        <ProductSection />
        <UseCases />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="header">
      <a className="brand" href="#top" aria-label="Skeye.ai home">
        <img src={logo} alt="Skeye.ai" />
      </a>
      <div className="header-actions">
        <a className="ghost-link" href={APP_URL}>Open app</a>
        <a className="contact-button" href="#contact">
          Contact us
        </a>
      </div>
      <button className="mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {menuOpen && (
        <div className="mobile-nav">
          <a href={APP_URL} onClick={() => setMenuOpen(false)}>Open app</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact us</a>
        </div>
      )}
    </header>
  );
}

function Hero({ progress }) {
  const sceneOpacities = [
    fadeWindow(progress, 0.28, 0.36, 0.44, 0.52),
    fadeWindow(progress, 0.52, 0.6, 0.66, 0.72),
    fadeWindow(progress, 0.72, 0.78, 0.82, 0.88),
  ];
  const finalOpacity = clamp((progress - 0.86) / 0.12);
  const finalLift = mix(28, 0, finalOpacity);

  return (
    <section className="hero-sequence" id="top" data-hero-sequence>
      <div className="hero-sticky">
        <div className="hero-film" aria-hidden="true">
          <video
            className="hero-start-video"
            src={heroStartVideo}
            autoPlay
            loop
            muted
            playsInline
            poster={heroPoster}
            preload="auto"
            onLoadedData={(event) => event.currentTarget.play().catch(() => {})}
          />
          <div className="hero-video-vignette" />
        </div>

        <div className="hero-scenes" aria-label="Skeye positioning">
          {heroScenes.map((scene, index) => (
            <div
              className="hero-scene"
              key={scene.line}
              style={{
                opacity: sceneOpacities[index],
                transform: `translate3d(0, ${mix(16, 0, sceneOpacities[index])}px, 0)`,
              }}
            >
              <p>{scene.kicker}</p>
              <strong>{scene.line}</strong>
            </div>
          ))}
        </div>

        <div
          className="hero-content"
          style={{
            opacity: finalOpacity,
            transform: `translate3d(0, ${finalLift}px, 0)`,
          }}
        >
          <p className="eyebrow"><CircleDot size={14} /> Terminal Environment Operations</p>
          <h1>Optical airspace awareness for the low altitude world.</h1>
          <p className="hero-copy">
            Ground-based AI camera nodes that detect, classify, track, and verify cooperative and non-cooperative objects around runways, vertiports, critical sites, and the open sky.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              Contact us
              <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#product">See the node</a>
          </div>
        </div>

        <div className="hero-footer" aria-label="Skeye markets">
          <span>Airport safety</span>
          <span>Defense/security</span>
          <span>Autonomous launch</span>
          <span>Event evidence</span>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span />
          Scroll
        </div>
      </div>
    </section>
  );
}

function LayerSection() {
  return (
    <section className="section layer-section" id="layer">
      <img className="layer-background" src={packaging} alt="" aria-hidden="true" />
      <div className="section-heading">
        <p className="eyebrow"><Radar size={14} /> The Missing Layer</p>
        <h2>Terminal operations need a low altitude layer.</h2>
        <p>
          Existing systems were not built to make every visible object near the ground observable, attributable, and reviewable.
        </p>
      </div>
      <div className="layer-table" role="table" aria-label="Airspace awareness layer comparison">
        {layerRows.map((row) => (
          <div className={`layer-row ${row.tone}`} key={row.name} role="row">
            <div className="layer-name" role="cell"><span>{row.name}</span></div>
            <div className="layer-meter" role="cell" style={{ '--meter': row.coverage }}><span /></div>
            <div className="layer-signal" role="cell">{row.signal}</div>
            <div className="layer-gap" role="cell">{row.gap}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section className="section product-section" id="product">
      <img className="product-atmosphere" src={packaging} alt="" aria-hidden="true" />
      <div className="product-visual">
        <img src={device} alt="Skeye optical camera node" />
        <div className="range-plane" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="product-copy">
        <p className="eyebrow"><Eye size={14} /> Skeye Optical Node</p>
        <h2>A passive camera layer that installs like infrastructure.</h2>
        <p>
          Skeye is designed to sit near the runway environment or site perimeter and continuously convert the visible low altitude world into searchable, signed event records.
        </p>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <div className="capability" key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="section use-cases" id="use-cases">
      <img className="use-cases-background" src={packaging} alt="" aria-hidden="true" />
      <div className="section-heading centered">
        <p className="eyebrow"><Target size={14} /> Where Skeye Fits</p>
        <h2>One optical layer, multiple operating contexts.</h2>
      </div>
      <div className="use-case-grid">
        {useCases.map(({ icon: Icon, title, text }) => (
          <article className="use-card" key={title}>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className="workflow" aria-label="Skeye event workflow">
        {workflow.map((item, index) => (
          <div className="workflow-step" key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{item}</strong>
            {index < workflow.length - 1 && <ChevronRight size={18} />}
          </div>
        ))}
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="section team-section" id="team">
      <img className="team-background" src={packaging} alt="" aria-hidden="true" />
      <div className="section-heading">
        <p className="eyebrow"><UsersRound size={14} /> Core Team</p>
        <h2>Operators, engineers, aviators, and company builders.</h2>
        <p>
          Skeye brings together aerospace, defense, naval aviation, hardware, PR, and blockchain experience around a practical optical airspace layer.
        </p>
      </div>
      <div className="team-grid">
        {coreTeam.map((member) => (
          <article className="team-card" key={member.name}>
            <img className="team-photo" src={member.photo} alt={member.name} />
            <div>
              <h3>{member.name}</h3>
              <span>{member.role}</span>
              <p>{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="advisor-panel" aria-label="Backer and advisor">
        <p className="eyebrow">Backer / Advisor</p>
        <div className="advisor-grid">
          {advisors.map((advisor) => (
            <article className="advisor-card" key={advisor.name}>
              <img className="team-photo small" src={advisor.photo} alt={advisor.name} />
              <div>
                <h3>{advisor.name}</h3>
                <span>Backer / Advisor</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DefenseSection() {
  return (
    <div className="defense-section" aria-labelledby="defense-heading">
      <div className="defense-copy">
        <p className="eyebrow"><Shield size={14} /> Defense Wedge</p>
        <h2 id="defense-heading">Defense buyers need an affordable, passive way to see what is in the air.</h2>
        <p>
          Skeye is not another shooter-first system. It is a visual evidence layer that helps operators understand low altitude events before response decisions are made.
        </p>
      </div>
      <div className="defense-panel">
        {[
          'Complements radar, RF, command systems, and response tools.',
          'Reduces cost and complexity versus specialist-only C-UAS workflows.',
          'Creates timestamped evidence for review, training, and escalation.',
        ].map((item) => (
          <div className="proof-point" key={item}>
            <Check size={18} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <img className="contact-background" src={packaging} alt="" aria-hidden="true" />
      <div className="contact-stack">
        <DefenseSection />
        <div className="contact-content">
          <div className="contact-copy">
            <p className="eyebrow"><Building2 size={14} /> Contact Us</p>
            <h2>Bring optical airspace awareness to your terminal environment.</h2>
            <p>
              We are speaking with airport operators, defense/security teams, autonomous aviation companies, and infrastructure partners evaluating the low altitude layer.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    interest: 'Airport safety',
    message: '',
  });
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (submitState.status !== 'idle') {
      setSubmitState({ status: 'idle', message: '' });
    }
  };

  const buildMailto = () => {
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Organization: ${form.organization}`,
      `Role: ${form.role || 'Not provided'}`,
      `Interest: ${form.interest}`,
      '',
      form.message || 'No additional notes.',
    ].join('\n');
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Skeye.ai contact')}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitState({ status: 'submitting', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSubmitState({
        status: 'success',
        message: 'Message sent. We will follow up shortly.',
      });
      setForm({
        name: '',
        email: '',
        organization: '',
        role: '',
        interest: 'Airport safety',
        message: '',
      });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: `Could not send automatically. Email ${CONTACT_EMAIL} directly.`,
      });
    }
  };

  const isSubmitting = submitState.status === 'submitting';

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Name
          <input name="name" value={form.name} onChange={updateField} autoComplete="name" required />
        </label>
        <label>
          Work email
          <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Organization
          <input name="organization" value={form.organization} onChange={updateField} autoComplete="organization" required />
        </label>
        <label>
          Role
          <input name="role" value={form.role} onChange={updateField} autoComplete="organization-title" />
        </label>
      </div>
      <label>
        Primary interest
        <select name="interest" value={form.interest} onChange={updateField}>
          <option>Airport safety</option>
          <option>Defense + security</option>
          <option>Autonomous operations</option>
          <option>Infrastructure partnership</option>
        </select>
      </label>
      <label>
        What are you evaluating?
        <textarea name="message" value={form.message} onChange={updateField} rows="4" placeholder="Tell us about your site, runway environment, or operating context." />
      </label>
      {submitState.message && (
        <p className={`form-status ${submitState.status}`} role="status">
          {submitState.message}
        </p>
      )}
      {submitState.status === 'error' && (
        <a className="form-fallback" href={buildMailto()}>
          Open email instead
        </a>
      )}
      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Contact us'}
        <ArrowRight size={18} />
      </button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Skeye.ai" />
      <p>© 2026 Skeye.ai. All rights reserved.</p>
    </footer>
  );
}

export default App;
