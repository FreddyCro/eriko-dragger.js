function calcDistance(sx, sy, ex, ey) {
  return Math.sqrt((Math.pow((sx - ex), 2) + Math.pow((sy - ey), 2)), 2);
}

function calcDirection(sx, sy, ex, ey) {
  // ru
  // rd
  // lu
  // ld
  // r_
  // l_
  // _u
  // _d
  let hort;
  let vert;
  const hortVector = ex - sx;
  const vertVector = ey - sy;

  if (+hortVector > 0) hort = 'r';
  if (+hortVector < 0) hort = 'l';
  if (+hortVector === 0) hort = '_';
  if (+vertVector > 0) vert = 'r';
  if (+vertVector < 0) vert = 'l';
  if (+vertVector === 0) vert = '_';
  return `${hort}${vert}`;
}

function calcTranslate(sx, sy, ex, ey) {
  return `translate(${ex - sx}px,${ey - sy}px)`;
}

export {
  calcDistance,
  calcDirection,
  calcTranslate
}