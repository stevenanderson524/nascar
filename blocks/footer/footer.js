import { getConfig, getMetadata, loadStyle } from '../../scripts/ak.js';

const FOOTER_PATH = '/drafts/footer.plain.html';

async function loadFooterFragment(path) {
  const resp = await fetch(path);
  if (!resp.ok) throw Error(`Could not fetch ${path}`);

  const html = await resp.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Support both full-page fragments (main > div) and plain.html (body > div)
  let sections = doc.body.querySelectorAll('main > div');
  if (!sections.length) {
    sections = doc.body.querySelectorAll(':scope > div');
  }

  const fragment = document.createElement('div');
  fragment.append(...sections);

  return fragment;
}

/**
 * loads and decorates the footer
 * @param {Element} el The footer element
 */
export default async function init(el) {
  const { locale, codeBase } = getConfig();
  await loadStyle(`${codeBase}/blocks/footer/footer.css`);

  const footerMeta = getMetadata('footer');
  let path = FOOTER_PATH;
  if (footerMeta && footerMeta !== 'footer') {
    path = footerMeta.endsWith('.plain.html') ? footerMeta : `${footerMeta}.plain.html`;
  }

  try {
    const fragment = await loadFooterFragment(`${locale.prefix}${path}`);
    fragment.classList.add('footer-content');

    const sections = [...fragment.querySelectorAll(':scope > div')];

    // Add section classes for styling
    sections.forEach((section) => {
      section.classList.add('section');
      const wrapper = document.createElement('div');
      wrapper.classList.add('default-content');
      wrapper.append(...section.children);
      section.append(wrapper);
    });

    if (sections.length >= 1) {
      const copyright = sections.pop();
      copyright.classList.add('section-copyright');
    }

    if (sections.length >= 1) {
      const legal = sections.pop();
      legal.classList.add('section-legal');
    }

    el.append(fragment);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Footer loading error:', e);
  }
}
