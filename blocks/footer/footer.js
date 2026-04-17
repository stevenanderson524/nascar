export default async function decorate(block) {
// Fetch footer content - try /drafts/footer first, fallback to /footer
let resp = await fetch('\/drafts/footer.plain.html');
if (!resp.ok) {
resp = await fetch('\/footer.plain.html');
}
if (!resp.ok) return;

const html = await resp.text();
const temp = document.createElement('div');
temp.innerHTML = html;

const sections = [...temp.children];
const mainSection = sections[0];
const linksSection = sections[1];
const copySection = sections[2];

// Clear block and create inner wrapper
block.textContent = '';
const wrapper = document.createElement('div');
wrapper.className = 'footer-content';

// === Main content ===
if (mainSection) {
const mainDiv = document.createElement('div');
mainDiv.className = 'footer-main';

// Phone CTA
const strong = mainSection.querySelector('strong');
const phoneLink = mainSection.querySelector('a[href^="tel:"]');
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
mainDiv.appendChild(cta);
}

// Accessibility text
const paragraphs = mainSection.querySelectorAll('p');
paragraphs.forEach((p) => {
if (p.textContent.includes('difficulty accessing') || p.textContent.includes('accessibility')) {
const acc = document.createElement('p');
acc.className = 'footer-accessibility';
acc.innerHTML = p.innerHTML;
mainDiv.appendChild(acc);
}
});

// Logo
const logo = mainSection.querySelector('picture img, img');
if (logo && !logo.closest('a[href^="tel:"]')) {
const logoDiv = document.createElement('div');
logoDiv.className = 'footer-logo';
const img = document.createElement('img');
img.src = logo.src;
img.alt = logo.alt || 'Watkins Glen International';
img.loading = 'lazy';
logoDiv.appendChild(img);
mainDiv.appendChild(logoDiv);
}

// Social links
const socialP = [...mainSection.querySelectorAll('p')].find(
(p) => p.textContent.includes('Facebook') || p.textContent.includes('Instagram'),
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
mainDiv.appendChild(socDiv);
}

wrapper.appendChild(mainDiv);
}

// === Links ===
if (linksSection) {
const linksDiv = document.createElement('div');
linksDiv.className = 'footer-nav-links';
const links = linksSection.querySelectorAll('a');
links.forEach((link) => {
const a = document.createElement('a');
a.href = link.href;
a.textContent = link.textContent.trim();
if (link.target) a.target = link.target;
linksDiv.appendChild(a);
});
wrapper.appendChild(linksDiv);
}

// === Copyright ===
if (copySection) {
const copyDiv = document.createElement('div');
copyDiv.className = 'footer-copyright';
const paragraphs = copySection.querySelectorAll('p');
paragraphs.forEach((p) => {
const pp = document.createElement('p');
pp.textContent = p.textContent;
copyDiv.appendChild(pp);
});
wrapper.appendChild(copyDiv);
}

block.appendChild(wrapper);
}
