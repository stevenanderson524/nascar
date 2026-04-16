export default async function decorate(block) {
  // Row 1 = background image, Row 2 = text content
  // Structure is already correct from .plain.html
  // Just ensure the image in row 1 fills the container
  const rows = [...block.children];
  if (rows.length < 2) return;

  const imageRow = rows[0];
  const contentRow = rows[1];

  // Mark rows for CSS targeting
  imageRow.classList.add('hero-image');
  contentRow.classList.add('hero-content');
}
