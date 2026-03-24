import { ScrubEngine  } from './scrubEngine.js';
import { TunnelShader } from './tunnelShader.js';

class Portfolio {
  constructor() {
    this.scrubEngine  = null;
    this.tunnelShader = null;
    this._currentScrubFrame = 0;
    this.init();
  }

  async init() {
    // ── 1. Setup engines ────────────────────────────────────────
    const scrubCanvas  = document.getElementById('scrubCanvas');
    const shaderCanvas = document.getElementById('shaderCanvas');

    this.scrubEngine  = new ScrubEngine(scrubCanvas);
    this.tunnelShader = new TunnelShader(shaderCanvas);
    this.tunnelShader.init();

    // ── 2. Load frames with progress bar ────────────────────────
    const bar       = document.getElementById('loadingBar');
    const countEl   = document.getElementById('loadingCount');
    const loadingEl = document.getElementById('loading');

    await this.scrubEngine.loadFrames('Model image/', 190, (progress) => {
      const pct = Math.round(progress * 100);
      bar.style.width    = pct + '%';
      countEl.textContent = pct;
    });

    // ── 3. Hide loading overlay ──────────────────────────────────
    gsap.to(loadingEl, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => { loadingEl.style.display = 'none'; }
    });

    // ── 4. Animate hero text in ──────────────────────────────────
    gsap.to(['.hero-subtitle', '.hero-name', '.hero-title', '.hero-tags'], {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.3
    });

    // ── 5. Wire up everything ────────────────────────────────────
    this.setupScrollTrigger();
    this.setupNavigation();
    this.setupSectionAnimations();
    this.setupProjectFilter();
    this.setupMobileMenu();
  }

  // ── Hero scrub + shader ──────────────────────────────────────
  setupScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const p   = self.progress;
        const idx = Math.min(Math.floor(p * 189), 189);
        this.scrubEngine.render(idx);
        this.tunnelShader.render(p);
        this.tunnelShader._lastProgress = p;
      }
    });
  }

  // ── Smooth scroll + active nav highlight ────────────────────
  setupNavigation() {
    const header  = document.getElementById('site-header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Scroll-based header style
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Smooth scroll on nav click
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile nav if open
        document.getElementById('mobileNav').classList.remove('open');
      });
    });

    // Active nav highlight via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  }

  // ── Section reveal animations ────────────────────────────────
  setupSectionAnimations() {
    // Generic reveal for elements with .reveal class
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObs.observe(el));

    // About section animations
    this._animateAbout();

    // Skills pills stagger
    this._animateSkills();

    // Timeline items
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        opacity: 0,
        x: -40,
        duration: 0.7,
        ease: 'power2.out',
        delay: i * 0.1
      });
    });

    // Project cards
    document.querySelectorAll('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        delay: (i % 3) * 0.1
      });
    });

    // Education + cert cards
    document.querySelectorAll('.edu-card, .cert-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: 'power2.out',
        delay: i * 0.1
      });
    });

    // Contact heading
    gsap.from('.contact-heading', {
      scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });

    // Section titles + labels (other sections only — about handled in _animateAbout)
    document.querySelectorAll('.section-label, .section-title').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out'
      });
    });
  }

  // === ABOUT SECTION ANIMATIONS ===
  _animateAbout() {
    // 1. GSAP scroll reveals
    const aboutTextEls = ['.about-tag', '.at-white', '.at-accent', '.at-outline', '.about-bio', '.about-available'];
    aboutTextEls.forEach((sel, i) => {
      gsap.from(sel, {
        scrollTrigger: { trigger: '#about', start: 'top 80%', once: true },
        opacity: 0, y: 40, duration: 0.7, ease: 'power2.out', delay: i * 0.1
      });
    });

    document.querySelectorAll('.about-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        opacity: 0, scale: 0.95, duration: 0.6, ease: 'power2.out', delay: i * 0.08
      });
    });

    gsap.from('.about-stats', {
      scrollTrigger: { trigger: '.about-stats', start: 'top 85%', once: true },
      opacity: 0, y: 24, duration: 0.6, ease: 'power2.out'
    });

    gsap.from('.about-marquee-wrap', {
      scrollTrigger: { trigger: '.about-marquee-wrap', start: 'top 85%', once: true },
      opacity: 0, duration: 0.8, ease: 'power2.out'
    });

    gsap.from('.about-orbit-section', {
      scrollTrigger: { trigger: '.about-orbit-section', start: 'top 80%', once: true },
      opacity: 0, scale: 0.8, duration: 0.9, ease: 'power3.out'
    });

    // 2. Stats count-up via IntersectionObserver + rAF
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let startTs  = null;
        const dur    = 1200;
        const step   = (ts) => {
          if (!startTs) startTs = ts;
          const p = Math.min((ts - startTs) / dur, 1);
          el.textContent = Math.round(p * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        statsObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.as-num').forEach(el => statsObs.observe(el));

    // 3. Tilt cards — 3D perspective + radial glow on mousemove
    document.querySelectorAll('.about-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
        card.style.transform = `perspective(600px) rotateX(${-dy * 12}deg) rotateY(${dx * 12}deg) scale(1.02)`;
        card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%');
        card.style.setProperty('--my', ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });

    // 4. Orbit item positioning — place each dot at its angle on the ring
    const ringDefs = [
      { selector: '.ring-1', radius: 70 },
      { selector: '.ring-2', radius: 110 },
      { selector: '.ring-3', radius: 155 },
    ];
    ringDefs.forEach(({ selector, radius }) => {
      document.querySelectorAll(`${selector} .orbit-item`).forEach(item => {
        const angle = parseFloat(item.dataset.angle || '0');
        const rad   = (angle - 90) * (Math.PI / 180);
        const x     = Math.cos(rad) * radius;
        const y     = Math.sin(rad) * radius;
        item.style.top  = `calc(50% + ${y}px)`;
        item.style.left = `calc(50% + ${x}px)`;
        item.style.transform = 'translate(-50%, -50%)';
      });
    });
  }

  // === SKILLS ANIMATIONS ===
  _animateSkills() {
    // 1. Header + filter row reveals
    gsap.from('.skills-header', {
      scrollTrigger: { trigger: '#skills', start: 'top 80%', once: true },
      opacity: 0, y: 30, duration: 0.7, ease: 'power2.out'
    });
    gsap.from('.skills-filter-row', {
      scrollTrigger: { trigger: '#skills', start: 'top 75%', once: true },
      opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', delay: 0.2
    });

    // 2. Cards stagger
    document.querySelectorAll('.sk-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        opacity: 0, y: 40, duration: 0.6, ease: 'power2.out', delay: (i % 3) * 0.07
      });
    });

    // 3. Filter tab click handler
    document.querySelectorAll('.sk-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sk-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.sk-card').forEach(card => {
          const match = filter === 'all' || card.dataset.cat === filter;
          if (match) {
            card.classList.remove('hidden');
            gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // 4. Progress bar fill on scroll
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const row = entry.target;
        row.querySelector('.prof-fill').style.width = row.dataset.pct + '%';
        barObs.unobserve(row);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.prof-row').forEach(row => barObs.observe(row));

    // 5. Hex grid stagger + click toggle
    document.querySelectorAll('.hex-item').forEach((hex, i) => {
      gsap.from(hex, {
        scrollTrigger: { trigger: '.skills-hex-grid', start: 'top 90%', once: true },
        opacity: 0, scale: 0, duration: 0.4, ease: 'back.out(1.7)', delay: i * 0.03
      });
      hex.addEventListener('click', () => hex.classList.toggle('lit'));
    });
  }

  // ── Project filter tabs ──────────────────────────────────────
  setupProjectFilter() {
    const btns  = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          if (match) {
            card.classList.remove('hidden');
            gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
          } else {
            card.classList.add('hidden');
          }
        });

        // Refresh ScrollTrigger after DOM changes
        ScrollTrigger.refresh();
      });
    });
  }

  // ── Mobile menu ──────────────────────────────────────────────
  setupMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('mobileNav');

    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

// Boot
new Portfolio();
