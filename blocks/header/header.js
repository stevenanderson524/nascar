export default async function decorate(block) {
  // Header already has nav content loaded by EDS framework
  // The block receives the nav document's sections as rows
  const rows = [...block.children];

  // Row 0: Logo
  const logoRow = rows[0];
  // Row 1: Main nav
  const mainNavRow = rows[1];
  // Row 2: Utility links
  const utilRow = rows[2];
  // Row 3: Secondary nav
  const secNavRow = rows[3];

  // Clear and rebuild
  block.textContent = '';

  // === Top bar (main header) ===
  const topBar = document.createElement('div');
  topBar.className = 'header-top';

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo';
  if (logoRow) {
    const logoLink = logoRow.querySelector('a');
    const logoImg = logoRow.querySelector('img');
    if (logoLink && logoImg) {
      const a = document.createElement('a');
      a.href = logoLink.href;
      const img = document.createElement('img');
      img.src = logoImg.src;
      img.alt = logoImg.alt || 'Watkins Glen International';
      a.appendChild(img);
      logoDiv.appendChild(a);
    }
  }
  topBar.appendChild(logoDiv);

  // Main nav
  const mainNav = document.createElement('nav');
  mainNav.className = 'header-nav';
  if (mainNavRow) {
    const links = mainNavRow.querySelectorAll('a');
    links.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      mainNav.appendChild(a);
    });
  }
  topBar.appendChild(mainNav);

  // Right side: utility links
  const utilDiv = document.createElement('div');
  utilDiv.className = 'header-util';
  if (utilRow) {
    const links = utilRow.querySelectorAll('a');
    links.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      a.className = 'util-link';
      utilDiv.appendChild(a);
    });
  }
  topBar.appendChild(utilDiv);

  // Hamburger (mobile)
  const hamburger = document.createElement('button');
  hamburger.className = 'header-hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  hamburger.addEventListener('click', () => {
    block.classList.toggle('nav-open');
  });
  topBar.appendChild(hamburger);

  block.appendChild(topBar);

  // === Secondary nav bar ===
  if (secNavRow) {
    const secBar = document.createElement('div');
    secBar.className = 'header-secondary';
    const secNav = document.createElement('nav');
    secNav.className = 'secondary-nav';
    const links = secNavRow.querySelectorAll('a');
    links.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      secNav.appendChild(a);
    });
    secBar.appendChild(secNav);
    block.appendChild(secBar);
  }
}
