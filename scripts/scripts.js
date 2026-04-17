import { loadArea, setConfig } from "./ak.js";

const hostnames = ["authorkit.dev"];

const locales = {
"": { lang: "en" },
};

const linkBlocks = [
{ fragment: "/fragments/" },
{ schedule: "/schedules/" },
{ youtube: "https://www.youtube" },
];

const components = ["fragment", "schedule"];

const decorateArea = ({ area = document }) => {
const eagerLoad = (parent, selector) => {
const img = parent.querySelector(selector);
if (!img) return;
img.removeAttribute("loading");
img.fetchPriority = "high";
};
eagerLoad(area, "img");
};

export async function loadPage() {
setConfig({ hostnames, locales, linkBlocks, components, decorateArea });
await loadArea();
fixBrokenImages();
}

function fixBrokenImages() {
// Wait for images to attempt loading, then fix broken ones
setTimeout(function() {
document.querySelectorAll("main img").forEach(function(img) {
if (img.naturalWidth === 0 || img.src.indexOf("about:error") > -1) {
// Try the picture source as fallback
var picture = img.closest("picture");
if (picture) {
var sources = picture.querySelectorAll("source");
sources.forEach(function(s) { s.remove(); });
}
// Extract original filename from media hash if possible
// Or just reload with a cache buster
if (img.src.indexOf("media_") > -1) {
img.src = img.src.split("?")[0] + "?t=" + Date.now();
}
}
});
}, 3000);
}

await loadPage();

(async function loadDa() {
if (!new URL(window.location.href).searchParams.get("dapreview")) return;
import("https://da.live/scripts/dapreview.js").then(({ default: daPreview }) => daPreview(loadPage));
}());
