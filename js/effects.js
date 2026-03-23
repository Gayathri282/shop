// ===== RIPPLE EFFECT =====
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-primary');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ===== SMOOTH SECTION NAV =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== WHATSAPP FLOAT BUTTON PULSE =====
const wa = document.querySelector('.wa-float');
if (wa) {
  setInterval(() => {
    wa.classList.toggle('pulse-ring');
    setTimeout(() => wa.classList.remove('pulse-ring'), 2000);
  }, 5000);
}
