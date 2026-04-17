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
if (!img) return;
// Remove all source elements to prevent webp/format issues
pic.querySelectorAll("source").forEach(function(s) { s.remove(); });
var src = img.getAttribute("src") || "";
if (src.indexOf("media_") > -1) {
// Replace the entire img element to bypass browser error cache
var base = src.split("?")[0];
// Change .jpg extension to .png if the upload was .png
base = base.replace(/\.jpg$/, ".png").replace(/\.jpeg$/, ".png");
var newImg = document.createElement("img");
newImg.alt = img.alt || "";
newImg.loading = img.loading || "lazy";
newImg.src = base + "?width=750&" + bust;
img.parentNode.replaceChild(newImg, img);
}
});
}, 1500);
}

await loadPage();

(async function loadDa() {
if (!new URL(window.location.href).searchParams.get("dapreview")) return;
import("https://da.live/scripts/dapreview.js").then(({ default: daPreview }) => daPreview(loadPage));
}());
