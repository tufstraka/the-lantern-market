// The market's painted props: lanterns, stalls, cats, bicycles, teapots, fish,
// signs and the little things a night market is made of. Every prop is an SVG
// fragment in scene coordinates (620 x 470), so scenes read as one illustration.

import { f, rng } from './common.js';

/* ------------------------------------------------------------------ glyphs */

const GLYPHS = {
  lamp: ['M0.5 0.12 V0.2', 'M0.3 0.2 H0.7', 'M0.34 0.28 H0.66 V0.62 H0.34 Z', 'M0.42 0.2 V0.28', 'M0.58 0.2 V0.28', 'M0.38 0.62 V0.72 M0.62 0.62 V0.72', 'M0.3 0.78 H0.7'],
  tea: ['M0.2 0.34 L0.5 0.14 L0.8 0.34', 'M0.5 0.2 V0.76', 'M0.3 0.42 H0.7', 'M0.26 0.7 H0.74'],
  fish: ['M0.2 0.5 Q0.45 0.3 0.7 0.5 Q0.45 0.7 0.2 0.5 Z', 'M0.7 0.5 L0.84 0.38 L0.84 0.62 Z', 'M0.36 0.45 V0.55'],
  gate: ['M0.28 0.2 V0.78', 'M0.72 0.2 V0.78', 'M0.28 0.3 H0.72', 'M0.24 0.5 H0.76', 'M0.4 0.5 V0.78 M0.6 0.5 V0.78'],
  moon: ['M0.62 0.24 A0.26 0.26 0 1 0 0.62 0.72 A0.2 0.2 0 1 1 0.62 0.24 Z', 'M0.34 0.38 h0.02'],
  price: ['M0.26 0.2 H0.74 V0.72 H0.26 Z', 'M0.36 0.34 H0.64', 'M0.36 0.46 H0.58', 'M0.36 0.58 H0.62'],
  arrowLeft: ['M0.78 0.5 H0.24', 'M0.24 0.5 L0.38 0.36', 'M0.24 0.5 L0.38 0.64'],
  arrowRight: ['M0.22 0.5 H0.76', 'M0.76 0.5 L0.62 0.36', 'M0.76 0.5 L0.62 0.64'],
  mount: ['M0.18 0.7 L0.38 0.36 L0.5 0.54 L0.6 0.42 L0.82 0.7 Z', 'M0.2 0.78 H0.8'],
  cup: ['M0.28 0.34 H0.68 V0.6 Q0.48 0.72 0.28 0.6 Z', 'M0.68 0.4 Q0.82 0.42 0.8 0.54 Q0.78 0.62 0.66 0.6', 'M0.3 0.76 H0.68'],
};

export function glyph(kind, cx, cy, size, colour = '#2a1a1a', width = 1.6, opacity = 1) {
  const paths = GLYPHS[kind] ?? GLYPHS.lamp;
  const s = size;
  const body = paths
    .map((d) => `<path d="${d}"/>`)
    .join('');
  return `<g transform="translate(${f(cx - s / 2)} ${f(cy - s / 2)}) scale(${s})" fill="none" stroke="${colour}" stroke-width="${f(width / s)}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}">${body}</g>`;
}

/* ---------------------------------------------------------------- lanterns */

export function paperLantern({ x, y, w = 24, h = 30, colour = '#e2603f', tassel = 7, glow = true, paints = null }) {
  const rx = w / 2;
  const ry = h / 2;
  const top = y - ry;
  const bottom = y + ry;
  const paint = paints ?? colour;
  return `<g>
    ${glow ? `<circle cx="${x}" cy="${y}" r="${f(rx * 3.1)}" fill="url(#lantern-glow)"/>` : ''}
    <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${paint}"/>
    <ellipse cx="${f(x - rx * 0.22)}" cy="${f(y - ry * 0.25)}" rx="${f(rx * 0.42)}" ry="${f(ry * 0.46)}" fill="#ffe9c9" opacity=".28"/>
    <path d="M${f(x - rx)} ${y} H${f(x + rx)}" stroke="#00000030" stroke-width=".9"/>
    <path d="M${f(x - rx * 0.72)} ${f(top + h * 0.12)} Q${x} ${f(y + h * 0.2)} ${f(x + rx * 0.72)} ${f(top + h * 0.12)}" fill="none" stroke="#00000026" stroke-width="1"/>
    <path d="M${f(x - rx * 0.86)} ${f(top + h * 0.24)} Q${x} ${f(y + h * 0.3)} ${f(x + rx * 0.86)} ${f(top + h * 0.24)}" fill="none" stroke="#00000022" stroke-width="1"/>
    <rect x="${f(x - rx * 0.5)}" y="${f(top - 3)}" width="${f(w * 0.5)}" height="3.2" rx="1" fill="#3b2626"/>
    <rect x="${f(x - rx * 0.5)}" y="${f(bottom - 0.4)}" width="${f(w * 0.5)}" height="3" rx="1" fill="#3b2626"/>
    <path d="M${x} ${f(bottom + 2)} V${f(bottom + 2 + tassel)}" stroke="#ffcf8a" stroke-width="1.2" opacity=".8"/>
    <path d="M${f(x - 2)} ${f(bottom + tassel + 1)} h4 M${f(x - 1.5)} ${f(bottom + tassel + 3)} h3 M${x} ${f(bottom + tassel + 5)} v1" stroke="#ffcf8a" stroke-width="1" opacity=".65"/>
  </g>`;
}

export function bulbString({ points, count = 16, skip = -1, skipBulb = -1, hue = '#ffd9a0' }) {
  const [x1, y1, x2, y2, sag] = points;
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2 + sag;
  let out = `<path d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}" fill="none" stroke="#120d18" stroke-width="1.5"/>`;
  for (let i = 1; i < count; i += 1) {
    if (i === skipBulb) continue;
    const t = i / count;
    const mt = 1 - t;
    const px = mt * mt * x1 + 2 * mt * t * cx + t * t * x2;
    const py = mt * mt * y1 + 2 * mt * t * cy + t * t * y2;
    out += `<g><circle cx="${f(px)}" cy="${f(py + 5)}" r="6" fill="url(#lantern-glow)"/><circle cx="${f(px)}" cy="${f(py + 5)}" r="2.4" fill="${hue}" opacity=".92"/></g>`;
  }
  if (skip !== -1) return out;
  return out;
}

/* -------------------------------------------------------------- structures */

export function awning({ x, y, w, h, pattern = 'stripe-warm', valance = '#a8432f', poles = true, poleColour = '#2a1c25' }) {
  const edge = y + h;
  const scallops = Math.max(3, Math.round(w / 30));
  let val = '';
  for (let i = 0; i < scallops; i += 1) {
    const sx = x + (w / scallops) * i;
    const sw = w / scallops;
    val += `<path d="M${f(sx)} ${f(edge)} q${f(sw / 2)} 13 ${f(sw)} 0 Z" fill="${valance}" opacity=".92"/>`;
  }
  return `<g>
    <path d="M${x} ${f(y + 9)} L${f(x + w)} ${f(y + 9)} L${f(x + w - 4)} ${f(edge)} L${f(x + 4)} ${f(edge)} Z" fill="url(#${pattern})"/>
    <path d="M${x} ${f(y + 9)} L${f(x + w)} ${f(y + 9)} L${f(x + w - 4)} ${f(edge)} L${f(x + 4)} ${f(edge)} Z" fill="#1a0f1a" opacity=".22"/>
    <path d="M${x} ${f(y + 9)} L${f(x + w)} ${f(y + 9)}" stroke="#ffe0ad" stroke-opacity=".3" stroke-width="1.4"/>
    ${val}
    ${poles ? `<rect x="${f(x + 3)}" y="${edge}" width="3.4" height="${f(430 - edge)}" fill="${poleColour}"/><rect x="${f(x + w - 7)}" y="${edge}" width="3.4" height="${f(430 - edge)}" fill="${poleColour}"/>` : ''}
  </g>`;
}

export function counter({ x, y, w, h = 60, top = '#6b4531', face = 'url(#wood)', grain = true }) {
  let planks = '';
  if (grain) {
    for (let i = 1; i < 6; i += 1) {
      planks += `<path d="M${f(x + (w / 6) * i)} ${f(y + 6)} V${f(y + h)}" stroke="#00000033" stroke-width="1"/>`;
    }
  }
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${face}"/>
    <rect x="${f(x - 4)}" y="${f(y - 4)}" width="${f(w + 8)}" height="7" rx="2" fill="${top}"/>
    <path d="M${f(x - 4)} ${f(y - 1)} H${f(x + w + 4)}" stroke="#ffcf8a" stroke-opacity=".45" stroke-width="1.2"/>
    ${planks}
    <path d="M${x} ${f(y + h)} H${f(x + w)}" stroke="#00000066" stroke-width="2"/>
  </g>`;
}

export function crates({ x, y, w = 46, h = 34, stampSet = 0 }) {
  const rand = rng(11 + stampSet);
  const boards = [0, 1, 2].map((i) => `<path d="M${x} ${f(y + 11 + i * 10)} H${f(x + w)}" stroke="#00000038" stroke-width="1.2"/>`).join('');
  const stamp = stampSet === 0
    ? glyph('fish', x + w / 2, y + h / 2, 12, '#e8c79a', 1.1, 0.55)
    : glyph('mount', x + w / 2, y + h / 2, 12, '#e8c79a', 1.1, 0.55);
  const splinter = `<path d="M${f(x + w * 0.2)} ${y} v${h}" stroke="#00000026" stroke-width="1"/>`;
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="url(#wood-warm)"/>
    ${boards}${splinter}${stamp}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="url(#crate-stencil)" opacity=".6"/>
    <path d="M${x} ${f(y + 2)} H${f(x + w)}" stroke="#ffcf8a" stroke-opacity=".3" stroke-width="1"/>
  </g>`;
}

export function signBoard({ x, y, w = 54, h = 40, glyphKind = 'lamp', arrow = 0, rope = 16, boardColour = '#2c1e2a' }) {
  const top = y - rope;
  const arrowMark = arrow === 0 ? '' : glyph(arrow > 0 ? 'arrowRight' : 'arrowLeft', x + w / 2, y + h - 7, Math.min(14, w * 0.28), '#e8c79a', 1.2, 0.75);
  return `<g>
    <path d="M${f(x + 10)} ${top} V${y} M${f(x + w - 10)} ${top} V${y}" stroke="#c9a37e" stroke-width="1.1" opacity=".55"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${boardColour}" stroke="#8f6a4d" stroke-width="1.4"/>
    <rect x="${f(x + 3)}" y="${f(y + 3)}" width="${f(w - 6)}" height="${f(h - 6)}" rx="2" fill="none" stroke="#e8c79a" stroke-opacity=".18"/>
    ${glyph(glyphKind, x + w / 2, y + h / 2, Math.min(w, h) * 0.62, '#e8c79a', 1.5, 0.9)}
    ${arrowMark}
  </g>`;
}

export function windowBox({ x, y, w = 22, h = 26, lit = true, lattice = 'lattice' }) {
  return `<g>
    ${lit ? `<rect x="${f(x - 8)}" y="${f(y - 8)}" width="${f(w + 16)}" height="${f(h + 16)}" fill="url(#lantern-glow)" opacity=".55"/>` : ''}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${lit ? '#ffbf7a' : '#1b1526'}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="url(#${lattice})" opacity="${lit ? 0.85 : 0.35}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="none" stroke="#241820" stroke-width="1.6"/>
    <path d="M${f(x - 2)} ${f(y - 3)} H${f(x + w + 2)}" stroke="#3a2a2a" stroke-width="2"/>
  </g>`;
}

/* ----------------------------------------------------------------- figures */

export function standingFigure({ x, y, s = 1, hat = true, lantern = true, flip = false, rim = '#ffb469' }) {
  const t = `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`;
  return `<g transform="${t}">
    <ellipse cx="2" cy="2" rx="21" ry="5" fill="#05060e" opacity=".5"/>
    <!-- robe -->
    <path d="M-11 -6 Q-15 -38 -8 -54 L8 -54 Q16 -38 12 -6 Q1 2 -11 -6 Z" fill="#191227"/>
    <path d="M-11 -6 Q-18 -2 -17 5 L-10 4 Q-9 0 -8 -5 Z" fill="#191227"/>
    <path d="M12 -6 Q19 -2 18 5 L11 4 Q10 0 9 -5 Z" fill="#191227"/>
    <path d="M-6 -6 Q0 -2 6 -6" fill="none" stroke="#00000055" stroke-width="1.4"/>
    <!-- sash -->
    <path d="M-9 -30 Q0 -26 10 -30 L11 -24 Q0 -21 -10 -24 Z" fill="#a8432f" opacity=".75"/>
    <!-- head and hat -->
    <circle cx="0" cy="-60" r="8.2" fill="#241a30"/>
    <path d="M-5 -57 Q0 -53 5 -57" fill="none" stroke="#0e0a16" stroke-width="1" opacity=".6"/>
    ${hat ? `<path d="M-20 -64 Q0 -78 20 -64 Q0 -58 -20 -64 Z" fill="#2c2138"/>
    <path d="M-20 -64 Q0 -78 20 -64" fill="none" stroke="#ffcf8a" stroke-opacity=".4" stroke-width="1.1"/>
    <path d="M-7 -65 Q0 -70 7 -65" fill="none" stroke="#ffcf8a" stroke-opacity=".2" stroke-width="1"/>` : ''}
    <!-- arm holding the lantern out -->
    <path d="M7 -50 Q17 -46 18 -38 L13 -36 Q12 -44 5 -46 Z" fill="#191227"/>
    ${rim ? `<path d="M-9 -52 Q-14 -32 -12 -8" fill="none" stroke="${rim}" stroke-width="1.4" stroke-opacity=".55" stroke-linecap="round"/>
    <path d="M-18 -62 Q0 -74 18 -62" fill="none" stroke="${rim}" stroke-width="1" stroke-opacity=".3"/>` : ''}
    ${lantern ? `<g transform="translate(17 -38)">
      <path d="M0 0 V4" stroke="#ffcf8a" stroke-width="1"/>
      <circle cx="0" cy="10" r="15" fill="url(#lantern-glow)" opacity=".85"/>
      ${paperLantern({ x: 0, y: 12, w: 11, h: 14, colour: '#e2603f', tassel: 4, glow: false })}
    </g>` : ''}
  </g>`;
}

export function seatedFigure({ x, y, s = 1, cup = true }) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="3" rx="22" ry="5" fill="#05060e" opacity=".4"/>
    <path d="M-14 0 Q-16 -30 -6 -40 L8 -40 Q16 -30 14 0 Z" fill="#1b1527"/>
    <path d="M-14 0 Q-24 0 -26 5 L-18 8 Q-10 4 -6 2 Z" fill="#1b1527"/>
    <circle cx="1" cy="-48" r="9" fill="#20182e"/>
    <path d="M-8 -54 Q1 -60 10 -54 Q1 -50 -8 -54 Z" fill="#2a1f30"/>
    ${cup ? `<g transform="translate(9 -12)">${glyph('cup', 0, 0, 10, '#ffcf8a', 1, 0.8)}</g>` : ''}
    <path d="M-6 -38 Q-12 -20 -10 -2" fill="none" stroke="#ffb469" stroke-width="1.2" stroke-opacity=".35" stroke-linecap="round"/>
  </g>`;
}

export function cat({ x, y, s = 1, tail = 0 }) {
  const tailPath = tail === 0
    ? 'M10 -5 Q26 -9 24 -28 Q23 -37 15 -39'
    : 'M10 -5 Q28 1 30 14 Q31 22 23 24';
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="1" rx="15" ry="4" fill="#05060e" opacity=".45"/>
    <path d="${tailPath}" fill="none" stroke="#100b19" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M-11 0 Q-14 -15 -6 -21 L6 -23 Q13 -16 12 0 Q2 3 -11 0 Z" fill="#100b19"/>
    <circle cx="3" cy="-28" r="8" fill="#100b19"/>
    <path d="M-3 -34 L-5 -43 L1 -37 Z" fill="#100b19"/>
    <path d="M9 -34 L12 -43 L6 -37 Z" fill="#100b19"/>
    <ellipse cx="1" cy="-2" rx="6" ry="2.6" fill="#100b19"/>
    <path d="M-8 -19 Q0 -25 8 -20" fill="none" stroke="#ffb469" stroke-width="1.2" stroke-opacity=".42"/>
    <circle cx="-0.4" cy="-29" r="1.1" fill="#ffcf8a"/>
    <circle cx="6.2" cy="-29" r="1.1" fill="#ffcf8a"/>
    <path d="M-6 -27 h-4 M-6 -24.5 h-4 M8 -27 h4 M8 -24.5 h4" stroke="#ffcf8a" stroke-opacity=".3" stroke-width=".6"/>
  </g>`;
}

/* ---------------------------------------------------------------- vehicles */

export function bicycle({ x, y, s = 1, spokes = 10, wheelDark = false }) {
  const spokeLine = (cx, cy, r, count) => {
    let out = '';
    for (let i = 0; i < count; i += 1) {
      const a = (Math.PI * 2 * i) / count + 0.2;
      out += `<path d="M${cx} ${cy} L${f(cx + Math.cos(a) * r)} ${f(cy + Math.sin(a) * r)}" stroke="#c9b8a3" stroke-opacity=".55" stroke-width=".9"/>`;
    }
    return out;
  };
  const rim = wheelDark ? '#8b7a6d' : '#c9b8a3';
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(-3)">
    <ellipse cx="0" cy="1" rx="42" ry="6" fill="#05060e" opacity=".4"/>
    <g>
      <circle cx="-27" cy="-18" r="18" fill="none" stroke="${rim}" stroke-width="2.2"/>
      ${spokeLine(-27, -18, 17, spokes)}
      <circle cx="-27" cy="-18" r="2.4" fill="#e8c79a"/>
    </g>
    <g>
      <circle cx="27" cy="-18" r="18" fill="none" stroke="${rim}" stroke-width="2.2"/>
      ${spokeLine(27, -18, 17, 10)}
      <circle cx="27" cy="-18" r="2.4" fill="#e8c79a"/>
    </g>
    <path d="M-27 -18 L-6 -40 L18 -40 L27 -18 M-6 -40 L-14 -18 M-14 -18 L27 -18" fill="none" stroke="#4a3830" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M18 -40 L20 -46 L30 -46" fill="none" stroke="#4a3830" stroke-width="2" stroke-linecap="round"/>
    <path d="M-14 -18 L-16 -26" stroke="#4a3830" stroke-width="2"/>
    <path d="M-22 -26 H-9" stroke="#241a20" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M6 -40 L10 -46 H28 L24 -40 Z" fill="#5d4335" stroke="#8f6a4d" stroke-width="1"/>
    <path d="M10 -44 H26" stroke="#00000044" stroke-width="1"/>
    <path d="M-27 -18 L-6 -40" stroke="#ffcf8a" stroke-opacity=".22" stroke-width="1.2"/>
  </g>`;
}

/* ---------------------------------------------------------------- ceramics */

export function teapot({ x, y, s = 1, handle = 0, colour = '#4f6f74' }) {
  const handlePath = handle === 0
    ? 'M10 -14 Q26 -14 26 -4 Q26 5 11 5'
    : 'M10 -14 Q22 -18 20 0 Q19 8 11 3';
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="1" rx="15" ry="3.4" fill="#05060e" opacity=".45"/>
    <path d="${handlePath}" fill="none" stroke="${colour}" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M-12 -2 Q-16 -18 0 -19 Q16 -18 12 -2 Q6 4 -12 -2 Z" fill="${colour}"/>
    <path d="M-12 -3 Q-6 -14 2 -15" fill="none" stroke="#ffe0ad" stroke-opacity=".35" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M-9 -18 Q-6 -24 2 -24 Q9 -23 8 -17" fill="${colour}"/>
    <circle cx="1" cy="-24" r="2.2" fill="#8fb6bd"/>
    <path d="M-12 -12 L-24 -22 L-21 -25 L-9 -16 Z" fill="${colour}"/>
    <path d="M-12 -12 L-24 -22" stroke="#ffe0ad" stroke-opacity=".3" stroke-width="1"/>
    <path d="M-12 -2 H12" stroke="#00000038" stroke-width="1"/>
  </g>`;
}

export function kettle({ x, y, s = 1 }) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-13 -6 Q-17 -24 0 -26 Q17 -24 13 -6 Q4 0 -13 -6 Z" fill="#8a4a3a"/>
    <path d="M-6 -26 Q-4 -31 2 -31 Q8 -31 8 -25" fill="none" stroke="#8a4a3a" stroke-width="3"/>
    <path d="M-12 -16 L-23 -26 L-20 -29 L-9 -19 Z" fill="#8a4a3a"/>
    <path d="M-13 -8 H13" stroke="#00000033" stroke-width="1.2"/>
    <path d="M-9 -20 Q-4 -27 3 -26" fill="none" stroke="#ffcf8a" stroke-opacity=".35" stroke-width="1.4"/>
    <path d="M-20 0 H20" stroke="#2a1a20" stroke-width="3" stroke-linecap="round"/>
    <path d="M-14 0 V6 M14 0 V6" stroke="#2a1a20" stroke-width="2.4"/>
  </g>`;
}

export function steam({ x, y, s = 1, colour = '#ffe0ad' }) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${colour}" stroke-linecap="round">
    <path d="M0 0 Q-7 -10 0 -20 Q7 -30 0 -40" stroke-width="2" stroke-opacity=".35"/>
    <path d="M8 -2 Q2 -12 8 -22 Q14 -32 8 -42" stroke-width="1.6" stroke-opacity=".24"/>
    <path d="M-7 -4 Q-13 -14 -7 -24" stroke-width="1.4" stroke-opacity=".18"/>
  </g>`;
}

export function fish({ x, y, s = 1, angle = 0, colour = '#9fb6c4', belly = '#d7e2e4' }) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${angle})">
    <path d="M-20 1 Q-9 -9 8 -5 Q16 -3 19 1 L29 8 L17 8 Q2 14 -12 7 Q-20 5 -20 1 Z" fill="${colour}"/>
    <path d="M-19 3 Q-6 10 9 7 Q2 12 -8 9 Z" fill="${belly}" opacity=".85"/>
    <path d="M-2 -5 L3 -11 L8 -6 Z" fill="${colour}"/>
    <path d="M19 1 L29 8 L17 8 Z" fill="${colour}" opacity=".9"/>
    <path d="M-20 1 L-27 -4 L-25 6 Z" fill="${colour}" opacity=".85"/>
    <path d="M5 -4 Q8 1 5 5" fill="none" stroke="#4d6b7e" stroke-width="1.1" opacity=".7"/>
    <circle cx="13" cy="-1.5" r="1.6" fill="#182430"/>
    <circle cx="13.4" cy="-2" r=".5" fill="#eef8f8" opacity=".8"/>
    <path d="M-16 2 Q-5 8 8 6" fill="none" stroke="#5d7f92" stroke-width="1" opacity=".45"/>
  </g>`;
}

export function stool({ x, y, s = 1, legs = 3, colour = '#4a3229' }) {
  const legMarkup = legs >= 3
    ? `<path d="M-11 0 L-15 16" /><path d="M11 0 L15 16" /><path d="M0 0 L1 18" />`
    : `<path d="M-11 0 L-15 16" /><path d="M11 0 L15 16" />`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="18" rx="17" ry="4" fill="#05060e" opacity=".4"/>
    <path d="M-14 -4 Q0 -10 14 -4 Q14 2 0 4 Q-14 2 -14 -4 Z" fill="${colour}"/>
    <path d="M-14 -4 Q0 -10 14 -4" fill="none" stroke="#ffcf8a" stroke-opacity=".35" stroke-width="1.2"/>
    <g stroke="${colour}" stroke-width="3" stroke-linecap="round">${legMarkup}</g>
    <path d="M-12 8 H12" stroke="${colour}" stroke-width="2" opacity=".8"/>
  </g>`;
}

/* ------------------------------------------------------------------ plants */

export function potPlant({ x, y, s = 1, flowers = 3 }) {
  let blooms = '';
  const spots = [[-8, -30], [6, -36], [0, -24], [12, -26]];
  for (let i = 0; i < flowers; i += 1) {
    const [bx, by] = spots[i % spots.length];
    blooms += `<g transform="translate(${bx} ${by})">
      <circle cx="0" cy="0" r="5" fill="#d96a7a" opacity=".9"/>
      <circle cx="0" cy="0" r="2" fill="#ffd9a0"/>
    </g>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="1" rx="12" ry="3" fill="#05060e" opacity=".4"/>
    <path d="M-4 0 Q-10 -20 -2 -34 M2 0 Q6 -18 0 -30 M0 0 Q-2 -12 10 -22" fill="none" stroke="#3f6b52" stroke-width="2"/>
    <path d="M-10 -4 H10 L7 8 H-7 Z" fill="#7a4535"/>
    <path d="M-10 -4 H10" stroke="#c98b62" stroke-width="2"/>
    ${blooms}
    <path d="M-6 -14 Q0 -18 5 -14" fill="none" stroke="#4f8563" stroke-width="1.6"/>
  </g>`;
}

export function umbrella({ x, y, r = 30, panel = '#c0533f', alt = '#efd7ad' }) {
  const apex = -r * 0.95;
  return `<g transform="translate(${x} ${y})">
    <circle cx="0" cy="${f(apex * 0.5)}" r="${f(r * 1.25)}" fill="url(#lantern-glow)" opacity=".3"/>
    <path d="M${-r} 0 A${r} ${f(r * 0.95)} 0 0 1 ${r} 0 Z" fill="${alt}"/>
    <path d="M0 ${f(apex)} L${f(-r * 0.46)} 0 Q0 ${f(r * 0.12)} ${f(r * 0.46)} 0 Z" fill="${panel}"/>
    <path d="M0 ${f(apex)} L${f(r * 0.46)} 0 Q${f(r * 0.72)} ${f(-r * 0.2)} ${f(r * 0.9)} ${f(-r * 0.4)} Z" fill="${panel}" opacity=".45"/>
    <path d="M0 ${f(apex)} L${f(-r * 0.72)} ${f(-r * 0.5)}" stroke="#00000030" stroke-width="1"/>
    <path d="M0 ${f(apex)} L${f(r * 0.72)} ${f(-r * 0.5)}" stroke="#00000030" stroke-width="1"/>
    <path d="M0 ${f(apex)} L${f(-r * 0.9)} ${f(-r * 0.12)}" stroke="#00000030" stroke-width="1"/>
    <path d="M0 ${f(apex)} L${f(r * 0.9)} ${f(-r * 0.12)}" stroke="#00000030" stroke-width="1"/>
    <path d="M${-r} 0 q${f(r * 0.25)} ${f(r * 0.2)} ${f(r * 0.5)} 0 q${f(r * 0.25)} ${f(r * 0.2)} ${f(r * 0.5)} 0 q${f(r * 0.25)} ${f(r * 0.2)} ${f(r * 0.5)} 0 q${f(r * 0.25)} ${f(r * 0.2)} ${f(r * 0.5)} 0" fill="none" stroke="#00000040" stroke-width="1.2"/>
    <path d="M${-r} 0 A${r} ${f(r * 0.95)} 0 0 1 ${r} 0" fill="none" stroke="#ffe0ad" stroke-opacity=".35" stroke-width="1.2"/>
    <circle cx="0" cy="${f(apex)}" r="2.2" fill="#3b2626"/>
    <path d="M0 ${f(apex + 3)} V${f(r * 0.6)}" stroke="#3b2626" stroke-width="1.6"/>
    <path d="M0 ${f(r * 0.6)} q0 4 -4 4" fill="none" stroke="#3b2626" stroke-width="1.6" stroke-linecap="round"/>
  </g>`;
}

/* --------------------------------------------------------------- small bits */

export function balanceScale({ x, y, s = 1, pan = true, panFill = 0 }) {
  const leftPan = `<g>
    <path d="M-20 -40 L-20 -30" stroke="#c9a37e" stroke-width="1"/>
    <path d="M-28 -30 Q-11 -19 6 -30" fill="none" stroke="#c9a37e" stroke-width="1.6"/>
    <path d="M-28 -30 Q-20 -38 -12 -30 M-12 -30 Q-4 -38 4 -30" fill="none" stroke="#c9a37e" stroke-width="1.1"/>
    ${panFill > 0 ? `<circle cx="-11" cy="-33" r="4" fill="#7fa7ae"/>` : ''}
  </g>`;
  const rightPan = `<g>
    <path d="M20 -40 L20 -30" stroke="#c9a37e" stroke-width="1"/>
    <path d="M12 -30 Q29 -19 46 -30" fill="none" stroke="#c9a37e" stroke-width="1.6"/>
    <path d="M12 -30 Q20 -38 28 -30 M28 -30 Q36 -38 44 -30" fill="none" stroke="#c9a37e" stroke-width="1.1"/>
  </g>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M0 0 V-48" stroke="#8f6a4d" stroke-width="2.6"/>
    <path d="M-30 -40 H46" stroke="#c9a37e" stroke-width="2"/>
    <circle cx="0" cy="-48" r="2.6" fill="#e8c79a"/>
    ${leftPan}
    ${pan ? rightPan : ''}
    <path d="M-10 0 H10" stroke="#5d4335" stroke-width="2.4" stroke-linecap="round"/>
  </g>`;
}

export function puddle({ x, y, rx, ry, reflection = 0 }) {
  const refl = reflection === 0
    ? `<g>
        <ellipse cx="${x}" cy="${f(y + ry * 0.18)}" rx="${f(rx * 0.22)}" ry="${f(ry * 0.4)}" fill="#ffb469" opacity=".22"/>
        <path d="M${x} ${f(y - ry * 0.5)} V${f(y + ry * 0.7)}" stroke="#ffcf8a" stroke-width="1.6" opacity=".35"/>
        <path d="M${f(x - rx * 0.4)} ${f(y + ry * 0.1)} H${f(x + rx * 0.4)}" stroke="#ffcf8a" stroke-width="1" opacity=".2"/>
      </g>`
    : `<path d="M${f(x - rx * 0.5)} ${f(y + ry * 0.2)} H${f(x + rx * 0.5)}" stroke="#ffcf8a" stroke-width="1" opacity=".14"/>`;
  return `<g>
    <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#puddle)"/>
    <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="#9fb6c4" stroke-opacity=".22" stroke-width="1"/>
    ${refl}
    <path d="M${f(x - rx * 0.6)} ${f(y - ry * 0.1)} Q${x} ${f(y - ry * 0.7)} ${f(x + rx * 0.55)} ${f(y - ry * 0.2)}" fill="none" stroke="#cfe3e6" stroke-opacity=".13" stroke-width="1.2"/>
  </g>`;
}

export function fruitBasket({ x, y, s = 1 }) {
  let fruit = '';
  const rand = rng(5);
  for (let i = 0; i < 9; i += 1) {
    const fx = (rand() - 0.5) * 22;
    const fy = -6 - rand() * 6;
    fruit += `<circle cx="${f(fx)}" cy="${f(fy)}" r="4.2" fill="${i % 3 === 0 ? '#e0a14b' : '#d97a45'}"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${fruit}
    <path d="M-14 -4 Q0 -12 14 -4 Q11 10 0 10 Q-11 10 -14 -4 Z" fill="#7a5232"/>
    <path d="M-14 -4 Q0 2 14 -4" fill="none" stroke="#c99a63" stroke-width="1.6"/>
  </g>`;
}

export function hangingCloth({ x, y, w = 20, h = 44, pattern = 'stripe-warm', poleTo = 0 }) {
  return `<g>
    <path d="M${x} ${poleTo} V${y}" stroke="#2a1c25" stroke-width="1.4"/>
    <path d="M${x - w / 2} ${y} H${x + w / 2} V${f(y + h)} L${x} ${f(y + h + 6)} L${x - w / 2} ${f(y + h)} Z" fill="url(#${pattern})"/>
    <path d="M${x - w / 2} ${y} H${x + w / 2} V${f(y + h)} L${x} ${f(y + h + 6)} L${x - w / 2} ${f(y + h)} Z" fill="#120d18" opacity=".18"/>
    <path d="M${x} ${f(y + 4)} V${f(y + h + 2)}" stroke="#00000033" stroke-width="1"/>
  </g>`;
}

export function chalkboard({ x, y, w = 52, h = 38, glyphKind = 'price' }) {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#2b2622" stroke="#6b4a33" stroke-width="3"/>
    <rect x="${f(x + 4)}" y="${f(y + 4)}" width="${f(w - 8)}" height="${f(h - 8)}" fill="#1d2420"/>
    ${glyph(glyphKind, x + w / 2, y + h / 2 - 2, Math.min(w, h) * 0.52, '#e8d6b0', 1.4, 0.8)}
    <path d="M${f(x + w * 0.2)} ${f(y + h - 6)} H${f(x + w * 0.8)}" stroke="#e8d6b0" stroke-width=".8" opacity=".35"/>
  </g>`;
}

export function roofTiles({ x, y, w, h, pattern = 'tiles', curve = 10, colour = '#2a1f30', fascia = '#6b4531' }) {
  const eaveY = y + h;
  const n = Math.max(5, Math.round(w / 26));
  let ribs = '';
  let rows = '';
  for (let i = 0; i <= n; i += 1) {
    const t = i / n;
    const ridgeX = x + w * t;
    const eaveX = x - 14 + (w + 28) * t;
    ribs += `<path d="M${f(ridgeX)} ${f(y - Math.sin(Math.PI * t) * curve)} Q${f((ridgeX + eaveX) / 2)} ${f(y + h * 0.55)} ${f(eaveX)} ${f(eaveY + Math.sin(Math.PI * t) * 4)}" fill="none" stroke="#ffcf8a" stroke-opacity=".12" stroke-width="1.1"/>`;
  }
  for (let j = 1; j <= 3; j += 1) {
    const yy = y + (h * j) / 4;
    rows += `<path d="M${f(x - 12 * (j / 4))} ${f(yy + 2)} Q${f(x + w / 2)} ${f(yy + 8)} ${f(x + w + 12 * (j / 4))} ${f(yy + 2)}" fill="none" stroke="#00000038" stroke-width="1.4"/>`;
  }
  const shape = `M${x} ${f(y - curve)} Q${f(x + w / 2)} ${f(y - curve - 6)} ${f(x + w)} ${f(y - curve)} L${f(x + w + 16)} ${f(eaveY + 2)} Q${f(x + w / 2)} ${f(eaveY + 12)} ${f(x - 16)} ${f(eaveY + 2)} Z`;
  return `<g>
    <path d="${shape}" fill="${colour}"/>
    <path d="${shape}" fill="url(#${pattern})" opacity=".6"/>
    ${rows}
    ${ribs}
    <path d="M${f(x - 2)} ${f(y - curve + 1)} Q${f(x + w / 2)} ${f(y - curve - 5)} ${f(x + w + 2)} ${f(y - curve + 1)}" fill="none" stroke="#4a3550" stroke-width="6" stroke-linecap="round"/>
    <path d="M${f(x - 2)} ${f(y - curve + 1)} Q${f(x + w / 2)} ${f(y - curve - 5)} ${f(x + w + 2)} ${f(y - curve + 1)}" fill="none" stroke="#ffcf8a" stroke-opacity=".5" stroke-width="1.6"/>
    <path d="M${f(x - 16)} ${f(eaveY + 2)} Q${f(x + w / 2)} ${f(eaveY + 12)} ${f(x + w + 16)} ${f(eaveY + 2)}" fill="none" stroke="${fascia}" stroke-width="7"/>
    <path d="M${f(x - 16)} ${f(eaveY + 1)} Q${f(x + w / 2)} ${f(eaveY + 10)} ${f(x + w + 16)} ${f(eaveY + 1)}" fill="none" stroke="#ffcf8a" stroke-opacity=".4" stroke-width="1.4"/>
    <path d="M${f(x - 20)} ${f(eaveY + 1)} q-6 7 2 13 M${f(x + w + 20)} ${f(eaveY + 1)} q6 7 -2 13" fill="none" stroke="${fascia}" stroke-width="3.4" stroke-linecap="round"/>
  </g>`;
}
