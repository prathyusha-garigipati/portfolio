// Simple JS for mobile nav toggle and reveal-on-scroll
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#main-navigation');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('show');
  });
}

// IntersectionObserver to reveal elements with .reveal
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => io.observe(el));
} else {
  // fallback: just show them
  reveals.forEach(el => el.classList.add('active'));
}

// Contact form client-side validation (if present)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    const errors = [];
    if (!name) errors.push('Name is required');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('Valid email is required');
    if (!message) errors.push('Message is required');

    const feedback = contactForm.querySelector('.form-feedback');
    if (errors.length) {
      feedback.textContent = errors.join('. ');
      feedback.style.color = 'crimson';
      return;
    }

    // For demo: show success message. Integrate real endpoint later.
    feedback.textContent = 'Thanks! Your message was sent (demo).';
    feedback.style.color = 'green';
    contactForm.reset();
  });
}
