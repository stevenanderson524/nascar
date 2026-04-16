export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    // Experience cards have 5 cells: image, title, label, description, cta
    // OR they might have just 2 cells like ticket-cards (image + content)

    if (cells.length >= 5) {
      // 5-cell structure: restructure into image + content
      const imageCell = cells[0];
      const titleCell = cells[1];
      const labelCell = cells[2];
      const descCell = cells[3];
      const ctaCell = cells[4];

      imageCell.classList.add('experience-cards-image');

      // Build unified content div
      const content = document.createElement('div');
      content.classList.add('experience-cards-content');

      // Title
      const title = titleCell.querySelector('h2, h3, h4');
      if (title) content.appendChild(title);

      // Label
      const labelText = labelCell.textContent.trim();
      if (labelText) {
        const label = document.createElement('span');
        label.className = 'card-label';
        label.textContent = labelText;
        content.appendChild(label);
      }

      // Description
      const descPs = [...descCell.querySelectorAll('p')];
      descPs.forEach((p) => content.appendChild(p));

      // CTAs
      const ctaContainer = document.createElement('div');
      ctaContainer.className = 'experience-cards-cta';

      const allLinks = [...ctaCell.querySelectorAll('a')];
      allLinks.forEach((link) => {
        const parent = link.parentElement;
        const isDel = parent && parent.tagName === 'DEL';
        link.classList.remove('button', 'primary', 'secondary');

        if (isDel) {
          link.classList.add('btn', 'btn-primary');
        } else {
          link.classList.add('btn', 'btn-secondary');
        }
        ctaContainer.appendChild(link);
      });

      // Separate primary and secondary
      const primaryBtns = ctaContainer.querySelectorAll('.btn-primary');
      const secondaryBtns = ctaContainer.querySelectorAll('.btn-secondary');
      ctaContainer.textContent = '';
      primaryBtns.forEach((b) => ctaContainer.appendChild(b));
      if (secondaryBtns.length > 0) {
        const ctaRow = document.createElement('div');
        ctaRow.className = 'cta-row';
        secondaryBtns.forEach((b) => ctaRow.appendChild(b));
        ctaContainer.appendChild(ctaRow);
      }

      content.appendChild(ctaContainer);

      // Remove old cells and add new structure
      titleCell.remove();
      labelCell.remove();
      descCell.remove();
      ctaCell.remove();
      row.appendChild(content);
    } else if (cells.length >= 2) {
      // Simple 2-cell structure (image + content) - same as ticket-cards
      cells[0].classList.add('experience-cards-image');
      cells[1].classList.add('experience-cards-content');
    }
  });
}
