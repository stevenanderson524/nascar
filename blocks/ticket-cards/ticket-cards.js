export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const imageCell = cells[0];
    const contentCell = cells[1];

    // Style image cell
    imageCell.classList.add('ticket-cards-image');

    // Build content structure
    contentCell.classList.add('ticket-cards-content');

    // Process CTAs - find all links and categorize them
    const allLinks = [...contentCell.querySelectorAll('a')];
    const ctaContainer = document.createElement('div');
    ctaContainer.classList.add('ticket-cards-cta');

    allLinks.forEach((link) => {
      const parent = link.parentElement;

      // Determine button type
      const isDel = parent && parent.tagName === 'DEL';

      // Remove EDS button classes
      link.classList.remove('button', 'primary', 'secondary');

      if (isDel) {
        link.classList.add('btn', 'btn-primary');
      } else {
        link.classList.add('btn', 'btn-secondary');
      }

      // Remove the original container (p > del > a or p > strong > a)
      const wrapper = link.closest('p') || link.closest('.button-container');
      if (wrapper && wrapper.parentElement === contentCell) {
        wrapper.remove();
      } else if (parent && (parent.tagName === 'DEL' || parent.tagName === 'STRONG')) {
        parent.remove();
      }

      ctaContainer.appendChild(link);
    });

    // Group secondary buttons in a row
    const primaryBtns = ctaContainer.querySelectorAll('.btn-primary');
    const secondaryBtns = ctaContainer.querySelectorAll('.btn-secondary');

    // Rebuild: primary first, then secondary in a row
    ctaContainer.textContent = '';
    primaryBtns.forEach((btn) => ctaContainer.appendChild(btn));

    if (secondaryBtns.length > 0) {
      const row2 = document.createElement('div');
      row2.className = 'cta-row';
      secondaryBtns.forEach((btn) => row2.appendChild(btn));
      ctaContainer.appendChild(row2);
    }

    contentCell.appendChild(ctaContainer);
  });
}
