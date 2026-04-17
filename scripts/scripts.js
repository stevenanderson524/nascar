import { loadArea, setConfig } from "./ak.js";

const hostnames = ["authorkit.dev"];
const locales = { "": { lang: "en" } };
const linkBlocks = [
{ fragment: "/fragments/" },
{ schedule: "/schedules/" },
{ youtube: "https://www.youtube" },
];
const components = ["fragment", "schedule"];

const decorateArea = ({ area = document }) => {
const img = area.querySelector("img");
if (img) { img.removeAttribute("loading"); img.fetchPriority = "high"; }
};

export async function loadPage() {
setConfig({ hostnames, locales, linkBlocks, components, decorateArea });
await loadArea();
fixBrokenImages();
}

function fixBrokenImages() {
var bust = "cb=" + Date.now();
setTimeout(function() {
document.querySelectorAll("main picture").forEach(function(pic) {
var img = pic.querySelector("img");
if (!img || img.naturalWidth > 10) return;
// Remove all sources - they use webp/jpg conversions that are cached broken
pic.querySelectorAll("source").forEach(function(s) { s.remove(); });
// Add cache buster to img src
var src = img.getAttribute("src") || "";
if (src.indexOf("media_") > -1) {
var base = src.split("?")[0];
// Use png format instead of jpg to avoid broken conversion cache
img.src = base + "?width=750&format=png&optimize=medium&" + bust;
}
});
}, 2000);
}

await loadPage();

(async function loadDa() {
if (!new URL(window.location.href).searchParams.get("dapreview")) return;
import("https://da.live/scripts/dapreview.js").then(({ default: daPreview }) => daPreview(loadPage));
}());
