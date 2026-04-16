export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // Expecting: [image, title, label, description, cta]
    if (cells.length >= 5) {
      cells[1].classList.add('card-title');
      cells[2].classList.add('card-label');
      cells[3].classList.add('card-description');
      cells[4].classList.add('card-cta');
    }
  });
}
