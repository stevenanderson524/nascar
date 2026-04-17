export default function decorate(block) {
const rows = [...block.children];
if (rows.length < 2) return;

const imgRow = rows[0];
const contentRow = rows[1];

// Extract poster image URL
const pic = imgRow.querySelector("picture");
const img = pic ? pic.querySelector("img") : null;
const src = img ? img.src : "";

// Set as background image
if (src) {
block.style.backgroundImage = "url(" + src + ")";
}

// Hide the image row
imgRow.className = "hero-bg";

// Restructure content
const contentDiv = contentRow.querySelector("div");
if (contentDiv) {
contentDiv.className = "hero-content";

// Collect CTA links into a cta container
const links = contentDiv.querySelectorAll("a");
if (links.length > 0) {
const ctaDiv = document.createElement("div");
ctaDiv.className = "hero-cta";
links.forEach(function(link) {
const parent = link.parentElement;
if (parent) {
ctaDiv.appendChild(parent);
}
});
contentDiv.appendChild(ctaDiv);
}
}
}