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
setTimeout(function() {
document.querySelectorAll("main picture").forEach(function(pic) {
var img = pic.querySelector("img");
if (!img) return;
if (img.complete && img.naturalWidth > 10) return;
var alt = (img.alt || "").toLowerCase().trim();
var origSrc = findOriginalSrc(alt);
if (origSrc) {
var newImg = document.createElement("img");
newImg.alt = img.alt || "";
newImg.loading = "eager";
newImg.src = origSrc;
newImg.style.cssText = "width:100%;height:auto;display:block;";
pic.parentNode.replaceChild(newImg, pic);
}
});
}, 1500);
}

function findOriginalSrc(alt) {
var map = {
"hero-poster": "/drafts/images/hero-poster.jpeg",
"grandstand": "/drafts/images/WGI_GA_CALLOUT.png",
"camp with us": "/drafts/images/Camping_1300x731.jpg",
"camping at watkins": "/drafts/images/Camping_1300x731.jpg",
"camping-wgi": "/drafts/images/camping-wgi.jpg",
"busch light at the bog at": "/drafts/images/WGI_TheBog3.jpg",
"busch light at the bog hospitality": "/drafts/images/BUSCHLIGHTbog.jpg",
"general admission at": "/drafts/images/imsa-sweeps.jpg",
"general admission image": "/drafts/images/imsa-sweeps.jpg",
"general admission": "/drafts/images/imsa-sweeps.jpg",
"mission party deck at": "/drafts/images/mission-deck.png",
"mission party deck image": "/drafts/images/mission-deck.png",
"mission party deck hospitality": "/drafts/images/MissionPartyDeck_350x197-1.jpg",
"pre-race": "/drafts/images/WGI_entitlement.jpg",
"hosts on a stage": "/drafts/images/WGI_entitlement.jpg",
"on location": "/drafts/images/Go_Bowling_Callout2.jpg",
"historic racing": "/drafts/images/WGIHistory_600x338.png",
"formula one": "/drafts/images/WGIHistory_600x338.png",
"glen club": "/drafts/images/WGI_GlenClub.jpg",
"sahlen": "/drafts/images/SPI_350x197.jpg",
"ticketmaster": "/drafts/images/ticketmaster-logo.png",
"busch beer": "/drafts/images/sponsor-busch.png",
"toyota": "/drafts/images/sponsor-toyota.png",
"xfinity": "/drafts/images/sponsor-xfinity.png",
"centralus": "/drafts/images/sponsor-centralus.png",
"coca-cola": "/drafts/images/sponsor-coca-cola.jpg",
"corning": "/drafts/images/sponsor-corning.jpeg",
"freeway": "/drafts/images/sponsor-freeway.png",
"general tire": "/drafts/images/sponsor-general-tire.png",
"go bowling": "/drafts/images/sponsor-go-bowling.png",
"hilliard": "/drafts/images/sponsor-hilliard.jpg",
"lp": "/drafts/images/sponsor-lp.png",
"mission foods": "/drafts/images/sponsor-mission.png",
"on location exp": "/drafts/images/sponsor-on-location.png",
"newsletter": "/drafts/images/newsletter-bg.png",
"watkins glen international background": "/drafts/images/newsletter-bg.png"
};
// Fuzzy match: check if alt contains any map key
var keys = Object.keys(map);
for (var i = 0; i < keys.length; i++) {
if (alt.indexOf(keys[i]) > -1) return map[keys[i]];
}
return null;
}

await loadPage();

(async function loadDa() {
if (!new URL(window.location.href).searchParams.get("dapreview")) return;
import("https://da.live/scripts/dapreview.js").then(({ default: daPreview }) => daPreview(loadPage));
}());
