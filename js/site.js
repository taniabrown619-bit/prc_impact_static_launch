// site.js — mobile nav and header scroll
(function () {
  const root = document.documentElement;
  // Mark JS as ready BEFORE adding reveals so unstyled flash never happens.
  root.classList.add('js-ready');
  // Force light theme always (no dark mode).
  root.setAttribute('data-theme', 'light');

  // Mobile nav
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.getAttribute('data-open') === 'true';
      navLinks.setAttribute('data-open', String(!open));
      navToggle.setAttribute('aria-expanded', String(!open));
      navToggle.innerHTML = !open
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M6 18L18 6"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.setAttribute('data-open', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
      });
    });
  }

  // Header scroll state
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
})();
