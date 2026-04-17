export default async function decorate(block) {
  const rows = [...block.children];
  const nav = document.createElement('nav');
  nav.className = 'event-bar-nav';

  rows.forEach((row) => {
    const cells = [...row.children];
    const item = document.createElement('div');
    item.className = 'event-bar-item';

    // Cell 0 = icon, Cell 1 = link text
    const iconCell = cells[0];
    const textCell = cells[1];

    // Get the icon span
    const iconSpan = iconCell?.querySelector('.icon');
    if (iconSpan) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'event-bar-icon';
      iconWrap.append(iconSpan);
      item.append(iconWrap);
    }

    // Get the link
    const link = textCell?.querySelector('a');
    if (link) {
      const labelWrap = document.createElement('div');
      labelWrap.className = 'event-bar-label';
      labelWrap.append(link);
      item.append(labelWrap);
    }

    nav.append(item);
  });

  block.textContent = '';
  block.append(nav);
}
