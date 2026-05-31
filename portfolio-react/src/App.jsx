import { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import photo from './assets/photo.png';

/* ─── Icon shorthand ─── */
const Icon = ({ name, style }) => (
  <span className="material-symbols-outlined" aria-hidden="true" style={{ fontVariationSettings: '"FILL" 1', ...style }}>
    {name}
  </span>
);

/* ─── Data ─── */
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const STATS = [
  { value: '45%', label: 'Cost Reduction' },
  { value: '40%', label: 'Faster Processing' },
  { value: '7000+', label: 'Teams Beaten' },
  { value: '100%', label: 'Data Integrity' },
];

const EXPERIENCE = [
  {
    date: 'Feb 2026 – Present',
    title: 'Data Engineer',
    company: 'Pacific Data Integrators',
    desc: 'Architected large-scale cloud data integration and modernization initiatives leveraging IDMC, PowerCenter, and Ab Initio—reducing IT costs by 45% and accelerating data processing by 40%. Directed cross-functional agile teams, maintaining near 100% data integrity and system uptime. Engineered scalable data warehouses across Snowflake, Oracle, and MySQL.',
    chips: ['PySpark', 'IDMC', 'Snowflake', 'Airflow', 'Ab Initio'],
    dotColor: 'blue',
    side: 'left',
  },
  {
    date: 'May 2025 – Sep 2025',
    title: 'Full Stack Developer Intern',
    company: 'Joveo',
    desc: 'Created backend APIs in the content management system to detect version differences of published websites. Engineered internal APIs and client-facing interfaces, boosting core feature performance and driving a 25% increase in user engagement.',
    chips: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    dotColor: 'cyan',
    side: 'right',
    certLink: 'https://drive.google.com/file/d/1VS93Q--brXRxfusf0axqHcAikWRqOSQr/view?usp=sharing',
  },
];

const ACHIEVEMENTS = [
  {
    label: 'HACKATHON WINNER', labelColor: 'var(--accent-cyan)', icon: 'workspace_premium',
    title: 'Meesho Dice Hackathon 2024',
    desc: 'First place out of 7,000+ competing teams, demonstrating exceptional problem-solving and rapid technical implementation under pressure.',
    chipText: '1st Place', chipColor: 'rgba(79,219,200,0.2)', chipTextColor: 'var(--accent-cyan)',
    accentClass: 'achievement-card__accent--cyan',
    certLink: 'https://drive.google.com/file/d/1fqLyjv5D361B7Q6-fJT9ClPVzV8MX7OC/view?usp=sharing',
  },
  {
    label: 'NATIONAL FINALIST', labelColor: 'var(--accent-blue)', icon: 'military_tech',
    title: 'ServiceNow Women Code to Win 2025',
    desc: 'Top 5 finalist nationwide, outperforming 56,000 teams in a high-stakes technical challenge requiring algorithmic precision and speed.',
    chipText: 'Top 5 / 56K', chipColor: 'rgba(77,142,255,0.2)', chipTextColor: 'var(--accent-blue)',
    accentClass: 'achievement-card__accent--blue',
    certLink: 'https://drive.google.com/file/d/1iOeSRm1gSJvgfwVo2ALt6mTqbg7MMLaI/view?usp=sharing',
  },
  {
    label: 'NATIONAL EXAM', labelColor: 'var(--accent-purple)', icon: 'school',
    title: 'JEE Mains & Advanced 2021',
    desc: 'Secured a rank within the top 5% of all candidates in both JEE Mains and JEE Advanced, earning admission to IIT (ISM) Dhanbad.',
    chipText: 'Top 5%', chipColor: 'rgba(167,139,250,0.2)', chipTextColor: 'var(--accent-purple)',
    accentClass: 'achievement-card__accent--blue',
  },
  {
    label: 'TALENT AWARD', labelColor: 'var(--accent-pink)', icon: 'stars',
    title: 'Unstoppable Leaders 2025',
    desc: 'Recognized at the Unstop Talent Awards 2025 as one of the Unstoppable Leaders, celebrating outstanding achievement and leadership potential.',
    chipText: 'Unstop 2025', chipColor: 'rgba(244,114,182,0.2)', chipTextColor: 'var(--accent-pink)',
    accentClass: 'achievement-card__accent--cyan',
    certLink: 'https://unstop.com/awards/u/muskan-khan-2450173/2025',
    certLabel: 'View Award',
  },
  {
    label: 'LEADERSHIP', labelColor: 'var(--accent-orange)', icon: 'groups',
    title: 'Technical Head — Concetto 2024',
    desc: "Led the technical wing of IIT (ISM) Dhanbad's official Techno-Management fest, coordinating cross-team logistics and technical events.",
    chipText: 'IIT Dhanbad', chipColor: 'rgba(255,183,134,0.2)', chipTextColor: 'var(--accent-orange)',
    accentClass: 'achievement-card__accent--cyan',
  },
];

const PROJECTS = [
  {
    title: 'End-to-End ETL Pipeline', icon: 'database', color: 'var(--accent-blue)',
    desc: 'Automated ETL pipeline ingesting and transforming 19,000+ sales records from CSV to SQL Server with automated truncation and precision tuning.',
    stat: '19K+ records processed',
  },
  {
    title: 'Stock Market Agent', icon: 'smart_toy', color: 'var(--accent-cyan)',
    desc: 'AI-powered agent using FastAPI, LangChain, and Gemini LLM to deliver Buy/Sell/Hold recommendations with 20% improved decision accuracy.',
    stat: '+20% accuracy',
    link: 'https://github.com/MUSKANKHAN7806/simplify_money_python_api',
  },
  {
    title: 'WhatsApp Analyzer', icon: 'analytics', color: 'var(--accent-orange)',
    desc: 'Data visualization pipeline with flexible regex parsing, platform-aware timestamp handling, and "Loyal Users" detection across 7-day activity windows.',
    stat: 'Real-time metrics',
    link: 'https://github.com/MUSKANKHAN7806/wtsp_analyzer_tool',
  },
];

const SKILLS = [
  { title: 'Languages', icon: 'data_object', items: ['Python', 'Java', 'C++', 'SQL', 'HTML/CSS', 'Shell'] },
  { title: 'Platforms & Tools', icon: 'cloud', items: ['Snowflake', 'AWS', 'GCP', 'Azure AI', 'Databricks', 'Informatica Cloud', 'Kafka', 'Spark', 'Airflow'] },
  { title: 'Frameworks & Concepts', icon: 'hub', items: ['FastAPI', 'React', 'Spring Boot', 'ETL Pipelines', 'AI/ML', 'NLP', 'Power BI', 'Tableau'] },
];

const CERTS = [
  {
    title: 'Informatica Certified Professional', sub: 'Cloud Application Integration Developer R42',
    icon: 'verified', iconClass: 'cert-card__icon--cyan',
    link: 'https://drive.google.com/file/d/1jckkrWCBSIMbdbC0F8Vvp2-gN_0D3CWi/view?usp=sharing',
  },
  {
    title: 'JEE Mains & Advanced 2021', sub: 'Top 5% of all candidates nationwide',
    icon: 'rocket_launch', iconClass: 'cert-card__icon--blue',
  },
];

/* ─── Smooth scroll helper ─── */
function scrollTo(e, href) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ═══════════════════════════════════════════
   APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useScrollReveal();

  // Nav background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.2, rootMargin: '-72px 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── NAV ─── */}
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav__inner container">
          <a className="nav__logo" href="#" onClick={(e) => scrollTo(e, '#about')}>
            Muskan<span>.</span>Khan
          </a>

          <div className="nav__links">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                className={`nav__link t-label${activeSection === l.href.slice(1) ? ' nav__link--active' : ''}`}
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a className="nav__resume t-label" href="https://drive.google.com/file/d/1_JvbBjJStXcKk9GMVFN4-BRakfKTZ3kK/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            Resume
          </a>

          <button
            className={`nav__hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>

        <div className={`nav__mobile-menu${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} className="nav__mobile-link" href={l.href} onClick={(e) => { scrollTo(e, l.href); setMenuOpen(false); }}>
              {l.label}
            </a>
          ))}
          <a className="nav__mobile-link nav__mobile-resume" href="https://drive.google.com/file/d/1_JvbBjJStXcKk9GMVFN4-BRakfKTZ3kK/view?usp=sharing" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            Resume
          </a>
        </div>
      </nav>

      <main>
        {/* ─── HERO ─── */}
        <section className="hero section container" id="about" aria-label="Introduction">
          <div className="orb orb--blue" style={{ top: '-10%', left: '-10%' }} />
          <div className="orb orb--cyan" style={{ top: '40%', right: '-5%' }} />
          <div className="orb orb--purple" style={{ bottom: '-15%', left: '30%' }} />

          <div className="hero__split">
            <div className="hero__text">
              <div className="hero__badge reveal">
                <span className="pulse-dot" />
                <span className="t-code" style={{ color: 'var(--accent-cyan)' }}>OPEN TO OPPORTUNITIES</span>
              </div>

              <p className="hero__subtitle reveal">Hi, I'm Muskan Khan</p>

              <h1 className="t-display hero__title reveal">
                I build <span className="gradient-text">data systems</span> that power intelligent decisions.
              </h1>

              <div className="hero__desc reveal">
                <p className="t-body">
                  Data Engineer at Pacific Data Integrators and IIT Dhanbad graduate, I architect large-scale cloud
                  data integration and ETL pipelines using IDMC, PySpark, and Snowflake—cutting IT costs by 45%
                  and accelerating processing by 40%. From winning the Meesho Dice Hackathon to reaching the Top 5
                  in ServiceNow's national coding challenge, I turn complex data problems into production-ready solutions.
                </p>
              </div>

              <div className="hero__actions reveal">
                <a className="btn btn-primary" href="#projects" onClick={(e) => scrollTo(e, '#projects')}>VIEW WORK</a>
                <a className="btn btn-ghost" href="mailto:muskanapril2002@gmail.com">GET IN TOUCH</a>
                <a className="btn btn-outline" href="https://drive.google.com/file/d/1_JvbBjJStXcKk9GMVFN4-BRakfKTZ3kK/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '6px' }}>download</span>
                  DOWNLOAD RESUME
                </a>
              </div>
            </div>

            <div className="hero__photo reveal">
              <div className="hero__photo-wrapper">
                <img src={photo} alt="Muskan Khan — Data Engineer" width="340" height="420" />
                <div className="hero__photo-glow" />
                <div className="hero__photo-border" />
              </div>
            </div>
          </div>

          <div className="hero__stats reveal">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="hero__stat-value">{s.value}</div>
                <div className="hero__stat-label t-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EXPERIENCE ─── */}
        <section className="section container" id="experience" aria-label="Work experience">
          <header className="section-header reveal">
            <div className="section-header__icon section-header__icon--blue"><Icon name="terminal" /></div>
            <h2 className="t-headline-lg">Experience</h2>
            <div className="section-header__line" />
          </header>

          <div className="timeline" role="list">
            <div className="timeline__line" />
            {EXPERIENCE.map((exp, i) => (
              <article key={i} className={`timeline__item${exp.side === 'right' ? ' timeline__item--right' : ''} reveal`} role="listitem">
                <div className="timeline__date"><span className="t-code">{exp.date}</span></div>
                <div className={`timeline__dot${exp.dotColor === 'cyan' ? ' timeline__dot--cyan' : ''}`} />
                <div className="timeline__content">
                  <div className="card timeline__card">
                    <h3 className="t-headline-md">{exp.title}</h3>
                    <p className="t-code company">{exp.company}</p>
                    <p className="t-body desc">{exp.desc}</p>
                    <div className="timeline__chips">
                      {exp.chips.map((c) => <span key={c} className="chip">{c}</span>)}
                    </div>
                    {exp.certLink && (
                      <div style={{ marginTop: 16 }}>
                        <a className="btn btn-sm btn-cert" href={exp.certLink} target="_blank" rel="noopener noreferrer">
                          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                          View Certificate
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── ACHIEVEMENTS ─── */}
        <section className="section container" id="achievements" aria-label="Achievements">
          <header className="section-header reveal">
            <div className="section-header__icon section-header__icon--orange"><Icon name="trophy" /></div>
            <h2 className="t-headline-lg">Achievements</h2>
            <div className="section-header__line" />
          </header>

          <div className="achievements-grid reveal-stagger">
            {ACHIEVEMENTS.map((a, i) => (
              <article key={i} className="card achievement-card reveal">
                <div className={`achievement-card__accent ${a.accentClass}`} />
                <span className="material-symbols-outlined achievement-card__bg-icon" style={{ color: a.labelColor }}>{a.icon}</span>
                <p className="t-label achievement-card__label" style={{ color: a.labelColor }}>{a.label}</p>
                <h3 className="t-headline-md achievement-card__title">{a.title}</h3>
                <p className="t-body achievement-card__desc">{a.desc}</p>
                <div className="achievement-card__footer">
                  <span className="chip" style={{ borderColor: a.chipColor, color: a.chipTextColor }}>{a.chipText}</span>
                  {a.certLink && (
                    <a className="btn btn-sm btn-cert" href={a.certLink} target="_blank" rel="noopener noreferrer">
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                      {a.certLabel || 'View Certificate'}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section className="section container" id="projects" aria-label="Projects">
          <header className="section-header reveal">
            <div className="section-header__icon section-header__icon--cyan"><Icon name="schema" /></div>
            <h2 className="t-headline-lg">Projects</h2>
            <div className="section-header__line" />
          </header>

          <div className="projects-grid reveal-stagger">
            {PROJECTS.map((p, i) => (
              <article key={i} className="card project-card reveal">
                <div className="project-card__visual">
                  <div className="project-card__visual-gradient" style={{ background: `radial-gradient(ellipse at center, ${p.color} 0%, transparent 70%)` }} />
                  <span className="material-symbols-outlined project-card__visual-icon" style={{ color: p.color }}>{p.icon}</span>
                </div>
                <div className="project-card__body">
                  <h3 className="t-headline-md project-card__title">{p.title}</h3>
                  <p className="t-body project-card__desc">{p.desc}</p>
                  <div className="project-card__stat">
                    <span className="project-card__stat-dot" style={{ background: p.color }} />
                    <span className="t-code">{p.stat}</span>
                  </div>
                  {p.link && (
                    <a className="project-card__link t-label" href={p.link} target="_blank" rel="noopener noreferrer">
                      VIEW REPO <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── SKILLS ─── */}
        <section className="section container" id="skills" aria-label="Technical skills">
          <header className="section-header reveal">
            <div className="section-header__icon section-header__icon--purple"><Icon name="code" /></div>
            <h2 className="t-headline-lg">Technical Skills</h2>
            <div className="section-header__line" />
          </header>

          <div className="skills-container reveal-stagger">
            {SKILLS.map((g, i) => (
              <div key={i} className="card skill-group reveal">
                <div className="skill-group__title">
                  <span className="material-symbols-outlined">{g.icon}</span>
                  <span className="t-label" style={{ color: 'var(--text-primary)' }}>{g.title}</span>
                </div>
                <div className="skill-group__list">
                  {g.items.map((s) => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CERTIFICATIONS ─── */}
        <section className="section container" id="certifications" aria-label="Certifications">
          <header className="section-header reveal">
            <div className="section-header__icon section-header__icon--blue"><Icon name="verified" /></div>
            <h2 className="t-headline-lg">Certifications</h2>
            <div className="section-header__line" />
          </header>

          <div className="certs-grid reveal-stagger">
            {CERTS.map((c, i) => (
              <article key={i} className="card cert-card reveal">
                <div className={`cert-card__icon ${c.iconClass}`}>
                  <span className="material-symbols-outlined">{c.icon}</span>
                </div>
                <div className="cert-card__content">
                  <h3 className="cert-card__title">{c.title}</h3>
                  <p className="t-code cert-card__sub">{c.sub}</p>
                  {c.link && (
                    <a className="btn btn-sm btn-cert" href={c.link} target="_blank" rel="noopener noreferrer">
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                      View Certificate
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ─── CONTACT ─── */}
      <section className="contact section container" id="contact" aria-label="Contact">
        <h2 className="t-section reveal">Get In Touch</h2>
        <p className="section-subtitle reveal t-body">Have a project in mind or want to collaborate? Drop me a message.</p>

        <div className="contact__cards reveal">
          <div className="contact__card">
            <span className="material-symbols-outlined contact__icon">mail</span>
            <div>
              <p className="t-label" style={{ marginBottom: 4 }}>Primary Email</p>
              <a className="contact__link" href="mailto:muskanapril2002@gmail.com">muskanapril2002@gmail.com</a>
            </div>
          </div>
          <div className="contact__card">
            <span className="material-symbols-outlined contact__icon">mail</span>
            <div>
              <p className="t-label" style={{ marginBottom: 4 }}>Secondary Email</p>
              <a className="contact__link" href="mailto:muskanapril27@gmail.com">muskanapril27@gmail.com</a>
            </div>
          </div>
          <div className="contact__card">
            <span className="material-symbols-outlined contact__icon">link</span>
            <div>
              <p className="t-label" style={{ marginBottom: 4 }}>LinkedIn</p>
              <a className="contact__link" href="https://www.linkedin.com/in/muskan-khan-82a04b241/" target="_blank" rel="noopener noreferrer">muskan-khan</a>
            </div>
          </div>
          <div className="contact__card">
            <span className="material-symbols-outlined contact__icon">code</span>
            <div>
              <p className="t-label" style={{ marginBottom: 4 }}>GitHub</p>
              <a className="contact__link" href="https://github.com/MUSKANKHAN7806" target="_blank" rel="noopener noreferrer">MUSKANKHAN7806</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer" role="contentinfo">
        <div className="footer__inner container">
          <p className="footer__copy">&copy; 2025 Muskan Khan. Engineered for Performance.</p>
        </div>
      </footer>
    </>
  );
}
