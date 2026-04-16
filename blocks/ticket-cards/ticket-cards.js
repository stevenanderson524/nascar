export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    // Cell 0: image, Cell 1: content (h2, tag, description, CTAs)
    const imageCell = cells[0];
    const contentCell = cells[1];

    if (!imageCell || !contentCell) return;

    // Style image cell
    imageCell.classList.add('ticket-cards-image');

    // Build content structure
    contentCell.classList.add('ticket-cards-content');

    // Separate CTAs from description content
    const allLinks = [...contentCell.querySelectorAll('a')];
    const ctaContainer = document.createElement('div');
    ctaContainer.classList.add('ticket-cards-cta');

    if (allLinks.length > 0) {
      // First CTA = Buy Now (red)
      const buyLink = allLinks[0];
      buyLink.classList.add('cta-buy');
      // Remove EDS button classes
      buyLink.classList.remove('button');
      const buyContainer = buyLink.closest('.button-container') || buyLink.closest('p');
      if (buyContainer) {
        buyContainer.remove();
      }
      ctaContainer.appendChild(buyLink);

      // Remaining CTAs go in a row
      if (allLinks.length > 1) {
        const ctaRow = document.createElement('div');
        ctaRow.classList.add('cta-row');
        allLinks.slice(1).forEach((link) => {
          link.classList.add('cta-secondary');
          link.classList.remove('button');
          const container = link.closest('.button-container') || link.closest('p');
          if (container) {
            container.remove();
          }
          ctaRow.appendChild(link);
        });
        ctaContainer.appendChild(ctaRow);
      }
    }

    contentCell.appendChild(ctaContainer);
  });
}
