const ICONS = {
calendar: "<svg viewBox=\"0 0 448 512\" fill=\"currentColor\" width=\"32\" height=\"32\"><path d=\"M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z\"/></svg>",
phone: "<svg viewBox=\"0 0 512 512\" fill=\"currentColor\" width=\"32\" height=\"32\"><path d=\"M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z\"/></svg>",
ticket: "<svg viewBox=\"0 0 576 512\" fill=\"currentColor\" width=\"32\" height=\"32\"><path d=\"M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64z\"/></svg>",
rv: "<svg viewBox=\"0 0 640 512\" fill=\"currentColor\" width=\"32\" height=\"32\"><path d=\"M64 32C28.7 32 0 60.7 0 96V304v80 16c0 44.2 35.8 80 80 80s80-35.8 80-80h64 32 64c0 44.2 35.8 80 80 80s80-35.8 80-80h32c35.3 0 64-28.7 64-64V256 224 176c0-26.5-21.5-48-48-48H416V96c0-35.3-28.7-64-64-64H64zm416 240H480V192h96l32 48v32H480zM80 432a32 32 0 110-64 32 32 0 110 64zm320 0a32 32 0 110-64 32 32 0 110 64z\"/></svg>",
hotel: "<svg viewBox=\"0 0 512 512\" fill=\"currentColor\" width=\"32\" height=\"32\"><path d=\"M0 32C0 14.3 14.3 0 32 0H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V480c17.7 0 32 14.3 32 32s-14.3 32-32 32H304V464c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32zm96 80v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H240zm112 16v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16z\"/></svg>"
};

const ICON_MAP = {
"Event Calendar": "calendar",
"Schedule A Call": "phone",
"NASCAR Tickets": "ticket",
"IMSA Ticket Options": "ticket",
"Camping": "rv",
"Travel Packages": "hotel"
};

export default function decorate(block) {
const rows = [...block.children];
const nav = document.createElement("nav");
nav.className = "event-bar-nav";

rows.forEach(function(row) {
const cells = [...row.children];
const item = document.createElement("div");
item.className = "event-bar-item";

const textCell = cells[1] || cells[0];
const link = textCell ? textCell.querySelector("a") : null;
const labelText = link ? link.textContent.trim() : "";

// Add icon based on label text
var iconName = ICON_MAP[labelText] || "ticket";
var iconSvg = ICONS[iconName] || "";
if (iconSvg) {
var iconWrap = document.createElement("div");
iconWrap.className = "event-bar-icon";
iconWrap.innerHTML = iconSvg;
item.appendChild(iconWrap);
}

if (link) {
var labelWrap = document.createElement("div");
labelWrap.className = "event-bar-label";
var a = document.createElement("a");
a.href = link.href;
a.textContent = labelText;
labelWrap.appendChild(a);
item.appendChild(labelWrap);
}

nav.appendChild(item);
});

block.textContent = "";
block.appendChild(nav);
}
