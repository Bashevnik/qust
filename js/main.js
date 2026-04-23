/* ═══════════════════════════════════════════════
   QUST — Main JS
   Анимации срабатывают один раз при загрузке.
   Скролл — без перезапуска, без рывков.
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

  const logoEl    = qs('.preloader__logo', preloader);
  const lineEl    = qs('.preloader__line', preloader);
  const counterEl = qs('.preloader__counter', preloader);

  /* Скрываем контент за прелоадером */
  gsap.set('main, footer', { opacity: 0 });

  let chars = [];
  if (logoEl) {
    chars = splitChars(logoEl);
    gsap.set(chars, { yPercent: 115 });
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
    tl.to(chars, {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.06,
      ease: 'power2.out'
    }, 0);
  }

  if (lineEl) {
    tl.to(lineEl, { width: '78%', duration: 2.2, ease: 'power2.inOut' }, 0);
  }

  if (counterEl) {
    tl.to(counter, {
      val: 100, duration: 2.2, ease: 'power2.inOut',
      onUpdate() {
        counterEl.textContent = String(Math.round(counter.val)).padStart(3, '0') + '%';
      }
    }, 0);
  }

  /* Прелоадер уезжает вверх */
  tl.to(preloader, { yPercent: -100, duration: 1.0, ease: 'power3.inOut', delay: 0.1 });
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
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .product-card, .color-dot, .filter-option, .btn'))
      document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .product-card, .color-dot, .filter-option, .btn'))
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

  /* Активная ссылка */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.nav__link', nav).forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html'))
      link.classList.add('active');
  });

  /* Мобильное меню */
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
      gsap.to(spans[0], { rotation: 45,  y: 6,  duration: 0.4, ease: 'power2.out' });
      gsap.to(spans[1], { opacity: 0,           duration: 0.2 });
      gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo(
        qsa('.mobile-menu__link span', mobileMenu),
        { yPercent: 100 },
        { yPercent: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out', delay: 0.05 }
      );
    } else {
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(spans[1], { opacity: 1,         duration: 0.4 });
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.4, ease: 'power2.out' });
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
   DISPATCHER
   ══════════════════════════════════ */
function initPageAnimations() {
  /* Плавно показываем весь контент */
  gsap.to('main, footer', { opacity: 1, duration: 1.1, ease: 'power2.out' });

  const page = document.body.dataset.page;
  if (page === 'home')    initHomeAnimations();
  if (page === 'catalog') initCatalogPage();
  if (page === 'about')   initAboutAnimations();

  /* Счётчик статистики (about) — только once */
  initStatsCounter();
}

/* ══════════════════════════════════
   HOME
   ══════════════════════════════════ */
function initHomeAnimations() {
  /* Только fade-in элементов hero, без движения */
  const tl = gsap.timeline({ delay: 0.1 });

  tl.fromTo('.hero__label',    { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power2.out' })
    .fromTo('.hero__subtitle', { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.6')
    .fromTo('.hero__cta',      { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.6')
    .fromTo('.hero__meta',     { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=0.4');
}

/* ══════════════════════════════════
   CATALOG
   ══════════════════════════════════ */
function initCatalogPage() {
  /* Заголовок каталога — char reveal */
  const heroTitle = qs('.catalog-hero__title');
  if (heroTitle) {
    const chars = splitChars(heroTitle);
    gsap.fromTo(chars,
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, stagger: 0.035, ease: 'power3.out', delay: 0.15 }
    );
  }
  gsap.fromTo('.catalog-hero__label', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.7 });
  gsap.fromTo('.filters',             { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.4 });

  initFilters();
}

/* ── Фильтры ── */
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

    gsap.fromTo(qsa('.product-card:not(.hidden)'),
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.04, ease: 'power2.out', overwrite: true }
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
  /* Hero title — word reveal */
  const heroTitle = qs('.about-hero__title');
  if (heroTitle) {
    const words = splitWords(heroTitle);
    gsap.fromTo(words,
      { yPercent: 110 },
      { yPercent: 0, duration: 1.2, stagger: 0.09, ease: 'power3.out', delay: 0.15 }
    );
  }

  const tl = gsap.timeline({ delay: 0.3 });
  tl.fromTo('.about-hero__label', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' })
    .fromTo('.about-hero__sub',   { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.5');

  /* Легкий parallax для декора — один раз, без повторов */
  gsap.to('.about-hero__decor', {
    yPercent: 16, ease: 'none',
    scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
}

/* ── Счётчик статистики (once при скролле) ── */
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
          val: target, duration: 1.8, ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          }
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
