export default async function decorate(block) {
  const rows = [...block.children];

  // Row 0: background image
  const bgRow = rows[0];
  const bgPic = bgRow?.querySelector('picture');

  // Row 1: heading
  const headingRow = rows[1];
  const heading = headingRow?.querySelector('h2');

  // Row 2: subtitle
  const subtitleRow = rows[2];
  const subtitle = subtitleRow?.querySelector('p');

  // Row 3: field labels (First Name, Last Name, Email)
  const fieldsRow = rows[3];
  const fieldLabels = [...(fieldsRow?.children || [])].map(
    (cell) => cell.textContent.trim(),
  );

  // Row 4: button text
  const buttonRow = rows[4];
  const buttonText = buttonRow?.textContent?.trim() || 'Sign Up';

  // Clear block
  block.textContent = '';

  // Background image layer
  if (bgPic) {
    const bgDiv = document.createElement('div');
    bgDiv.className = 'newsletter-bg';
    bgDiv.append(bgPic);
    block.append(bgDiv);
  }

  // Overlay layer
  const overlay = document.createElement('div');
  overlay.className = 'newsletter-overlay';
  block.append(overlay);

  // Content wrapper
  const content = document.createElement('div');
  content.className = 'newsletter-content';

  // Header section
  const header = document.createElement('div');
  header.className = 'newsletter-header';
  if (heading) header.append(heading);
  if (subtitle) header.append(subtitle);
  content.append(header);

  // Form section
  const form = document.createElement('form');
  form.className = 'newsletter-form';
  form.addEventListener('submit', (e) => e.preventDefault());

  fieldLabels.forEach((label) => {
    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'newsletter-field';
    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    const input = document.createElement('input');
    input.type = label.toLowerCase().includes('email') ? 'email' : 'text';
    input.placeholder = `*${label}`;
    input.name = label.toLowerCase().replace(/\s+/g, '_');
    input.required = true;
    fieldGroup.append(labelEl);
    fieldGroup.append(input);
    form.append(fieldGroup);
  });

  // Terms checkbox
  const terms = document.createElement('div');
  terms.className = 'newsletter-terms';
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'newsletter-terms';
  const termsLabel = document.createElement('label');
  termsLabel.htmlFor = 'newsletter-terms';
  termsLabel.textContent = '*By signing up, you agree to receive communications from Watkins Glen International in accordance with our Privacy Policy and Terms of Use.';
  terms.append(checkbox);
  terms.append(termsLabel);
  form.append(terms);

  // Required note
  const required = document.createElement('p');
  required.className = 'newsletter-required';
  required.textContent = '* Required';
  form.append(required);

  // Submit button
  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = buttonText;
  form.append(btn);

  content.append(form);
  block.append(content);
}
