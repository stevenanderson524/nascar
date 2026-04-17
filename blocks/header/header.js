export default async function decorate(block) {
const navPath = "/drafts/nav";
let resp = await fetch(navPath + ".plain.html");
if (!resp.ok) resp = await fetch("/nav.plain.html");
if (!resp.ok) return;

const html = await resp.text();
const temp = document.createElement("div");
temp.innerHTML = html;

const sections = [...temp.children];
const logoSection = sections[0];
const mainNavSection = sections[1];
const utilSection = sections[2];

block.textContent = "";

const topBar = document.createElement("div");
topBar.className = "header-top";

// Logo
const logoDiv = document.createElement("div");
logoDiv.className = "header-logo";
if (logoSection) {
const logoLink = logoSection.querySelector("a");
const logoImg = logoSection.querySelector("img");
if (logoLink) {
const a = document.createElement("a");
a.href = logoLink.href || "/";
if (logoImg) {
const img = document.createElement("img");
img.src = logoImg.src;
img.alt = logoImg.alt || "Watkins Glen International";
img.loading = "eager";
a.appendChild(img);
} else {
a.textContent = "Watkins Glen International";
}
logoDiv.appendChild(a);
}
}
topBar.appendChild(logoDiv);

// Main nav - links may be inside <p> tags due to EDS formatting
const mainNav = document.createElement("nav");
mainNav.className = "header-nav";
if (mainNavSection) {
const topUl = mainNavSection.querySelector("ul");
if (topUl) {
const navUl = document.createElement("ul");
navUl.className = "header-nav-list";
[...topUl.children].forEach(function(li) {
const navLi = document.createElement("li");
navLi.className = "header-nav-item";
// Find link - could be direct child or inside <p>
const link = li.querySelector("a");
if (link) {
const a = document.createElement("a");
a.href = link.href;
a.textContent = link.textContent.trim();
a.className = "header-nav-link";
navLi.appendChild(a);
}
navUl.appendChild(navLi);
});
mainNav.appendChild(navUl);
}
}
topBar.appendChild(mainNav);

// Utility icons
const utilDiv = document.createElement("div");
utilDiv.className = "header-util";
if (utilSection) {
const links = utilSection.querySelectorAll("a");
links.forEach(function(link) {
const a = document.createElement("a");
a.href = link.href;
a.className = "util-link";
a.textContent = link.textContent.trim();
utilDiv.appendChild(a);
});
}
topBar.appendChild(utilDiv);

// Hamburger
const hamburger = document.createElement("button");
hamburger.className = "header-hamburger";
hamburger.setAttribute("aria-label", "Toggle menu");
hamburger.innerHTML = "<span></span><span></span><span></span>";
hamburger.addEventListener("click", function() { block.classList.toggle("nav-open"); });
topBar.appendChild(hamburger);

block.appendChild(topBar);
}
