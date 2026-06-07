/* ===========================================
   main.js – Ondřej Gola Portfolio
   Vanilla JS ES6+ – bez frameworků
   =========================================== */

'use strict';

// ─── 1. HAMBURGER MENU ───────────────────────
const burger = document.querySelector('.nav__burger');
const navList = document.querySelector('.nav__list');

if (burger && navList) {
  burger.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    burger.classList.toggle('is-active');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Zavři menu po kliknutí na odkaz (mobile UX)
  navList.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Zavři menu při kliknutí mimo navigaci
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('is-open');
      burger.classList.remove('is-active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ─── 2. SCROLL REVEAL (Intersection Observer) ─
const revealElements = document.querySelectorAll(
  '.about__grid, .project-card, .contact-item, .stat, .section-title'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Staggered delay pro karty vedle sebe
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

// Přidej delay pro projekt karty (stagger efekt)
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.dataset.delay = i * 120;
});

// Přidej delay pro kontakt položky
document.querySelectorAll('.contact-item').forEach((item, i) => {
  item.dataset.delay = i * 80;
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── 3. AKTIVNÍ NAV LINK PŘI SCROLLU ─────────
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive
            ? 'var(--clr-accent)'
            : '';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => sectionObserver.observe(section));

// ─── 4. LAZY LOADING OBRÁZKŮ ──────────────────
// Nativní lazy loading je použito přes loading="lazy" v HTML.
// Tato část je záloha pro starší prohlížeče.
if (!('loading' in HTMLImageElement.prototype)) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ─── 5. HEADER PRŮHLEDNOST PŘI SCROLLU ───────
const header = document.querySelector('.site-header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 80) {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
  } else {
    header.style.boxShadow = 'none';
  }

  // Skrýt header při scrollu dolů, zobrazit při scrollu nahoru
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  lastScrollY = currentScrollY;
}, { passive: true });

// Plynulý přechod pro header
header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease';

// ─── 6. AKTUÁLNÍ ROK VE FOOTERU ───────────────
const yearEl = document.querySelector('.footer__copy span:first-child');
if (yearEl) {
  const year = new Date().getFullYear();
  yearEl.textContent = `© ${year} Ondřej Gola`;
}
