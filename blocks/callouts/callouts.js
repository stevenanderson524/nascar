export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell) => {
      // Identify image cells: contain picture/img but no headings
      const pic = cell.querySelector('picture, img');
      const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');

      if (pic && !heading) {
        cell.classList.add('callout-image');
      } else {
        cell.classList.add('callout-text');

        // Process CTA buttons within text cell
        const links = [...cell.querySelectorAll('a')];
        links.forEach((link) => {
          const parent = link.parentElement;
          const isDel = parent && parent.tagName === 'DEL';
          const isStrong = parent && parent.tagName === 'STRONG';

          link.classList.remove('button', 'primary', 'secondary');

          if (isDel) {
            link.classList.add('btn', 'btn-primary');
            // Unwrap from del
            if (parent.parentElement) {
              parent.parentElement.replaceChild(link, parent);
            }
          } else if (isStrong) {
            link.classList.add('btn', 'btn-secondary');
            // Unwrap from strong
            if (parent.parentElement) {
              parent.parentElement.replaceChild(link, parent);
            }
          } else {
            link.classList.add('btn', 'btn-secondary');
          }
        });
      }
    });
  });
}
