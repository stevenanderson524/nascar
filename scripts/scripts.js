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
var alt = img.alt || "";
var newImg = document.createElement("img");
newImg.alt = alt;
newImg.loading = "lazy";
newImg.style.width = "100%";
newImg.style.height = "auto";
// Use the alt text to find the original image
var origSrc = findOriginalSrc(alt, pic);
if (origSrc) {
newImg.src = origSrc;
pic.parentNode.replaceChild(newImg, pic);
}
});
}, 2000);
}

function findOriginalSrc(alt, pic) {
// Map alt text to original image filenames
var map = {
"Watkins Glen International racing action": "/drafts/images/hero-poster.jpeg",
"Watkins Glen International racetrack": "/drafts/images/hero-poster.jpeg",
"Grandstand Seating": "/drafts/images/WGI_GA_CALLOUT.png",
"Camp With Us": "/drafts/images/Camping_1300x731.jpg",
"Busch Light at The Bog": "/drafts/images/WGI_TheBog3.jpg",
"General Admission": "/drafts/images/imsa-sweeps.jpg",
"General Admission image": "/drafts/images/imsa-sweeps.jpg",
"Mission Party Deck": "/drafts/images/mission-deck.png",
"Mission Party Deck image": "/drafts/images/mission-deck.png",
"Camping": "/drafts/images/camping-wgi.jpg",
"Camping image": "/drafts/images/camping-wgi.jpg",
"Pre-race at Watkins Glen": "/drafts/images/WGI_entitlement.jpg",
"Hosts on a stage at Watkins Glen International lead a fan interaction during a Go Bowling at The Glen event": "/drafts/images/WGI_entitlement.jpg",
"On Location travel packages": "/drafts/images/Go_Bowling_Callout2.jpg",
"Pre-race experience of NASCAR racing at Watkins Glen International": "/drafts/images/Go_Bowling_Callout2.jpg",
"Historic racing at Watkins Glen": "/drafts/images/WGIHistory_600x338.png",
"Formula One Racing at Watkins Glen International": "/drafts/images/WGIHistory_600x338.png",
"Glen Club": "/drafts/images/WGI_GlenClub.jpg",
"Glen Club hospitality area": "/drafts/images/WGI_GlenClub.jpg",
"Sahlens Pit Inn": "/drafts/images/SPI_350x197.jpg",
"Sahlen\u0027s Pit Inn": "/drafts/images/SPI_350x197.jpg",
"Sahlen\u0027s Pit Inn hospitality area": "/drafts/images/SPI_350x197.jpg",
"Busch Light at The Bog hospitality area": "/drafts/images/BUSCHLIGHTbog.jpg",
"Mission Party Deck hospitality area": "/drafts/images/MissionPartyDeck_350x197-1.jpg",
"Ticketmaster": "/drafts/images/ticketmaster-logo.png",
"Busch Beer": "/drafts/images/sponsor-busch.png",
"Toyota": "/drafts/images/sponsor-toyota.png",
"Xfinity": "/drafts/images/sponsor-xfinity.png",
"Watkins Glen International": "/drafts/images/newsletter-bg.png",
"Watkins Glen International background": "/drafts/images/newsletter-bg.png"
};
return map[alt] || null;
}

await loadPage();

(async function loadDa() {
if (!new URL(window.location.href).searchParams.get("dapreview")) return;
import("https://da.live/scripts/dapreview.js").then(({ default: daPreview }) => daPreview(loadPage));
}());
