export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const imageRow = rows[0];
  const contentRow = rows[1];

  // Extract the poster image src
  const img = imageRow.querySelector('img');
  const posterSrc = img ? img.src : '';

  // Clear block and rebuild
  block.textContent = '';

  // Video background with poster fallback
  const videoBg = document.createElement('div');
  videoBg.className = 'hero-bg';
  
  const video = document.createElement('video');
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  if (posterSrc) video.poster = posterSrc;
  
  const source = document.createElement('source');
  source.src = 'https://www.theglen.com/wp-content/uploads/sites/1022/2025/08/13/WGI16x9_2.mp4';
  source.type = 'video/mp4';
  video.appendChild(source);
  
  // Fallback image for when video can't play
  if (img) {
    video.addEventListener('error', () => {
      const fallbackImg = document.createElement('img');
      fallbackImg.src = posterSrc;
      fallbackImg.alt = 'Watkins Glen International';
      fallbackImg.className = 'hero-poster';
      videoBg.replaceChild(fallbackImg, video);
    });
  }
  
  videoBg.appendChild(video);
  block.appendChild(videoBg);

  // Dark overlay
  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay';
  block.appendChild(overlay);

  // Content
  const content = document.createElement('div');
  content.className = 'hero-content';

  // Get the content cell
  const contentCell = contentRow.querySelector('div') || contentRow;
  
  // Process headings and text
  const heading = contentCell.querySelector('h1, h2, h3');
  if (heading) content.appendChild(heading);
  
  // Get subtitle paragraphs (not the one with buttons)
  const paragraphs = [...contentCell.querySelectorAll('p')];
  paragraphs.forEach((p) => {
    // Skip button paragraphs
    if (p.querySelector('del') || p.querySelector('strong > a') || p.querySelector('a.button')) return;
    if (p.textContent.trim()) {
      p.className = 'hero-subtitle';
      content.appendChild(p);
    }
  });

  // Build CTA buttons
  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'hero-cta';
  
  const allLinks = [...contentCell.querySelectorAll('a')];
  allLinks.forEach((link, i) => {
    link.className = ''; // Reset any EDS classes
    link.classList.remove('button');
    // Check if wrapped in <del> (primary) or <strong> (secondary)
    const parent = link.parentElement;
    const isPrimary = parent && parent.tagName === 'DEL';
    
    if (isPrimary || i === 0) {
      link.classList.add('btn', 'btn-primary');
    } else {
      link.classList.add('btn', 'btn-secondary');
    }
    ctaDiv.appendChild(link);
  });
  
  content.appendChild(ctaDiv);
  block.appendChild(content);

  // Scroll indicator
  const scrollArrow = document.createElement('div');
  scrollArrow.className = 'hero-scroll-arrow';
  scrollArrow.innerHTML = '<svg viewBox="0 0 24 24" width="32" height="32"><path d="M7 10l5 5 5-5" stroke="white" stroke-width="2" fill="none"/></svg>';
  block.appendChild(scrollArrow);
}
