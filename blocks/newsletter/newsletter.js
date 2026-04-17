export default async function decorate(block) {
const rows = [...block.children];

// Row 0: background image
const bgRow = rows[0];
const bgImg = bgRow.querySelector("img");
const bgSrc = bgImg ? bgImg.src : "";
bgRow.remove();

// Set background image on block
if (bgSrc) {
block.style.backgroundImage = `url('${bgSrc}')`;
}

// Row 1: heading + subheading
const headingRow = rows[1];
const headingCell = headingRow.querySelector("div");
const h2 = headingCell.querySelector("h2");
const sub = headingCell.querySelector("p");

// Row 2: field labels (First Name, Last Name, Email)
const fieldsRow = rows[2];
const fieldCells = [...fieldsRow.children];
const fieldLabels = fieldCells.map((c) => c.textContent.trim());

// Row 3: terms/consent text
const termsRow = rows[3];
const termsCell = termsRow.querySelector("div");
const termsHTML = termsCell.innerHTML;

// Row 4: button text
const buttonRow = rows[4];
const buttonText = buttonRow.textContent.trim();

// Clear block
block.textContent = "";

// Build overlay
const overlay = document.createElement("div");
overlay.className = "newsletter-overlay";
block.append(overlay);

// Build content container
const container = document.createElement("div");
container.className = "newsletter-content";

// Header
const header = document.createElement("div");
header.className = "newsletter-header";
if (h2) header.append(h2);
if (sub) {
sub.className = "newsletter-subheading";
header.append(sub);
}
container.append(header);

// Form
const form = document.createElement("form");
form.className = "newsletter-form";
form.setAttribute("novalidate", "");

// Alert container
const alertContainer = document.createElement("div");
alertContainer.className = "newsletter-alerts";
form.append(alertContainer);

// Input fields
const fieldsContainer = document.createElement("div");
fieldsContainer.className = "newsletter-fields";

fieldLabels.forEach((label) => {
const fieldDiv = document.createElement("div");
fieldDiv.className = "newsletter-field";
const input = document.createElement("input");
input.type = label.toLowerCase() === "email" ? "email" : "text";
input.name = label.toLowerCase().replace(/\s+/g, "_");
input.placeholder = `*${label}`;
input.required = true;
const labelEl = document.createElement("label");
labelEl.className = "visually-hidden";
labelEl.textContent = label;
fieldDiv.append(labelEl, input);
fieldsContainer.append(fieldDiv);
});
form.append(fieldsContainer);

// Checkbox / terms
const checkDiv = document.createElement("div");
checkDiv.className = "newsletter-terms";
const checkLabel = document.createElement("label");
checkLabel.className = "newsletter-checkbox-label";
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.name = "newsletter_terms";
checkbox.required = true;
const termsSpan = document.createElement("span");
termsSpan.innerHTML = termsHTML;
checkLabel.append(checkbox, termsSpan);
checkDiv.append(checkLabel);

const reqText = document.createElement("p");
reqText.className = "newsletter-required";
reqText.textContent = "* Required";
checkDiv.append(reqText);
form.append(checkDiv);

// Submit button
const submitDiv = document.createElement("div");
submitDiv.className = "newsletter-submit";
const btn = document.createElement("button");
btn.type = "submit";
btn.className = "newsletter-btn";
btn.textContent = buttonText;
submitDiv.append(btn);
form.append(submitDiv);

// Simple client-side validation feedback
form.addEventListener("submit", (e) => {
e.preventDefault();
const inputs = form.querySelectorAll("input[required]");
let valid = true;
inputs.forEach((inp) => {
if (!inp.value.trim()) {
inp.classList.add("error");
valid = false;
} else {
inp.classList.remove("error");
}
});
if (!checkbox.checked) {
checkbox.classList.add("error");
valid = false;
} else {
checkbox.classList.remove("error");
}
if (valid) {
alertContainer.innerHTML = '<p class="newsletter-success">You have been signed up successfully.</p>';
form.reset();
}
});

container.append(form);
block.append(container);
}
