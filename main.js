// ────────────────────────────────────────────
//  ADARSHA KUMAR ROUT ~ PORTFOLIO JS
// ────────────────────────────────────────────

// ── Theme Toggle ──
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

// Load saved preference
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);

themeBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── Navbar scroll shadow ──
const navbar = document.getElementById('navbar');
const buildingNow = document.getElementById('buildingNow');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
function closeMenu() {
  navMobile.classList.remove('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navMobile.classList.remove('open');
  }
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObserver.observe(s));

// ── Intersection Observer for reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseInt(entry.target.dataset.delay || 0);
    setTimeout(() => entry.target.classList.add('in-view'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Stagger siblings
function observeWithStagger(selector) {
  const groups = {};
  document.querySelectorAll(selector).forEach(el => {
    const parentKey = el.parentElement.dataset.staggerGroup || (el.parentElement.dataset.staggerGroup = Math.random());
    if (!groups[parentKey]) groups[parentKey] = [];
    groups[parentKey].push(el);
  });
  Object.values(groups).forEach(group => {
    group.forEach((el, i) => {
      el.dataset.delay = i * 120;
      revealObserver.observe(el);
    });
  });
}

observeWithStagger('.reveal');
observeWithStagger('.bar-row');
observeWithStagger('.tl-item');
observeWithStagger('.proj-card');

// ── Skill bar fill ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill = entry.target.querySelector('.bar-fill');
    if (fill) setTimeout(() => { fill.style.width = fill.dataset.pct + '%'; }, 350);
    barObserver.unobserve(entry.target);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.bar-row').forEach(el => barObserver.observe(el));

// ── Hero entrance animation ──
document.addEventListener('DOMContentLoaded', () => {
  const heroItems = [
    '.hero-badge', '.hero-heading', '.hero-sub', '.hero-actions'
  ].map(s => document.querySelector(s)).filter(Boolean);

  heroItems.forEach((el, i) => {
    Object.assign(el.style, {
      opacity: '0', transform: 'translateY(28px)',
      transition: 'opacity .7s ease, transform .7s ease'
    });
    setTimeout(() => {
      Object.assign(el.style, { opacity: '1', transform: 'none' });
    }, 200 + i * 120);
  });

  const heroCenter = document.querySelector('.hero-center');
  if (heroCenter) {
    Object.assign(heroCenter.style, { opacity: '0', transform: 'scale(0.93)', transition: 'opacity .9s ease, transform .9s ease' });
    setTimeout(() => Object.assign(heroCenter.style, { opacity: '1', transform: 'none' }), 350);
  }

  const sidebar = document.querySelector('.hero-sidebar');
  if (sidebar) {
    Object.assign(sidebar.style, { opacity: '0', transform: 'translateX(20px)', transition: 'opacity .7s ease, transform .7s ease' });
    setTimeout(() => Object.assign(sidebar.style, { opacity: '1', transform: 'none' }), 500);
  }
});
