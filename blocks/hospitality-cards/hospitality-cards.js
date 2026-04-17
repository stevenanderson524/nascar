export default async function decorate(block) {
const rows = [...block.children];
if (!rows.length) return;

// Build a grid container for cards
const grid = document.createElement('div');
grid.classList.add('hospitality-grid');

rows.forEach((row) => {
const cells = [...row.children];
if (cells.length < 2) return;

const card = document.createElement('div');
card.classList.add('hospitality-card');

// Cell 0: image
const imgWrap = document.createElement('div');
imgWrap.classList.add('hospitality-card-image');
const pic = cells[0].querySelector('picture');
if (pic) imgWrap.appendChild(pic);
card.appendChild(imgWrap);

// Cell 1: text content (title, description, CTA)
const content = document.createElement('div');
content.classList.add('hospitality-card-content');
while (cells[1].firstChild) {
content.appendChild(cells[1].firstChild);
}
card.appendChild(content);

grid.appendChild(card);
row.remove();
});

block.appendChild(grid);
}

