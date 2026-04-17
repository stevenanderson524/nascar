import { loadArea, setConfig } from "./ak.js";
const hostnames = ["authorkit.dev"];
const locales = { "": { lang: "en" } };
const linkBlocks = [{ fragment: "/fragments/" }, { schedule: "/schedules/" }, { youtube: "https://www.youtube" }];
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
setTimeout(function() {
// Pass 1: Replace broken <picture> elements
document.querySelectorAll("main picture").forEach(function(pic) {
var img = pic.querySelector("img");
if (!img || img.naturalWidth > 10) return;
var alt = (img.alt || "").toLowerCase().trim();
var origSrc = findOrigSrc(alt);
if (origSrc) {
var n = document.createElement("img");
n.alt = img.alt || "";
n.loading = "eager";
n.src = origSrc;
n.style.cssText = "width:100%;height:auto;display:block;";
pic.parentNode.replaceChild(n, pic);
}
});
// Pass 2: Fix ALL broken img elements (including those processed by block JS)
document.querySelectorAll("main img").forEach(function(img) {
if (img.naturalWidth > 10) return;
var alt = (img.alt || "").toLowerCase().trim();
var origSrc = findOrigSrc(alt);
if (origSrc) {
img.src = origSrc;
img.loading = "eager";
img.style.cssText = img.style.cssText + ";width:100%;height:auto;display:block;";
}
});
}, 1500);
}
function findOrigSrc(alt) {
var m = {
"grandstand": "/drafts/images/WGI_GA_CALLOUT.png",
"camp with us": "/drafts/images/Camping_1300x731.jpg",
"camping at watkins": "/drafts/images/Camping-at-WGI.jpg",
"busch light at the bog at": "/drafts/images/WGI_TheBog3.jpg",
"busch light at the bog hospitality": "/drafts/images/BUSCHLIGHTbog.jpg",
"general admission": "/drafts/images/IMSA_Sweeps_600x338.jpg",
"mission party deck at": "/drafts/images/MISSION-DECK.png",
"mission party deck image": "/drafts/images/MISSION-DECK.png",
"mission party deck hospitality": "/drafts/images/MissionPartyDeck_350x197-1.jpg",
"pre-race": "/drafts/images/WGI_entitlement.jpg",
"hosts on a stage": "/drafts/images/WGI_entitlement.jpg",
"on location official": "/drafts/images/callout-onlocation-fresh.jpg",
"on location travel": "/drafts/images/on-location-travel.jpg",
"historic racing": "/drafts/images/WGIHistory_600x338.png",
"formula one": "/drafts/images/WGIHistory_600x338.png",
"glen club": "/drafts/images/WGI_GlenClub.jpg",
"sahlen": "/drafts/images/SPI_350x197.jpg",
"ticketmaster": "/drafts/images/ticketmaster-logo.png",
"busch beer": "/drafts/images/sponsor-busch.png",
"busch": "/drafts/images/sponsor-busch.png",
"toyota": "/drafts/images/sponsor-toyota.png",
"xfinity": "/drafts/images/sponsor-xfinity.png",
"centralus": "/drafts/images/sponsor-centralus.png",
"coca": "/drafts/images/sponsor-coca-cola.jpg",
"corning": "/drafts/images/sponsor-corning.jpeg",
"freeway": "/drafts/images/sponsor-freeway.png",
"general tire": "/drafts/images/sponsor-general-tire.png",
"go bowling": "/drafts/images/sponsor-go-bowling.png",
"hilliard": "/drafts/images/sponsor-hilliard.jpg",
"lp": "/drafts/images/sponsor-lp.png",
"mission food": "/drafts/images/sponsor-mission.png",
"on location": "/drafts/images/sponsor-on-location.png",
"newsletter": "/drafts/images/newsletter-bg.png",
"watkins glen international background": "/drafts/images/newsletter-bg.png",
"watkins glen international racing": "/drafts/images/hero-poster.jpeg",
"watkins glen international racetrack": "/drafts/images/hero-poster.jpeg"
};
var keys = Object.keys(m);
for (var i = 0; i < keys.length; i++) {
if (alt.indexOf(keys[i]) > -1) return m[keys[i]];
}
return null;
}
await loadPage();
(async function loadDa() {
if (!new URL(window.location.href).searchParams.get("dapreview")) return;
import("https://da.live/scripts/dapreview.js").then(({ default: daPreview }) => daPreview(loadPage));
}());
