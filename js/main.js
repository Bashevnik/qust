/* ═══════════════════════════════════════════════
   QUST — Main JavaScript
   GSAP + ScrollTrigger + Custom interactions
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── Utilities ── */
const qs  = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

/* ── Text split helpers ── */
function splitChars(el) {
  const text = el.textContent;
  el.innerHTML = '';
  el.setAttribute('aria-label', text);
  return text.split('').map(ch => {
    const s = document.createElement('span');
    s.className = 'char';
    s.textContent = ch === ' ' ? ' ' : ch;
    s.style.display = 'inline-block';
    el.appendChild(s);
    return s;
  });
}

function splitWords(el) {
  const text = el.textContent.trim();
  el.innerHTML = '';
  el.setAttribute('aria-label', text);
  return text.split(' ').map((word, i, arr) => {
    const wrap = document.createElement('span');
    wrap.style.cssText = 'overflow:hidden;display:inline-block;vertical-align:bottom';
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word + (i < arr.length - 1 ? ' ' : '');
    span.style.display = 'inline-block';
    wrap.appendChild(span);
    el.appendChild(wrap);
    return span;
  });
}

/* ══════════════════════════════════
   PRELOADER
   ══════════════════════════════════ */
function initPreloader() {
  const preloader = qs('.preloader');
  if (!preloader) return;

  const logoEl   = qs('.preloader__logo', preloader);
  const lineEl   = qs('.preloader__line', preloader);
  const counterEl = qs('.preloader__counter', preloader);

  /* Split logo chars and hide them */
  let chars = [];
  if (logoEl) {
    chars = splitChars(logoEl);
    gsap.set(chars, { yPercent: 120 });
  }

  /* Counter object */
  const counter = { val: 0 };

  const tl = gsap.timeline({
    onComplete() {
      preloader.style.pointerEvents = 'none';
      document.body.classList.add('loaded');
      initPageAnimations();
    }
  });

  /* Chars reveal */
  if (chars.length) {
    tl.to(chars, {
      yPercent: 0,
      duration: 1.0,
      stagger: 0.055,
      ease: 'power3.out'
    }, 0);
  }

  /* Line fill */
  if (lineEl) {
    tl.to(lineEl, {
      width: '80%',
      duration: 2.0,
      ease: 'power2.inOut'
    }, 0);
  }

  /* Counter increment */
  if (counterEl) {
    tl.to(counter, {
      val: 100,
      duration: 2.0,
      ease: 'power2.inOut',
      onUpdate() {
        counterEl.textContent = String(Math.round(counter.val)).padStart(3, '0') + '%';
      }
    }, 0);
  }

  /* Slide out */
  tl.to(preloader, {
    yPercent: -100,
    duration: 0.85,
    ease: 'power3.inOut',
    delay: 0.15
  });
}

/* ══════════════════════════════════
   CUSTOM CURSOR
   ══════════════════════════════════ */
function initCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const dot  = qs('.cursor-dot');
  const ring = qs('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

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

  /* Hover states */
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a, button, .product-card, .color-dot, .filter-option, .products-sort__opt, .btn');
    if (el) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    const el = e.target.closest('a, button, .product-card, .color-dot, .filter-option, .products-sort__opt, .btn');
    if (el) document.body.classList.remove('cursor-hover');
  });
}

/* ══════════════════════════════════
   NAVIGATION
   ══════════════════════════════════ */
function initNav() {
  const nav = qs('.nav');
  if (!nav) return;

  /* Scroll glass effect */
  ScrollTrigger.create({
    start: 60,
    onEnter:    () => nav.classList.add('scrolled'),
    onLeaveBack:() => nav.classList.remove('scrolled')
  });

  /* Active link */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.nav__link', nav).forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* Mobile menu */
  const menuBtn  = qs('.nav__menu-btn');
  const mobileMenu = qs('.mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  let open = false;
  const spans = qsa('span', menuBtn);

  menuBtn.addEventListener('click', () => {
    open = !open;
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      gsap.to(spans[0], { rotation: 45,  y: 6,  duration: 0.4, ease: 'power3.out' });
      gsap.to(spans[1], { opacity: 0,           duration: 0.2 });
      gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.4, ease: 'power3.out' });
      gsap.fromTo(
        qsa('.mobile-menu__link span', mobileMenu),
        { yPercent: 105 },
        { yPercent: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', delay: 0.05 }
      );
    } else {
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.4, ease: 'power3.out' });
      gsap.to(spans[1], { opacity: 1,         duration: 0.4 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.4, ease: 'power3.out' });
    }
  });

  qsa('.mobile-menu__link', mobileMenu).forEach(l => {
    l.addEventListener('click', () => {
      open = false;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ══════════════════════════════════
   PAGE ANIMATIONS — dispatcher
   ══════════════════════════════════ */
function initPageAnimations() {
  initScrollAnimations();

  const page = document.body.dataset.page;
  if (page === 'home')    initHomeAnimations();
  if (page === 'catalog') initCatalogPage();
  if (page === 'about')   initAboutAnimations();
}

/* ══════════════════════════════════
   SHARED SCROLL ANIMATIONS
   ══════════════════════════════════ */
function initScrollAnimations() {
  /* Generic will-animate */
  qsa('.will-animate').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  /* data-anim="title" — word reveal */
  qsa('[data-anim="title"]').forEach(el => {
    const words = splitWords(el);
    gsap.fromTo(words,
      { yPercent: 112 },
      {
        yPercent: 0, duration: 0.9, stagger: 0.065, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      }
    );
  });

  /* data-anim="stagger" — children stagger */
  qsa('[data-anim="stagger"]').forEach(container => {
    const items = qsa(':scope > *', container);
    gsap.fromTo(items,
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: container, start: 'top 84%', once: true }
      }
    );
  });

  /* data-anim="fade" */
  qsa('[data-anim="fade"]').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0 },
      {
        opacity: 1, duration: 1.1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  /* Parallax elements */
  qsa('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.25;
    gsap.to(el, {
      yPercent: speed * 100, ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom', end: 'bottom top',
        scrub: true
      }
    });
  });
}

/* ══════════════════════════════════
   HOME PAGE ANIMATIONS
   ══════════════════════════════════ */
function initHomeAnimations() {
  /* Hero title — НЕ анимируем отдельно, preloader уже показал "qust".
     Просто делаем остальные элементы hero видимыми последовательно. */
  gsap.fromTo('.hero__label',    { opacity:0, y:16 }, { opacity:1, y:0, duration:0.8, ease:'power3.out', delay:0.15 });
  gsap.fromTo('.hero__subtitle', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, ease:'power3.out', delay:0.3 });
  gsap.fromTo('.hero__cta',      { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, ease:'power3.out', delay:0.45 });
  gsap.fromTo('.hero__meta',     { opacity:0 },       { opacity:1,       duration:1.0, ease:'power2.out', delay:0.8 });

  /* Hero noise parallax */
  gsap.to('.hero__noise', {
    yPercent: 12, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* Featured grid stagger */
  const featCards = qsa('.featured__grid .product-card');
  if (featCards.length) {
    gsap.fromTo(featCards,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.featured__grid', start: 'top 82%', once: true }
      }
    );
  }

  /* Drop banner title chars */
  const dropTitle = qs('.drop-banner__title');
  if (dropTitle) {
    const chars = splitChars(dropTitle);
    gsap.fromTo(chars,
      { yPercent: 115 },
      {
        yPercent: 0, duration: 1.0, stagger: 0.025, ease: 'power4.out',
        scrollTrigger: { trigger: '.drop-banner', start: 'top 76%', once: true }
      }
    );
  }

  gsap.fromTo('.drop-banner__eyebrow',
    { opacity:0, x:-24 },
    { opacity:1, x:0, duration:0.8, ease:'power3.out',
      scrollTrigger: { trigger:'.drop-banner', start:'top 78%', once:true } }
  );
  gsap.fromTo('.drop-banner__sub',
    { opacity:0, y:24 },
    { opacity:1, y:0, duration:0.8, ease:'power3.out', delay:0.3,
      scrollTrigger: { trigger:'.drop-banner', start:'top 76%', once:true } }
  );
  gsap.fromTo('.drop-banner__cta',
    { opacity:0, y:24 },
    { opacity:1, y:0, duration:0.8, ease:'power3.out', delay:0.5,
      scrollTrigger: { trigger:'.drop-banner', start:'top 76%', once:true } }
  );

  /* About preview text reveal */
  const apTitle = qs('.about-preview__title');
  if (apTitle) {
    const words = splitWords(apTitle);
    gsap.fromTo(words,
      { yPercent: 110 },
      {
        yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-preview', start: 'top 82%', once: true }
      }
    );
  }
}

/* ══════════════════════════════════
   CATALOG PAGE
   ══════════════════════════════════ */
function initCatalogPage() {
  /* Hero title */
  const heroTitle = qs('.catalog-hero__title');
  if (heroTitle) {
    const chars = splitChars(heroTitle);
    gsap.fromTo(chars,
      { yPercent: 112 },
      { yPercent: 0, duration: 1.0, stagger: 0.035, ease: 'power4.out', delay: 0.15 }
    );
  }
  gsap.fromTo('.catalog-hero__label', { opacity:0, y:16 }, { opacity:1, y:0, duration:0.7, ease:'power3.out', delay:0.9 });
  gsap.fromTo('.catalog-hero__count', { opacity:0 },       { opacity:1, duration:0.7, ease:'power2.out', delay:1.0 });
  gsap.fromTo('.filters',             { opacity:0, x:-24 },{ opacity:1, x:0, duration:0.8, ease:'power3.out', delay:0.5 });

  /* Stagger cards */
  const cards = qsa('.product-card');
  gsap.fromTo(cards,
    { opacity: 0, y: 48 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', delay: 0.6 }
  );

  initFilters();
}

/* ── Filters logic ── */
function initFilters() {
  const products      = qsa('.product-card[data-product]');
  const catInputs     = qsa('.filter-category');
  const priceRange    = qs('#priceRange');
  const priceDisplay  = qs('#priceDisplay');
  const colorDots     = qsa('.color-dot');
  const resetBtn      = qs('.filters__reset');
  const noResults     = qs('.no-results');
  const countEl       = qs('.products-count');

  let activeCategories = new Set();
  let maxPrice = 20000;
  let activeColor = null;

  function run() {
    let visible = 0;
    products.forEach(card => {
      const cat   = card.dataset.category;
      const price = parseInt(card.dataset.price);
      const color = card.dataset.color;

      const catOk   = activeCategories.size === 0 || activeCategories.has(cat);
      const priceOk = price <= maxPrice;
      const colorOk = !activeColor || color === activeColor;

      if (catOk && priceOk && colorOk) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countEl)   countEl.textContent = visible + ' товаров';
    if (noResults) noResults.classList.toggle('visible', visible === 0);

    /* Animate newly visible cards */
    const visibleCards = qsa('.product-card:not(.hidden)');
    gsap.fromTo(visibleCards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', overwrite: true }
    );
  }

  catInputs.forEach(input => {
    input.addEventListener('change', () => {
      input.checked ? activeCategories.add(input.value) : activeCategories.delete(input.value);
      run();
    });
  });

  if (priceRange) {
    priceRange.addEventListener('input', () => {
      maxPrice = parseInt(priceRange.value);
      if (priceDisplay) priceDisplay.textContent = Number(maxPrice).toLocaleString('ru-RU') + ' ₽';
      run();
    });
  }

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      if (dot.classList.contains('active')) {
        dot.classList.remove('active');
        activeColor = null;
      } else {
        colorDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        activeColor = dot.dataset.color;
      }
      run();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCategories.clear();
      activeColor = null;
      maxPrice = 20000;
      catInputs.forEach(i => (i.checked = false));
      colorDots.forEach(d => d.classList.remove('active'));
      if (priceRange)   priceRange.value = 20000;
      if (priceDisplay) priceDisplay.textContent = '20 000 ₽';
      run();
    });
  }
}

/* ══════════════════════════════════
   ABOUT PAGE ANIMATIONS
   ══════════════════════════════════ */
function initAboutAnimations() {
  /* Hero title */
  const heroTitle = qs('.about-hero__title');
  if (heroTitle) {
    const words = splitWords(heroTitle);
    gsap.fromTo(words,
      { yPercent: 112 },
      { yPercent: 0, duration: 1.1, stagger: 0.08, ease: 'power4.out', delay: 0.2 }
    );
  }
  gsap.fromTo('.about-hero__label', { opacity:0, y:16 }, { opacity:1, y:0, duration:0.7, ease:'power3.out', delay:0.9 });
  gsap.fromTo('.about-hero__sub',   { opacity:0, y:28 }, { opacity:1, y:0, duration:0.9, ease:'power3.out', delay:1.0 });

  /* Decorative text parallax */
  gsap.to('.about-hero__decor', {
    yPercent: 18, ease: 'none',
    scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* Manifesto */
  const manifesto = qs('.about-manifesto__text');
  if (manifesto) {
    gsap.fromTo(manifesto,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: manifesto, start: 'top 82%', once: true }
      }
    );
  }

  /* Values */
  const values = qsa('.about-value');
  if (values.length) {
    gsap.fromTo(values,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-values', start: 'top 82%', once: true }
      }
    );
  }

  /* Stats counter */
  qsa('.about-stat__num').forEach(el => {
    const target = parseInt(el.dataset.count || el.textContent);
    const suffix = el.dataset.suffix || '';
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter() {
        gsap.to(obj, {
          val: target, duration: 1.6, ease: 'power2.out',
          onUpdate() {
            el.innerHTML = Math.round(obj.val) + suffix + (el.querySelector('span') ? '<span>+</span>' : '');
          }
        });
      }
    });
  });

  /* Story */
  const storyVis = qs('.about-story__visual');
  if (storyVis) {
    gsap.fromTo(storyVis,
      { opacity: 0, x: -48 },
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-story', start: 'top 78%', once: true } }
    );
  }

  const storyTitle = qs('.about-story__title');
  if (storyTitle) {
    const words = splitWords(storyTitle);
    gsap.fromTo(words,
      { yPercent: 110 },
      {
        yPercent: 0, duration: 0.9, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-story', start: 'top 78%', once: true }
      }
    );
  }

  /* CTA title */
  const ctaTitle = qs('.about-cta__title');
  if (ctaTitle) {
    const words = splitWords(ctaTitle);
    gsap.fromTo(words,
      { yPercent: 112 },
      {
        yPercent: 0, duration: 1.0, stagger: 0.07, ease: 'power4.out',
        scrollTrigger: { trigger: '.about-cta', start: 'top 82%', once: true }
      }
    );
  }
}

/* ── Marquee clone ── */
function initMarquee() {
  qsa('.marquee__track').forEach(track => {
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
  });
}

/* ══════════════════════════════════
   BOOT
   ══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initMarquee();
  initPreloader();
});
