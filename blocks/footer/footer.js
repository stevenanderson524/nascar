export default async function decorate(block) {
  const rows = [...block.children];
  
  // Clear and rebuild
  block.textContent = '';

  // Main content row
  const mainRow = rows[0];
  if (mainRow) {
    const mainContent = document.createElement('div');
    mainContent.className = 'footer-main';

    // Phone CTA
    const strong = mainRow.querySelector('strong');
    const phoneLink = mainRow.querySelector('a[href^="tel:"]');
    if (strong || phoneLink) {
      const cta = document.createElement('div');
      cta.className = 'footer-cta';
      if (strong) {
        const q = document.createElement('p');
        q.className = 'footer-cta-title';
        q.textContent = strong.textContent;
        cta.appendChild(q);
      }
      if (phoneLink) {
        const ph = document.createElement('a');
        ph.href = phoneLink.href;
        ph.className = 'footer-phone';
        ph.textContent = phoneLink.textContent;
        cta.appendChild(ph);
      }
      mainContent.appendChild(cta);
    }

    // Accessibility text
    const paragraphs = mainRow.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (p.textContent.includes('difficulty accessing') || p.textContent.includes('accessibility')) {
        const acc = document.createElement('p');
        acc.className = 'footer-accessibility';
        acc.innerHTML = p.innerHTML;
        mainContent.appendChild(acc);
      }
    });

    // Logo
    const logo = mainRow.querySelector('img');
    if (logo) {
      const logoDiv = document.createElement('div');
      logoDiv.className = 'footer-logo';
      const img = document.createElement('img');
      img.src = logo.src;
      img.alt = logo.alt || 'Watkins Glen International';
      logoDiv.appendChild(img);
      mainContent.appendChild(logoDiv);
    }

    // Social links
    const socialP = [...mainRow.querySelectorAll('p')].find(
      (p) => p.textContent.includes('Facebook') || p.textContent.includes('Instagram')
    );
    if (socialP) {
      const socDiv = document.createElement('div');
      socDiv.className = 'footer-social';
      const socialLinks = socialP.querySelectorAll('a');
      socialLinks.forEach((link) => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = link.textContent.trim();
        a.className = 'social-link';
        socDiv.appendChild(a);
      });
      mainContent.appendChild(socDiv);
    }

    block.appendChild(mainContent);
  }

  // Links row
  const linksRow = rows[1];
  if (linksRow) {
    const linksDiv = document.createElement('div');
    linksDiv.className = 'footer-links';
    const links = linksRow.querySelectorAll('a');
    links.forEach((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      a.target = link.target || '';
      linksDiv.appendChild(a);
    });
    block.appendChild(linksDiv);
  }

  // Copyright row
  const copyRow = rows[2];
  if (copyRow) {
    const copyDiv = document.createElement('div');
    copyDiv.className = 'footer-copyright';
    const paragraphs = copyRow.querySelectorAll('p');
    paragraphs.forEach((p) => {
      const pp = document.createElement('p');
      pp.textContent = p.textContent;
      copyDiv.appendChild(pp);
    });
    block.appendChild(copyDiv);
  }
}
