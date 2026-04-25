/* ═══════════════════════════════════════════════
   QUST — Main JS (Art-Brand)
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

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
    s.textContent = ch === ' ' ? ' ' : ch;
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
    span.textContent = word + (i < arr.length - 1 ? ' ' : '');
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

  const logoEl    = qs('.preloader__logo', preloader);
  const lineEl    = qs('.preloader__line', preloader);
  const counterEl = qs('.preloader__counter', preloader);

  gsap.set('main, footer', { opacity: 0 });

  let chars = [];
  if (logoEl) {
    chars = splitChars(logoEl);
    gsap.set(chars, { yPercent: 110 });
  }

  const counter = { val: 0 };
  const tl = gsap.timeline({
    onComplete() {
      preloader.style.pointerEvents = 'none';
      document.body.classList.add('loaded');
      initPageAnimations();
    }
  });

  if (chars.length) {
    tl.to(chars, { yPercent: 0, duration: 0.7, stagger: 0.04, ease: 'power3.out' }, 0);
  }
  if (lineEl) {
    tl.to(lineEl, { width: '78%', duration: 1.7, ease: 'power2.inOut' }, 0);
  }
  if (counterEl) {
    tl.to(counter, {
      val: 100, duration: 1.7, ease: 'power2.inOut',
      onUpdate() {
        counterEl.textContent = String(Math.round(counter.val)).padStart(3, '0') + '%';
      }
    }, 0);
  }

  tl.to(preloader, { yPercent: -100, duration: 0.7, ease: 'power3.inOut', delay: 0.04 });
}

/* ══════════════════════════════════
   CURSOR
   ══════════════════════════════════ */
function initCursor() {
  if (window.matchMedia('(max-width: 768px)').matches) return;
  const dot  = qs('.cursor-dot');
  const ring = qs('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a,button,.product-card,.f-card,.color-dot,.filter-option,.btn'))
      document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a,button,.product-card,.f-card,.color-dot,.filter-option,.btn'))
      document.body.classList.remove('cursor-hover');
  });
}

/* ══════════════════════════════════
   NAVIGATION
   ══════════════════════════════════ */
function initNav() {
  const nav = qs('.nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 60,
    onEnter:     () => nav.classList.add('scrolled'),
    onLeaveBack: () => nav.classList.remove('scrolled')
  });

  const page = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.nav__link', nav).forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html'))
      link.classList.add('active');
  });

  const menuBtn    = qs('.nav__menu-btn');
  const mobileMenu = qs('.mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  let open = false;
  const spans = qsa('span', menuBtn);

  menuBtn.addEventListener('click', () => {
    open = !open;
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      gsap.to(spans[0], { rotation: 45,  y: 6,  duration: 0.3, ease: 'power2.out' });
      gsap.to(spans[1], { opacity: 0,           duration: 0.15 });
      gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(qsa('.mobile-menu__link span', mobileMenu),
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.04 }
      );
    } else {
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(spans[1], { opacity: 1,         duration: 0.3 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    }
  });

  qsa('.mobile-menu__link', mobileMenu).forEach(l => {
    l.addEventListener('click', () => {
      open = false; mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ══════════════════════════════════
   DISPATCHER
   ══════════════════════════════════ */
function initPageAnimations() {
  gsap.to('main, footer', { opacity: 1, duration: 0.6, ease: 'power2.out' });

  const page = document.body.dataset.page;
  if (page === 'home')    initHomeAnimations();
  if (page === 'catalog') initCatalogPage();
  if (page === 'about')   initAboutAnimations();

  initStatsCounter();
}

/* ══════════════════════════════════
   HOME
   ══════════════════════════════════ */
function initHomeAnimations() {
  /* Clip-path wipe on the giant title — left → right reveal */
  const title = qs('.hero__title');
  if (title) {
    gsap.fromTo(title,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out', delay: 0.08 }
    );
  }

  /* Eyebrow: lines expand from center */
  gsap.fromTo('.hero__eyebrow',
    { opacity: 0, scaleX: 0.8 },
    { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out', delay: 0.3 }
  );

  /* Subtitle + CTA: sharp appear from below */
  gsap.fromTo('.hero__subtitle',
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', delay: 0.55 }
  );
  gsap.fromTo('.hero__cta',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0.68 }
  );
  gsap.fromTo('.hero__scroll',
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.8 }
  );
  gsap.fromTo('.hero__num',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.9 }
  );

  /* Featured cards: clip-path wipe each card staggered */
  const fCards = qsa('.f-card');
  if (fCards.length) {
    gsap.fromTo(fCards,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: '.featured', start: 'top 80%', once: true }
      }
    );
  }

  /* Raw statement: title clip-path wipe */
  gsap.fromTo('.raw-statement__text',
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.raw-statement', start: 'top 75%', once: true }
    }
  );
  gsap.fromTo(['.raw-statement__label', '.raw-statement__meta', '.raw-statement__link'],
    { opacity: 0 },
    { opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.raw-statement', start: 'top 70%', once: true }
    }
  );

  /* About split: image wipe from left, text from right */
  gsap.fromTo('.about-split__visual',
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-split', start: 'top 75%', once: true }
    }
  );
  gsap.fromTo('.about-split__text',
    { opacity: 0, x: 24 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out', delay: 0.2,
      scrollTrigger: { trigger: '.about-split', start: 'top 70%', once: true }
    }
  );
}

/* ══════════════════════════════════
   CATALOG
   ══════════════════════════════════ */
function initCatalogPage() {
  const heroTitle = qs('.catalog-hero__title');
  if (heroTitle) {
    const words = splitWords(heroTitle);
    gsap.fromTo(words,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.65, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
    );
  }
  gsap.fromTo('.catalog-hero__label', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.5 });
  gsap.fromTo('.filters',
    { opacity: 0, x: -16 },
    { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: 0.25 }
  );

  /* Products: clip-path wipe from bottom */
  const cards = qsa('.product-card[data-product]');
  if (cards.length) {
    gsap.fromTo(cards,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 0.65, stagger: 0.06, ease: 'power3.out', delay: 0.35 }
    );
  }

  initFilters();
}

/* ── Filters ── */
function initFilters() {
  const products     = qsa('.product-card[data-product]');
  const catInputs    = qsa('.filter-category');
  const priceRange   = qs('#priceRange');
  const priceDisplay = qs('#priceDisplay');
  const colorDots    = qsa('.color-dot');
  const resetBtn     = qs('.filters__reset');
  const noResults    = qs('.no-results');
  const countEl      = qs('.products-count');

  let activeCategories = new Set();
  let maxPrice  = 20000;
  let activeColor = null;

  function run() {
    let visible = 0;
    products.forEach(card => {
      const ok =
        (activeCategories.size === 0 || activeCategories.has(card.dataset.category)) &&
        parseInt(card.dataset.price) <= maxPrice &&
        (!activeColor || card.dataset.color === activeColor);
      card.classList.toggle('hidden', !ok);
      if (ok) visible++;
    });

    if (countEl)   countEl.textContent = visible + ' товаров';
    if (noResults) noResults.classList.toggle('visible', visible === 0);

    const visible_cards = qsa('.product-card:not(.hidden)');
    gsap.fromTo(visible_cards,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', overwrite: true }
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
      if (priceDisplay) priceDisplay.textContent = Number(maxPrice).toLocaleString('ru-RU') + ' ₽';
      run();
    });
  }

  colorDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const isActive = dot.classList.contains('active');
      colorDots.forEach(d => d.classList.remove('active'));
      if (!isActive) { dot.classList.add('active'); activeColor = dot.dataset.color; }
      else activeColor = null;
      run();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeCategories.clear(); activeColor = null; maxPrice = 20000;
      catInputs.forEach(i => (i.checked = false));
      colorDots.forEach(d => d.classList.remove('active'));
      if (priceRange)   priceRange.value = 20000;
      if (priceDisplay) priceDisplay.textContent = '20 000 ₽';
      run();
    });
  }
}

/* ══════════════════════════════════
   ABOUT
   ══════════════════════════════════ */
function initAboutAnimations() {
  const heroTitle = qs('.about-hero__title');
  if (heroTitle) {
    const words = splitWords(heroTitle);
    gsap.fromTo(words,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.75, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
    );
  }
  gsap.fromTo('.about-hero__label', { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.2 });
  gsap.fromTo('.about-hero__sub',   { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, delay: 0.4 });

  gsap.to('.about-hero__decor', {
    yPercent: 16, ease: 'none',
    scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  /* Value cards: wipe in groups */
  qsa('.about-value').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    );
  });

  /* Manifesto text */
  gsap.fromTo('.about-manifesto__text',
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.out',
      scrollTrigger: { trigger: '.about-manifesto', start: 'top 75%', once: true }
    }
  );
}

/* ── Stats counter ── */
function initStatsCounter() {
  qsa('.about-stat__num').forEach(el => {
    const raw    = el.dataset.count || el.textContent.replace(/[^0-9]/g, '');
    const target = parseInt(raw);
    const suffix = el.dataset.suffix || '';
    if (!target) return;

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter() {
        gsap.to(obj, {
          val: target, duration: 1.2, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; }
        });
      }
    });
  });
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
