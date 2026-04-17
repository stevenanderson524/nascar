export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const contentCell = cells[1];
    const children = [...contentCell.children];

    // Find CTA paragraphs  paragraphs that contain a link and nothing else significant
    const ctaParagraphs = [];
    for (let i = children.length - 1; i >= 0; i--) {
      const el = children[i];
      const link = el.querySelector('a');
      if (el.tagName === 'P' && link && el.textContent.trim() === link.textContent.trim()) {
        ctaParagraphs.unshift(el);
      } else {
        break;
      }
    }

    if (ctaParagraphs.length >= 1) {
      // Create a CTA container
      const ctaContainer = document.createElement('div');
      ctaContainer.className = 'experience-card-ctas';

      // First CTA is BUY NOW (full width, primary button)
      const buyNowP = ctaParagraphs[0];
      const buyNowLink = buyNowP.querySelector('a');
      if (buyNowLink) {
        buyNowLink.className = 'btn btn-negative';
        const arrow = document.createElement('span');
        arrow.className = 'btn-arrow';
        arrow.textContent = ' ’';
        buyNowLink.appendChild(arrow);
        ctaContainer.appendChild(buyNowLink);
      }
      buyNowP.remove();

      // Remaining CTAs go in a row
      if (ctaParagraphs.length > 1) {
        const ctaRow = document.createElement('div');
        ctaRow.className = 'cta-row';
        for (let i = 1; i < ctaParagraphs.length; i++) {
          const link = ctaParagraphs[i].querySelector('a');
          if (link) {
            if (i === 1) {
              link.className = 'btn btn-secondary';
            } else {
              link.className = 'btn btn-outline-text';
            }
            ctaRow.appendChild(link);
          }
          ctaParagraphs[i].remove();
        }
        ctaContainer.appendChild(ctaRow);
      }

      contentCell.appendChild(ctaContainer);
    }
  });
}
