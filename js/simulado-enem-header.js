document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.header__menu-toggle');
  const navList = document.querySelector('.header__nav-list');

  if (!menuToggle || !navList || !header) return;

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('header__nav-list--open');
    header.classList.toggle('header--menu-open');
  };

  menuToggle.addEventListener('click', toggleMenu);

  navList.querySelectorAll('.header__nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('header__nav-list--open');
      header.classList.remove('header--menu-open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu();
    }
  });
});
