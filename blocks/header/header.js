export default async function decorate(block) {
  const navPath = '/drafts/nav';
  let resp = await fetch(navPath + '.plain.html');
  if (!resp.ok) {
    resp = await fetch('/nav.plain.html');
  }
  if (!resp.ok) return;

  const html = await resp.text();
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const sections = [...temp.children];
  const logoSection = sections[0];
  const mainNavSection = sections[1];
  const utilSection = sections[2];

  block.textContent = '';

  // === Top bar ===
  const topBar = document.createElement('div');
  topBar.className = 'header-top';

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo';
  if (logoSection) {
    const logoLink = logoSection.querySelector('a');
    const logoImg = logoSection.querySelector('img');
    if (logoLink) {
      const a = document.createElement('a');
      a.href = logoLink.href || '/';
      if (logoImg) {
        const img = document.createElement('img');
        img.src = logoImg.src;
        img.alt = logoImg.alt || 'Watkins Glen International';
        img.loading = 'eager';
        a.appendChild(img);
      } else {
        a.textContent = 'Watkins Glen International';
      }
      logoDiv.appendChild(a);
    }
  }
  topBar.appendChild(logoDiv);

  // Main nav with dropdowns
  const mainNav = document.createElement('nav');
  mainNav.className = 'header-nav';
  if (mainNavSection) {
    const topUl = mainNavSection.querySelector('ul');
    if (topUl) {
      const navUl = document.createElement('ul');
      navUl.className = 'header-nav-list';
      [...topUl.children].forEach((li) => {
        const navLi = document.createElement('li');
        navLi.className = 'header-nav-item';
        const link = li.querySelector(':scope > a');
        if (link) {
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.textContent.trim();
          a.className = 'header-nav-link';
          navLi.appendChild(a);
        }
        // Check for submenu
        const subUl = li.querySelector(':scope > ul');
        if (subUl) {
          navLi.classList.add('has-dropdown');
          // Add caret
          const caret = document.createElement('span');
          caret.className = 'nav-caret';
          caret.setAttribute('aria-hidden', 'true');
          navLi.appendChild(caret);

          const dropdown = document.createElement('div');
          dropdown.className = 'header-dropdown';
          const ddUl = document.createElement('ul');
          ddUl.className = 'header-dropdown-list';
          [...subUl.children].forEach((subLi) => {
            const ddLi = document.createElement('li');
            const subLink = subLi.querySelector('a');
            if (subLink) {
              const sa = document.createElement('a');
              sa.href = subLink.href;
              sa.textContent = subLink.textContent.trim();
              ddLi.appendChild(sa);
            }
            ddUl.appendChild(ddLi);
          });
          dropdown.appendChild(ddUl);
          navLi.appendChild(dropdown);

          // Desktop hover
          navLi.addEventListener('mouseenter', () => {
            navLi.classList.add('dropdown-open');
          });
          navLi.addEventListener('mouseleave', () => {
            navLi.classList.remove('dropdown-open');
          });
          // Mobile click
          navLi.querySelector('.header-nav-link')?.addEventListener('click', (e) => {
            if (window.innerWidth < 900) {
              e.preventDefault();
              navLi.classList.toggle('dropdown-open');
            }
          });
        }
        navUl.appendChild(navLi);
      });
      mainNav.appendChild(navUl);
    }
  }
  topBar.appendChild(mainNav);

  // Utility links (right side icons)
  const utilDiv = document.createElement('div');
  utilDiv.className = 'header-util';
  if (utilSection) {
    const links = utilSection.querySelectorAll('a');
    links.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      const text = link.textContent.trim();
      a.className = 'util-link';
      a.setAttribute('aria-label', text);
      // Map text labels to SVG icons
      if (text === 'Chat') {
        a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';
      } else if (text === 'Buy Tickets') {
        a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 9V5a2 2 0 012-2h16a2 2 0 012 2v4m-20 0a3 3 0 003 3 3 3 0 00-3 3v4a2 2 0 002 2h16a2 2 0 002-2v-4a3 3 0 00-3-3 3 3 0 003-3"/><line x1="9" y1="3" x2="9" y2="21"/></svg>';
      } else if (text === 'My Profile') {
        a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 00-16 0"/></svg>';
      } else {
        a.textContent = text;
      }
      utilDiv.appendChild(a);
    });
  }
  topBar.appendChild(utilDiv);

  // Hamburger button (mobile)
  const hamburger = document.createElement('button');
  hamburger.className = 'header-hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  hamburger.addEventListener('click', () => {
    block.classList.toggle('nav-open');
  });
  topBar.appendChild(hamburger);

  block.appendChild(topBar);
}
