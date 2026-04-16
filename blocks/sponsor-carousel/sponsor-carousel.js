export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // First row is the header (Ticketmaster logo)
  const headerRow = rows[0];
  const headerImg = headerRow.querySelector('img');

  // Remaining rows are sponsor cards
  const sponsorRows = rows.slice(1);

  // Build the new structure
  const header = document.createElement('div');
  header.className = 'sponsor-header';
  if (headerImg) {
    const img = document.createElement('img');
    img.src = headerImg.src;
    img.alt = headerImg.alt || 'Presented by';
    img.loading = 'lazy';
    header.appendChild(img);
  }

  // Build carousel
  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  sponsorRows.forEach((row) => {
    const cells = [...row.children];
    const imgCell = cells[0];
    const linkCell = cells[1];

    const img = imgCell ? imgCell.querySelector('img') : null;
    const link = linkCell ? linkCell.querySelector('a') : null;

    const card = document.createElement('a');
    card.className = 'sponsor-card';
    card.href = link ? link.href : '#';
    card.target = '_blank';
    card.rel = 'noopener noreferrer';

    if (img) {
      const cardImg = document.createElement('img');
      cardImg.src = img.src;
      cardImg.alt = img.alt || '';
      cardImg.loading = 'lazy';
      card.appendChild(cardImg);
    }

    const name = document.createElement('span');
    name.className = 'sponsor-name';
    name.textContent = link ? link.textContent.trim() : (img ? img.alt : '');
    card.appendChild(name);

    track.appendChild(card);
  });

  viewport.appendChild(track);

  // Arrow buttons
  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-arrow prev';
  prevBtn.setAttribute('aria-label', 'Previous sponsors');
  prevBtn.innerHTML = '&#8249;';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-arrow next';
  nextBtn.setAttribute('aria-label', 'Next sponsors');
  nextBtn.innerHTML = '&#8250;';

  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(header);
  block.appendChild(prevBtn);
  block.appendChild(viewport);
  block.appendChild(nextBtn);

  // Carousel logic
  let offset = 0;
  const getVisibleCount = () => {
    const vw = viewport.offsetWidth;
    const cards = track.querySelectorAll('.sponsor-card');
    if (!cards.length) return 1;
    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    return Math.floor((vw + gap) / (cardWidth + gap));
  };

  const totalCards = track.querySelectorAll('.sponsor-card').length;

  const updateTrack = () => {
    const cards = track.querySelectorAll('.sponsor-card');
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth;
    const gap = 20;
    track.style.transform = `translateX(-${offset * (cardWidth + gap)}px)`;
  };

  prevBtn.addEventListener('click', () => {
    if (offset > 0) {
      offset -= 1;
      updateTrack();
    }
  });

  nextBtn.addEventListener('click', () => {
    const visible = getVisibleCount();
    if (offset < totalCards - visible) {
      offset += 1;
      updateTrack();
    }
  });
}
