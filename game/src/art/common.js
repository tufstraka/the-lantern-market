// Small painting helpers shared by the three scenes: seeded randomness, stars,
// the moon, the street and its cobbles, distant skyline silhouettes.

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const f = (v) => (Number.isFinite(v) ? Math.round(v * 100) / 100 : 0);

export function starField(seed, count, width, height) {
  const rand = rng(seed);
  let out = '';
  for (let i = 0; i < count; i += 1) {
    const x = f(rand() * width);
    const y = f(rand() * height);
    const r = f(0.5 + rand() * 1.1);
    const o = f(0.18 + rand() * 0.6);
    out += `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffe9c9" opacity="${o}"/>`;
    if (rand() > 0.86) {
      out += `<circle cx="${x}" cy="${y}" r="${f(r * 4)}" fill="url(#moon-glow)" opacity=".4"/>`;
    }
  }
  return out;
}

export function moon({ x, y, r, craterSet = 0 }) {
  const craters = [
    [[-8, -6, 5], [6, 4, 3.2], [8, -9, 2.1], [-4, 10, 1.6]],
    [[8, -5, 5], [-6, 4, 3.2], [-8, -9, 2.1], [4, 11, 1.6]],
  ][craterSet % 2];
  const marks = craters
    .map(([dx, dy, cr]) => `<circle cx="${f(x + dx)}" cy="${f(y + dy)}" r="${cr}" fill="#cbbf9c" opacity=".38"/>`)
    .join('');
  return `<g>
    <circle cx="${x}" cy="${y}" r="${f(r * 2.9)}" fill="url(#moon-glow)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="#f7eed4"/>
    <circle cx="${f(x - r * 0.28)}" cy="${f(y - r * 0.3)}" r="${f(r * 0.55)}" fill="#fffaf0" opacity=".55"/>
    ${marks}
    <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#fff6df" stroke-width=".8" opacity=".5"/>
  </g>`;
}

export function lightPool(x, y, rx, ry, opacity = 1) {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#pool-warm)" opacity="${opacity}"/>`;
}

export function streetBand({ y, gradient = 'street', glow = true }) {
  return `<g>
    <rect x="-10" y="${y}" width="640" height="${480 - y}" fill="url(#${gradient})"/>
    <ellipse cx="310" cy="${y + 6}" rx="360" ry="70" fill="url(#city-glow)" opacity=".55"/>
    ${glow ? lightPool(150, y + 92, 240, 120, 0.75) + lightPool(470, y + 120, 230, 110, 0.6) : ''}
  </g>`;
}

export function cobbles(seed, y0, y1, width = 620) {
  const rand = rng(seed);
  let out = '';
  let y = y0;
  let row = 0;
  while (y < y1) {
    const step = 12 + row * 1.4;
    const gap = 26 + row * 2.6;
    const offset = row % 2 ? gap / 2 : 0;
    for (let x = -gap; x < width + gap; x += gap) {
      const cx = f(x + offset + rand() * 3);
      const rx = f(gap * (0.42 + rand() * 0.12));
      const ry = f(step * (0.34 + rand() * 0.12));
      out += `<path d="M${f(cx - rx)} ${f(y)} Q${cx} ${f(y - ry * 1.6)} ${f(cx + rx)} ${f(y)}" fill="none" stroke="#ffd9a6" stroke-opacity="${f(0.03 + rand() * 0.05)}" stroke-width="1.1"/>`;
    }
    y += step;
    row += 1;
  }
  return out;
}

export function farSkyline({ seed, baseY, colour = '#191328', lit = '#ffb469' }) {
  const rand = rng(seed);
  let out = `<path d="M-10 ${baseY + 24} L-10 ${baseY} `;
  for (let x = 0; x <= 640; x += 34) {
    const h = 12 + rand() * 34;
    out += `L${x} ${f(baseY - h)} L${x + 20} ${f(baseY - h)} `;
  }
  out += `L640 ${baseY} L650 ${baseY + 24} Z" fill="${colour}"/>`;
  for (let i = 0; i < 16; i += 1) {
    const x = f(10 + rand() * 600);
    const y = f(baseY - 6 - rand() * 26);
    out += `<rect x="${x}" y="${y}" width="2.6" height="3.4" fill="${lit}" opacity="${f(0.12 + rand() * 0.28)}"/>`;
  }
  return out;
}

export function pagodaSilhouette({ x, y, scale = 1, colour = '#150f22' }) {
  const s = scale;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${colour}">
    <rect x="-24" y="-96" width="48" height="96" rx="2"/>
    <path d="M-46 -96 Q0 -116 46 -96 L38 -88 Q0 -104 -38 -88 Z"/>
    <path d="M-40 -118 Q0 -138 40 -118 L33 -110 Q0 -126 -33 -110 Z"/>
    <path d="M-32 -140 Q0 -158 32 -140 L26 -133 Q0 -147 -26 -133 Z"/>
    <rect x="-2" y="-172" width="4" height="20"/>
    <circle cx="0" cy="-176" r="3.4"/>
    <rect x="-14" y="-82" width="10" height="12" fill="#ffb469" opacity=".4"/>
    <rect x="6" y="-82" width="10" height="12" fill="#ffb469" opacity=".28"/>
    <rect x="-14" y="-60" width="10" height="12" fill="#ffb469" opacity=".22"/>
  </g>`;
}

export function hangingCable(x1, y1, x2, y2, sag) {
  return `M${x1} ${y1} Q${f((x1 + x2) / 2)} ${f((y1 + y2) / 2 + sag)} ${x2} ${y2}`;
}

export function pointOnCable(x1, y1, x2, y2, sag, t) {
  const mt = 1 - t;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 + sag;
  return {
    x: f(mt * mt * x1 + 2 * mt * t * cx + t * t * x2),
    y: f(mt * mt * y1 + 2 * mt * t * cy + t * t * y2),
  };
}

export function rimLight(path, colour = '#ffb469', width = 1.4, opacity = 0.5) {
  return `<path d="${path}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-opacity="${opacity}" stroke-linecap="round"/>`;
}
