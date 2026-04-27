/* ═══════════════════════════════════════════════════════════
   QUST — main.js  |  GSAP + UI interactions
   ═══════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

const PAGE = document.body.dataset.page;
// pages: home | catalog | about | archive | newdrop

/* ═══════════════════════════════════════════════════════════
   CURSOR
   ═══════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = -300, my = -300, rx = -300, ry = -300;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .card, .filter-btn, .btn-ghost, .about-snap__media, .about-hero__media').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor--hover'));
  });
})();

/* ═══════════════════════════════════════════════════════════
   NAV — switch to light after hero
   ═══════════════════════════════════════════════════════════ */
(function initNav() {
  const nav  = document.querySelector('.nav');
  if (!nav) return;

  const hero = document.querySelector('.hero, .cat-header, .about-hero');
  if (!hero) { nav.classList.add('nav--light'); return; }

  // catalog & about pages have no dark hero — go light immediately
  if (PAGE === 'catalog' || PAGE === 'about') {
    nav.classList.add('nav--light');
    return;
  }

  const threshold = hero.offsetHeight * 0.82;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--light', window.scrollY > threshold);
  }, { passive: true });

  // active link
  const cur = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav__links a').forEach(a => {
    if (a.getAttribute('href') === cur) a.classList.add('active');
  });
})();

/* ═══════════════════════════════════════════════════════════
   PAGE ENTRANCE — one-time GSAP on load
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  // reveal page
  gsap.to('.page', { opacity: 1, duration: 0.01 });

  if (PAGE === 'home')    animHome();
  if (PAGE === 'catalog') animCatalog();
  if (PAGE === 'about')   animAbout();
  if (PAGE === 'archive') animArchive();
  if (PAGE === 'newdrop') animNewDrop();
});

/* ── HOME ───────────────────────────────────────────────────── */
function animHome() {
  /* entrance */
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.nav__logo',       { opacity: 0, y: -10, duration: .8 }, .25)
    .from('.nav__links li',   { opacity: 0, y: -8, stagger: .08, duration: .65 }, .35)
    .from('.hero__eyebrow',   { opacity: 0, y: 22, duration: .9 }, .4)
    .from('.hero__title',     { opacity: 0, y: 64, duration: 1.15 }, .55)
    .from('.hero__scroll',    { opacity: 0, duration: .8 }, 1.1);

  /* hero parallax */
  const media = document.querySelector('.hero__media');
  if (media) {
    gsap.to(media, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* featured — scroll, once */
  gsap.from('.featured__header', {
    y: 38, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.featured', start: 'top 86%', once: true }
  });
  gsap.from('.featured .card', {
    y: 55, opacity: 0, stagger: .14, duration: 1.05, ease: 'power3.out',
    scrollTrigger: { trigger: '.featured__grid', start: 'top 84%', once: true }
  });

  /* manifesto */
  gsap.from('.manifesto__headline', {
    y: 48, opacity: 0, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.manifesto', start: 'top 82%', once: true }
  });
  gsap.from('.manifesto__body', {
    y: 26, opacity: 0, duration: .9, ease: 'power3.out', delay: .2,
    scrollTrigger: { trigger: '.manifesto', start: 'top 80%', once: true }
  });

  /* grad band */
  gsap.from('.grad-band__label', {
    opacity: 0, y: 16, duration: .9, ease: 'power3.out',
    scrollTrigger: { trigger: '.grad-band', start: 'top 82%', once: true }
  });

  /* about snap */
  gsap.from('.about-snap__media', {
    x: -44, opacity: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-snap', start: 'top 82%', once: true }
  });
  gsap.from('.about-snap__body > *', {
    y: 32, opacity: 0, stagger: .12, duration: .9, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-snap__body', start: 'top 82%', once: true }
  });
}

/* ── CATALOG ────────────────────────────────────────────────── */
function animCatalog() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.nav__logo',          { opacity: 0, y: -10, duration: .8 }, .2)
    .from('.nav__links li',      { opacity: 0, y: -8, stagger: .08, duration: .65 }, .3)
    .from('.cat-header__title',  { y: 72, opacity: 0, duration: 1.2 }, .28)
    .from('.cat-header__row',    { y: 24, opacity: 0, duration: .8 }, .72);

  gsap.from('.cat-grid .card', {
    y: 48, opacity: 0, stagger: { amount: .55, from: 'start' }, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.cat-grid', start: 'top 88%', once: true }
  });
}

/* ── ABOUT ──────────────────────────────────────────────────── */
function animAbout() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.nav__logo',          { opacity: 0, y: -10, duration: .8 }, .2)
    .from('.nav__links li',      { opacity: 0, y: -8, stagger: .08, duration: .65 }, .3)
    .from('.about-hero__media',  { x: -52, opacity: 0, duration: 1.3 }, .22)
    .from('.about-hero__label',  { y: 18, opacity: 0, duration: .8 }, .58)
    .from('.about-hero__title',  { y: 38, opacity: 0, duration: 1.0 }, .68)
    .from('.about-hero__text',   { y: 26, opacity: 0, duration: .9 }, .86)
    .from('.about-hero__meta',   { y: 16, opacity: 0, duration: .7 }, 1.02);

  gsap.from('.value-item', {
    y: 40, opacity: 0, stagger: .14, duration: .95, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-values', start: 'top 84%', once: true }
  });

  gsap.from('.about-quote__text', {
    y: 50, opacity: 0, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-quote', start: 'top 82%', once: true }
  });
  gsap.from('.about-quote__attr', {
    y: 20, opacity: 0, duration: .8, ease: 'power3.out', delay: .25,
    scrollTrigger: { trigger: '.about-quote', start: 'top 80%', once: true }
  });
}

/* ── ARCHIVE ────────────────────────────────────────────────── */
function animArchive() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.nav__logo',              { opacity: 0, y: -10, duration: .8 }, .2)
    .from('.nav__links li',          { opacity: 0, y: -8, stagger: .08, duration: .65 }, .3)
    .from('.archive-header__label',  { opacity: 0, y: 16, duration: .8 }, .3)
    .from('.archive-header__title',  { opacity: 0, y: 72, duration: 1.2 }, .4)
    .from('.archive-header__sub',    { opacity: 0, y: 24, duration: .85 }, .78)
    .from('.archive-seasons',        { opacity: 0, y: 18, duration: .7 }, .9);

  gsap.from('.arch-item', {
    y: 44, opacity: 0, stagger: { amount: .6, from: 'start' }, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.archive-grid', start: 'top 86%', once: true }
  });
}

/* ── NEW DROP ───────────────────────────────────────────────── */
function animNewDrop() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.nav__logo',         { opacity: 0, y: -10, duration: .8 }, .2)
    .from('.nav__links li',     { opacity: 0, y: -8, stagger: .08, duration: .65 }, .3)
    .from('.drop-hero__kicker', { opacity: 0, y: 18, duration: .85 }, .35)
    .from('.drop-hero__title',  { opacity: 0, y: 72, duration: 1.2 }, .5)
    .from('.drop-hero__date',   { opacity: 0, y: 14, duration: .7 }, .95)
    .from('.drop-hero__scroll', { opacity: 0, duration: .7 }, 1.05);

  const media = document.querySelector('.drop-hero__media');
  if (media) {
    gsap.to(media, {
      yPercent: 22, ease: 'none',
      scrollTrigger: { trigger: '.drop-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  gsap.from('.drop-intro > *', {
    y: 28, opacity: 0, stagger: .12, duration: .9, ease: 'power3.out',
    scrollTrigger: { trigger: '.drop-intro', start: 'top 86%', once: true }
  });

  gsap.from('.drop-feature', {
    y: 40, opacity: 0, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.drop-feature', start: 'top 84%', once: true }
  });

  gsap.from('.drop-grid .card', {
    y: 52, opacity: 0, stagger: .14, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.drop-grid', start: 'top 84%', once: true }
  });
}

/* ═══════════════════════════════════════════════════════════
   FILTERS  (catalog page)
   ═══════════════════════════════════════════════════════════ */
(function initFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.cat-grid .card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const f = btn.dataset.filter;
      cards.forEach(card => {
        const visible = f === 'all' || card.dataset.cat === f;
        gsap.to(card, {
          opacity: visible ? 1 : .18,
          scale:   visible ? 1 : .97,
          duration: .42,
          ease: 'power2.out'
        });
      });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   SEASON FILTER  (archive page)
   ═══════════════════════════════════════════════════════════ */
(function initSeasonFilter() {
  const btns   = document.querySelectorAll('.season-btn');
  const blocks = document.querySelectorAll('.archive-season-block');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const season = btn.dataset.season;

      blocks.forEach(block => {
        const match = season === 'all' || block.dataset.season === season;
        if (match) {
          block.classList.remove('hidden');
          gsap.fromTo(block,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }
          );
        } else {
          gsap.to(block, {
            opacity: 0, y: -12, duration: .35, ease: 'power2.in',
            onComplete: () => block.classList.add('hidden')
          });
        }
      });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   LIGHTBOX  (archive page)
   ═══════════════════════════════════════════════════════════ */
(function initLightbox() {
  const lb       = document.getElementById('lightbox');
  const backdrop = document.getElementById('lbBackdrop');
  const lbMedia  = document.getElementById('lbMedia');
  const lbName   = document.getElementById('lbName');
  const lbSeason = document.getElementById('lbSeason');
  const lbClose  = document.getElementById('lbClose');
  if (!lb) return;

  document.querySelectorAll('.arch-item').forEach(item => {
    item.addEventListener('click', () => {
      const name   = item.querySelector('.arch-item__name')?.textContent || '';
      const season = item.querySelector('.arch-item__meta')?.textContent  || '';

      // clone media
      lbMedia.innerHTML = '';
      const clone = item.querySelector('.arch-item__media').cloneNode(true);
      clone.style.cssText = 'position:relative;width:100%;height:480px;';
      lbMedia.appendChild(clone);

      lbName.textContent   = name;
      lbSeason.textContent = season;

      lb.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLb() {
    lb.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose?.addEventListener('click', closeLb);
  backdrop?.addEventListener('click', closeLb);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
})();
