// ===== CINDERELLA MAKEUP STUDIO — MAIN JS =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== LOADER =====
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader?.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1200);
  });
  document.body.style.overflow = 'hidden';

  // ===== CUSTOM CURSOR =====
  const cursor = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cursor) {
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    }
  });

  const animateCursor = () => {
    if (ring) {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll('a, button, .service-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor?.style.setProperty('width', '20px');
      cursor?.style.setProperty('height', '20px');
      ring?.style.setProperty('transform', 'translate(-50%, -50%) scale(1.5)');
    });
    el.addEventListener('mouseleave', () => {
      cursor?.style.removeProperty('width');
      cursor?.style.removeProperty('height');
      ring?.style.removeProperty('transform');
    });
  });

  // ===== NAVBAR SCROLL =====
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }
  });

  // ===== MOBILE MENU =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  hamburger?.addEventListener('click', () => mobileMenu?.classList.add('open'));
  mobileClose?.addEventListener('click', () => mobileMenu?.classList.remove('open'));
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // ===== SCROLL REVEAL =====
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));

  // ===== SMOOTH ACTIVE NAV =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--gold-light)' : '';
    });
  });

  // ===== CONTACT FORM =====
  const form = document.querySelector('.contact-form');
  const formSuccess = document.querySelector('.form-success');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess?.classList.add('visible');
    }, 1200);
  });

  // ===== TICKER DUPLICATE =====
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    tickerInner.innerHTML += tickerInner.innerHTML;
  }

  // ===== PARALLAX HERO =====
  const heroImgFrame = document.querySelector('.hero-img-frame img');
  window.addEventListener('scroll', () => {
    if (!heroImgFrame) return;
    const y = window.scrollY;
    heroImgFrame.style.transform = `translateY(${y * 0.08}px)`;
  });

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const target = +entry.target.dataset.count;
      const suffix = entry.target.dataset.suffix || '';
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        entry.target.textContent = Math.floor(current) + suffix;
      }, 25);
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  // ===== GALLERY LIGHTBOX =====
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      const overlay = document.createElement('div');
      overlay.style.cssText = `position:fixed;inset:0;background:rgba(26,56,39,0.95);z-index:9000;display:flex;align-items:center;justify-content:center;cursor:zoom-out;backdrop-filter:blur(8px);`;
      const lightImg = document.createElement('img');
      lightImg.src = img.src;
      lightImg.style.cssText = `max-width:90vw;max-height:90vh;object-fit:contain;border-radius:4px;box-shadow:0 30px 80px rgba(0,0,0,0.5);`;
      overlay.appendChild(lightImg);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  console.log('✨ Cinderella Makeup Studio — Website Loaded');
});
