window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 400);
});
// Year
document.getElementById('year').textContent = new Date().getFullYear();
// Navbar scroll
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  if (window.scrollY > 400) backTop.classList.add('show');
  else backTop.classList.remove('show');
});
// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuToggle.classList.remove('active');
  navLinks.classList.remove('open');
}));
// Back to top
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Gallery filter
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.m-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(i => {
      i.classList.toggle('hidden', !(f === 'all' || i.dataset.cat === f));
    });
  });
});
// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.m-item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});
document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('active'); });
// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
// Contact form
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const msg = `Hi! I'd love to book a session.%0A%0AName: ${data.get('name')}%0APhone: ${data.get('phone')}%0AEmail: ${data.get('email') || '-'}%0AService: ${data.get('service')}%0AMessage: ${data.get('message') || '-'}`;
  window.open(`https://wa.me/916354-948911?text=${msg}`, '_blank');
  document.getElementById('formNote').textContent = '✨ Thanks! Opening WhatsApp to complete your booking…';
  form.reset();
});
// Parallax hero shapes
const shapes = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  shapes.forEach((s, i) => { s.style.transform = `translateY(${y * (0.05 + i*0.02)}px)`; });
});