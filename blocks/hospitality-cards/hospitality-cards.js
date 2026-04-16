export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // First row is the heading row
  const headingRow = rows[0];
  headingRow.classList.add('hospitality-cards-heading');

  // Remaining rows are card rows — restructure each into a card
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('hospitality-cards-grid');

  rows.slice(1).forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('div');
    card.classList.add('hospitality-card');

    // Cell 0: image
    if (cells[0]) {
      const imgWrap = document.createElement('div');
      imgWrap.classList.add('hospitality-card-image');
      imgWrap.innerHTML = cells[0].innerHTML;
      card.appendChild(imgWrap);
    }

    // Cell 1: text content (title, description, CTA)
    if (cells[1]) {
      const content = document.createElement('div');
      content.classList.add('hospitality-card-content');
      content.innerHTML = cells[1].innerHTML;
      card.appendChild(content);
    }

    cardContainer.appendChild(card);
    row.remove();
  });

  block.appendChild(cardContainer);
}
