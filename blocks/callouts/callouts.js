export default async function decorate(block) {
// Each row is a callout card with [text-cell, image-cell]
const rows = [...block.children];
rows.forEach((row) => {
const cells = [...row.children];
if (cells.length >= 2) {
cells[0].classList.add('callout-content');
cells[1].classList.add('callout-image');
}
});
}
