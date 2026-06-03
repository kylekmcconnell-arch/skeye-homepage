import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ChevronRight,
  CircleDot,
  Eye,
  Mail,
  Menu,
  Plane,
  Radar,
  Shield,
  Target,
  X,
} from 'lucide-react';
import logo from './assets/skeye-logo.png';
import device from './assets/skeye-device.png';
import packaging from './assets/skeye-packaging.jpg';

const CONTACT_EMAIL = 'hello@skeye.ai';
const CONTACT_HREF = `mailto:${CONTACT_EMAIL}?subject=Skeye.ai%20terminal%20airspace%20inquiry`;
const APP_URL = '/app/';

const navItems = [
  { label: 'Layer', href: '#layer' },
  { label: 'Product', href: '#product' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Contact', href: '#contact' },
];

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
  },
  {
    name: 'ADS-B / radio',
    signal: 'Cooperative signals',
    gap: 'Silent aircraft, drones, birds, and unknowns can disappear.',
    tone: 'blue',
  },
  {
    name: 'Human scan',
    signal: 'Visual judgement',
    gap: 'Fatigue, angle, workload, and weather create blind spots.',
    tone: 'gray',
  },
  {
    name: 'Skeye',
    signal: 'Optical AI evidence',
    gap: 'Sees the visible world and produces a timestamped event record.',
    tone: 'cyan',
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
        setHeroProgress(clamp((window.scrollY - heroStart) / heroDistance));
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
        <DefenseSection />
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
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="ghost-link" href={APP_URL}>App</a>
        <a className="contact-button" href={CONTACT_HREF}>
          <Mail size={16} />
          Contact
        </a>
      </div>
      <button className="mobile-menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {menuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a href={APP_URL} onClick={() => setMenuOpen(false)}>App</a>
          <a href={CONTACT_HREF} onClick={() => setMenuOpen(false)}>Contact</a>
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
  const deviceScale = mix(2.18, 0.82, clamp(progress / 0.86));
  const deviceX = mix(-4, 26, clamp(progress / 0.9));
  const deviceY = mix(3, 0, clamp(progress / 0.9));
  const lensOpacity = fadeWindow(progress, 0.2, 0.32, 0.54, 0.7);
  const markerOpacity = fadeWindow(progress, 0.52, 0.62, 0.78, 0.96);
  const finalLift = mix(28, 0, finalOpacity);

  return (
    <section className="hero-sequence" id="top" data-hero-sequence>
      <div className="hero-sticky">
        <div className="hero-film" aria-hidden="true">
          <div className="scan-grid" />
          <div className="scan-sweep" />
          <img
            className="hero-device"
            src={device}
            alt=""
            style={{
              transform: `translate3d(${deviceX}vw, ${deviceY}vh, 0) scale(${deviceScale})`,
            }}
          />
          <div className="lens-field" style={{ opacity: lensOpacity }}>
            <span />
            <span />
            <span />
          </div>
          <div className="runway-line" style={{ opacity: markerOpacity }} />
          <div className="object-marker marker-one" style={{ opacity: markerOpacity }}>pattern traffic</div>
          <div className="object-marker marker-two" style={{ opacity: markerOpacity }}>non-coop target</div>
          <div className="object-marker marker-three" style={{ opacity: markerOpacity }}>drone</div>
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
            <a className="primary-button" href={CONTACT_HREF}>
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
            <div className="layer-name" role="cell">{row.name}</div>
            <div className="layer-bar" role="cell"><span /></div>
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

function DefenseSection() {
  return (
    <section className="section defense-section">
      <div className="defense-copy">
        <p className="eyebrow"><Shield size={14} /> Defense Wedge</p>
        <h2>Defense buyers need an affordable, passive way to see what is in the air.</h2>
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
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <img src={packaging} alt="Skeye product packaging" />
      <div className="contact-copy">
        <p className="eyebrow"><Building2 size={14} /> Work With Skeye</p>
        <h2>Bring optical airspace awareness to your terminal environment.</h2>
        <p>
          We are speaking with airport operators, defense/security teams, autonomous aviation companies, and infrastructure partners evaluating the low altitude layer.
        </p>
        <a className="primary-button" href={CONTACT_HREF}>
          Contact {CONTACT_EMAIL}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="Skeye.ai" />
      <div>
        <a href={APP_URL}>Skeye app</a>
        <a href="https://x.com/skeyeai">X</a>
        <a href={CONTACT_HREF}>Contact</a>
      </div>
      <p>© 2026 Skeye.ai. All rights reserved.</p>
    </footer>
  );
}

export default App;
