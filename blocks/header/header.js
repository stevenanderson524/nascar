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

// Main nav
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
const link = li.querySelector(":scope > a");
if (link) {
const a = document.createElement("a");
a.href = link.href;
a.textContent = link.textContent.trim();
a.className = "header-nav-link";
navLi.appendChild(a);
}
const subUl = li.querySelector(":scope > ul");
if (subUl) {
navLi.classList.add("has-dropdown");
const dropdown = document.createElement("div");
dropdown.className = "header-dropdown";
const ddUl = document.createElement("ul");
[...subUl.children].forEach(function(subLi) {
const ddLi = document.createElement("li");
const subLink = subLi.querySelector("a");
if (subLink) {
const sa = document.createElement("a");
sa.href = subLink.href;
sa.textContent = subLink.textContent.trim();
ddLi.appendChild(sa);
}
ddUl.appendChild(ddLi);
});
dropdown.appendChild(ddUl);
navLi.appendChild(dropdown);
navLi.addEventListener("mouseenter", function() { navLi.classList.add("dropdown-open"); });
navLi.addEventListener("mouseleave", function() { navLi.classList.remove("dropdown-open"); });
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

block.appendChild(topBar);
}
