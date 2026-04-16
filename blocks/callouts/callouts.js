export default function init(el) {
  const rows = [...el.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      // Identify image cells (cells that contain a picture/img but no headings)
      const pic = cell.querySelector('picture');
      const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
      if (pic && !heading) {
        cell.classList.add('callout-image');
      }
    });
  });
}
