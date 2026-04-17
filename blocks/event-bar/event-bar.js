export default async function decorate(block) {
const rows = [...block.children];
const nav = document.createElement("nav");
nav.className = "event-bar-nav";

rows.forEach(function(row) {
const cells = [...row.children];
const item = document.createElement("div");
item.className = "event-bar-item";

const iconCell = cells[0];
const textCell = cells[1];

// Icons may be span.icon (before loadIcons) or svg.icon (after loadIcons)
const iconEl = iconCell ? (iconCell.querySelector("svg.icon") || iconCell.querySelector("span.icon")) : null;
if (iconEl) {
const iconWrap = document.createElement("div");
iconWrap.className = "event-bar-icon";
iconWrap.appendChild(iconEl);
item.appendChild(iconWrap);
}

const link = textCell ? textCell.querySelector("a") : null;
if (link) {
const labelWrap = document.createElement("div");
labelWrap.className = "event-bar-label";
const a = document.createElement("a");
a.href = link.href;
a.textContent = link.textContent.trim();
labelWrap.appendChild(a);
item.appendChild(labelWrap);
}

nav.appendChild(item);
});

block.textContent = "";
block.appendChild(nav);
}
