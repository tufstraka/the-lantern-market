// Scene 1 — Lantern Row. Paper lights over a fruit stall, a leaning bicycle,
// a cat on a crate and a moon with a memory. Ten differences hide here.

import {
  f, rng, starField, moon, lightPool, streetBand, cobbles, farSkyline,
  pagodaSilhouette, pointOnCable, hangingCable, rimLight,
} from '../art/common.js';
import {
  paperLantern, bulbString, awning, counter, crates, signBoard, windowBox,
  standingFigure, cat, bicycle, teapot, glyph, fruitBasket, puddle, potPlant,
  hangingCloth, roofTiles, steam,
} from '../art/props.js';

const CABLE = [-10, 150, 630, 128, 40];
const LANTERN_T = [0.18, 0.34, 0.5, 0.66, 0.82];

function cableLanterns(variant) {
  let out = '';
  LANTERN_T.forEach((t, i) => {
    if (variant === 'b' && i === 2) return; // the missing lantern
    const p = pointOnCable(CABLE[0], CABLE[1], CABLE[2], CABLE[3], CABLE[4], t);
    const big = i === 1 || i === 3;
    out += paperLantern({
      x: p.x,
      y: f(p.y + 17),
      w: big ? 26 : 21,
      h: big ? 33 : 27,
      colour: big ? '#d9553f' : '#e8845f',
      tassel: big ? 9 : 7,
    });
  });
  return out;
}

function pennants() {
  let out = '';
  for (let i = 0; i < 11; i += 1) {
    const t = 0.08 + i * 0.085;
    const p = pointOnCable(CABLE[0], CABLE[1], CABLE[2], CABLE[3], CABLE[4], t);
    const colour = ['#c0533f', '#e8c79a', '#3f7d7a'][i % 3];
    out += `<path d="M${p.x - 5} ${f(p.y + 2)} L${p.x + 5} ${f(p.y + 2)} L${p.x} ${f(p.y + 13)} Z" fill="${colour}" opacity=".55"/>`;
  }
  return out;
}

export const lanternRow = {
  id: 'lantern-row',
  name: 'Lantern Row',
  flavour: 'Fruit lamps, a sleepy cat, and one moon for two skies.',
  seconds: 120,
  hotspots: [
    { id: 'lantern', label: 'One paper lantern has gone dark', x: 284, y: 132, w: 54, h: 52 },
    { id: 'sign', label: 'The hanging sign says something else', x: 470, y: 164, w: 72, h: 66 },
    { id: 'cat', label: "The cat's tail has moved", x: 356, y: 342, w: 50, h: 60 },
    { id: 'wheel', label: 'A bicycle wheel lost spokes', x: 450, y: 380, w: 52, h: 50 },
    { id: 'moon', label: 'The moon wears its craters differently', x: 486, y: 30, w: 66, h: 66 },
    { id: 'window', label: 'A window went dark', x: 542, y: 170, w: 52, h: 56 },
    { id: 'teapot', label: 'The teapot handle changed shape', x: 246, y: 286, w: 54, h: 46 },
    { id: 'price', label: 'A price tag is missing', x: 104, y: 282, w: 68, h: 38 },
    { id: 'shadow', label: "The lantern bearer's shadow turned", x: 228, y: 430, w: 122, h: 30 },
    { id: 'awning', label: 'The awning changed colour', x: 52, y: 228, w: 104, h: 48 },
  ],

  render(variant) {
    const B = variant === 'b';
    const filter = B ? 'stripe-plum' : 'stripe-warm';
    const rand = rng(41);
    const priceTags = B ? 2 : 3;

    return `
      ${starField(7, 74, 620, 220)}
      <ellipse cx="120" cy="168" rx="180" ry="26" fill="#7d6a9a" opacity=".07" filter="url(#blur-14)"/>
      <ellipse cx="420" cy="186" rx="210" ry="22" fill="#e2603f" opacity=".06" filter="url(#blur-14)"/>
      ${moon({ x: 520, y: 64, r: 28, craterSet: B ? 1 : 0 })}
      <ellipse cx="300" cy="258" rx="430" ry="90" fill="url(#city-glow)" opacity=".85"/>
      <path d="M-20 240 Q120 214 250 236 T640 226 V252 H-20 Z" fill="#1d1430" opacity=".9"/>
      ${farSkyline({ seed: 12, baseY: 238, colour: '#191129', lit: '#ffb469' })}
      ${pagodaSilhouette({ x: 84, y: 254, scale: 0.94 })}

      <!-- left-hand rooftops behind the stall -->
      <g opacity=".9">
        <path d="M-10 232 L-10 196 L38 196 L54 178 L96 178 L112 196 L150 196 L150 232 Z" fill="#241a33"/>
        <path d="M-10 196 L150 196" stroke="#ffcf8a" stroke-opacity=".12" stroke-width="1.4"/>
        ${windowBox({ x: 24, y: 204, w: 16, h: 18, lit: true })}
        ${windowBox({ x: 70, y: 204, w: 16, h: 18, lit: true })}
        ${windowBox({ x: 116, y: 204, w: 16, h: 18, lit: false })}
        <path d="M-6 232 H156" stroke="#00000066" stroke-width="3"/>
      </g>

      <!-- right-hand timber house -->
      <g>
        <rect x="352" y="148" width="276" height="112" fill="#3a2739"/>
        <rect x="352" y="148" width="276" height="112" fill="url(#tiles)" opacity=".14"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="${362 + i * 66}" y="176" width="54" height="56" fill="#51354a" opacity=".6"/>`).join('')}
        <path d="M352 176 H628 M352 238 H628" stroke="#241727" stroke-width="4"/>
        <path d="M352 148 V260 M418 148 V260 M484 148 V260 M550 148 V260 M618 148 V260" stroke="#241727" stroke-width="4"/>
        <path d="M352 148 V260" stroke="#6b4a5c" stroke-width="1" opacity=".5"/>
        <rect x="352" y="146" width="276" height="5" fill="#3f2c3f"/>

        ${roofTiles({ x: 342, y: 100, w: 296, h: 52, colour: '#241a30', curve: 10 })}
        <rect x="352" y="144" width="276" height="7" fill="#1c1326" opacity=".55"/>

        ${windowBox({ x: 382, y: 190, w: 22, h: 26, lit: true })}
        ${windowBox({ x: 426, y: 190, w: 22, h: 26, lit: true })}
        ${windowBox({ x: 556, y: 188, w: 24, h: 28, lit: !B })}

        <path d="M470 168 H552" stroke="#3a2a34" stroke-width="3"/>
        <path d="M478 168 V176 M544 168 V176" stroke="#8f6a4d" stroke-width="1.4"/>
        ${signBoard({ x: 476, y: 176, w: 60, h: 42, glyphKind: B ? 'tea' : 'lamp', rope: 8 })}

        ${hangingCloth({ x: 344, y: 158, w: 18, h: 50, pattern: 'stripe-warm', poleTo: 146 })}

        <g>
          <rect x="592" y="212" width="30" height="46" fill="#2a1b2a"/>
          <rect x="595" y="215" width="24" height="40" fill="#ffbf7a" opacity=".55"/>
          ${paperLantern({ x: 607, y: 200, w: 14, h: 18, colour: '#e8a34f', tassel: 4 })}
        </g>

        <g opacity=".55">
          <path d="M362 250 H628 M362 244 H628" stroke="#241727" stroke-width="1.2"/>
          <path d="M428 246 v-8 M494 246 v-8 M560 246 v-8" stroke="#241727" stroke-width="1.2"/>
          <path d="M452 238 q6 -10 12 0 l-2 8 h-8 Z" fill="#c0533f"/>
          <path d="M520 238 q5 -8 10 0 l-2 8 h-6 Z" fill="#e8c79a"/>
          <path d="M586 238 q6 -9 11 0 l-2 8 h-7 Z" fill="#3f7d7a"/>
        </g>
        <path d="M352 258 H628" stroke="#00000066" stroke-width="3"/>
        <rect x="548" y="176" width="5" height="82" fill="#7a3b3b" opacity=".75"/>
        <g opacity=".9">
          <path d="M360 256 l14 -14 h6 l-14 14 Z" fill="#4a3348"/>
          ${potPlant({ x: 624, y: 256, s: 0.8, flowers: 3 })}
        </g>
      </g>

      <!-- lantern cable over the street -->
      <path d="${hangingCable(CABLE[0], CABLE[1], CABLE[2], CABLE[3], CABLE[4])}" fill="none" stroke="#100b16" stroke-width="1.4"/>
      ${bulbString({ points: CABLE, count: 24, skipBulb: 9 })}
      ${pennants()}
      ${cableLanterns(variant)}

      ${streetBand({ y: 252 })}
      ${cobbles(23, 300, 470)}
      <g opacity=".5">
        <path d="M370 320 q8 3 12 8 q-9 2 -14 -3 Z" fill="#8a5a3a"/>
        <path d="M212 350 q7 4 9 9 q-8 1 -12 -4 Z" fill="#7a5a3a"/>
        <path d="M470 360 q6 2 9 7 q-8 2 -12 -3 Z" fill="#6b4a33"/>
        <path d="M150 386 q6 3 8 7 q-7 1 -10 -3 Z" fill="#8a5a3a"/>
        <path d="M530 322 q5 2 8 6 q-7 2 -10 -2 Z" fill="#6b4a33"/>
      </g>

      <!-- fruit stall -->
      <g>
        <path d="M60 300 V236 M232 300 V236" stroke="#2a1c25" stroke-width="4"/>
        ${awning({ x: 34, y: 226, w: 216, h: 44, pattern: filter, valance: B ? '#5e3348' : '#a8432f', poles: false })}
        <path d="M40 272 H244" stroke="#00000055" stroke-width="6" opacity=".5"/>
        <rect x="34" y="226" width="216" height="8" fill="#00000033"/>
        <ellipse cx="140" cy="302" rx="112" ry="34" fill="url(#lantern-glow)" opacity=".4"/>
        ${paperLantern({ x: 76, y: 288, w: 16, h: 20, colour: '#e8845f', tassel: 4 })}
        ${paperLantern({ x: 212, y: 288, w: 16, h: 20, colour: '#e8a34f', tassel: 4 })}
        <g opacity=".85">
          <path d="M180 286 q-2 10 -6 14" stroke="#6b4a33" stroke-width="1" fill="none"/>
          <path d="M178 288 l5 5 M176 292 l6 4 M181 296 l5 3" stroke="#c0533f" stroke-width="2" stroke-linecap="round"/>
        </g>
        ${counter({ x: 48, y: 300, w: 192, h: 62 })}
        <g opacity=".9">
          <rect x="54" y="312" width="180" height="7" fill="#00000033"/>
          ${[0, 1, 2, 3].map((i) => `<path d="M${54 + i * 45} 312 v7" stroke="#00000044" stroke-width="1"/>`).join('')}
        </g>
        ${fruitBasket({ x: 96, y: 300, s: 1.1 })}
        ${fruitBasket({ x: 160, y: 300, s: 1.0 })}
        <g>
          <path d="M96 300 v-6 M160 300 v-6" stroke="#00000055" stroke-width="2"/>
          <path d="M70 296 h28 l-4 10 h-20 Z" fill="#8f6a4d" opacity=".9"/>
        </g>
        ${Array.from({ length: priceTags }, (_, i) => `<g>
          <path d="M${122 + i * 18} 286 v6" stroke="#c9a37e" stroke-width="1"/>
          <rect x="${114 + i * 18}" y="292" width="16" height="20" rx="2" fill="#e8d0a8" stroke="#a8865f" stroke-width="1"/>
          ${glyph(i === 1 && !B ? 'mount' : 'price', 122 + i * 18, 302, 10, '#5a3a2a', 1.1, 0.85)}
        </g>`).join('')}
        <g>
          <rect x="252" y="314" width="40" height="46" rx="3" fill="url(#wood)"/>
          <path d="M252 322 H292" stroke="#00000044" stroke-width="1.4"/>
          ${teapot({ x: 268, y: 310, s: 0.92, handle: B ? 1 : 0 })}
          ${glyph('cup', 282, 330, 10, '#e8c79a', 1, 0.5)}
          <path d="M252 360 H292" stroke="#00000066" stroke-width="2"/>
        </g>
        ${crates({ x: 152, y: 372, w: 54, h: 40, stampSet: 0 })}
        ${crates({ x: 198, y: 380, w: 40, h: 32, stampSet: 1 })}
        <path d="M150 412 H246" stroke="#00000066" stroke-width="3"/>
      </g>

      <!-- stone bench, planters, standing lamp -->
      <g>
        <rect x="34" y="424" width="118" height="14" rx="3" fill="#453a4c"/>
        <rect x="42" y="438" width="10" height="18" fill="#332a3c"/>
        <rect x="134" y="438" width="10" height="18" fill="#332a3c"/>
        <path d="M34 424 H152" stroke="#ffcf8a" stroke-opacity=".22" stroke-width="1.2"/>
        ${potPlant({ x: 60, y: 424, s: 0.9, flowers: 3 })}
        <path d="M196 456 V362" stroke="#231a28" stroke-width="3.4"/>
        <path d="M188 362 h16" stroke="#231a28" stroke-width="3"/>
        <g>${paperLantern({ x: 196, y: 344, w: 18, h: 22, colour: '#f0a45f', tassel: 5 })}</g>
        <circle cx="196" cy="344" r="34" fill="url(#lantern-glow)" opacity=".5"/>
      </g>

      ${puddle({ x: 286, y: 448, rx: 86, ry: 17, reflection: 0 })}
      ${lightPool(196, 430, 130, 60, 0.8)}
      <g opacity=".5">
        <path d="M262 428 q-3 8 2 16 M270 424 q-2 10 3 18 M282 426 q-2 8 2 14" stroke="#ffcf8a" stroke-width="1.1" fill="none" opacity=".5"/>
        <path d="M470 428 q-2 8 2 14 M478 424 q-2 10 3 16" stroke="#ffb469" stroke-width="1" fill="none" opacity=".35"/>
      </g>

      <!-- chestnut cart at the corner -->
      <g>
        <rect x="548" y="352" width="60" height="48" rx="3" fill="#5d3b2c"/>
        <rect x="544" y="344" width="68" height="10" rx="2" fill="#7a5232"/>
        <path d="M548 344 H608" stroke="#ffcf8a" stroke-opacity=".35" stroke-width="1.4"/>
        <ellipse cx="578" cy="350" rx="26" ry="7" fill="#2f1a18"/>
        <ellipse cx="570" cy="349" rx="7" ry="2.6" fill="#ff7a3a" opacity=".75"/>
        <ellipse cx="584" cy="351" rx="6" ry="2.2" fill="#ffb469" opacity=".7"/>
        ${[566, 576, 586, 596].map((x) => `<circle cx="${x}" cy="${347 - (x % 3)}" r="2.6" fill="#8a5a3a"/>`).join('')}
        ${steam({ x: 578, y: 336, s: 0.65 })}
        <path d="M550 356 h56" stroke="#00000044" stroke-width="1.4"/>
        <circle cx="562" cy="406" r="8" fill="none" stroke="#c9b8a3" stroke-width="2"/>
        <circle cx="598" cy="406" r="8" fill="none" stroke="#c9b8a3" stroke-width="2"/>
        <path d="M554 400 L578 380 L604 400" fill="none" stroke="#3a2620" stroke-width="2"/>
        ${glyph('mount', 578, 372, 12, '#e8c79a', 1, 0.5)}
        <ellipse cx="578" cy="398" rx="38" ry="10" fill="url(#pool-warm)" opacity=".7"/>
      </g>

      <!-- the cat and its crate -->
      <g>
        ${crates({ x: 328, y: 398, w: 46, h: 30, stampSet: 0 })}
        ${cat({ x: 356, y: 398, s: 1.0, tail: B ? 1 : 0 })}
      </g>

      <!-- bicycle leaning by the house -->
      ${bicycle({ x: 502, y: 430, s: 1.02, spokes: B ? 6 : 10 })}
      <path d="M546 430 L556 396" stroke="#c9b8a3" stroke-width="1" opacity=".25"/>

      <!-- the lantern bearer -->
      <g>
        ${standingFigure({ x: 300, y: 414, s: 1.08, flip: false })}
        <ellipse cx="${B ? 340 : 258}" cy="446" rx="${B ? 42 : 52}" ry="7" fill="#05060e" opacity=".45"/>
        <ellipse cx="${B ? 342 : 258}" cy="444" rx="24" ry="4" fill="#05060e" opacity=".3"/>
        <path d="M${B ? 340 : 258} 440 Q${B ? 376 : 222} 436 ${B ? 404 : 194} 442" fill="none" stroke="#ffcf8a" stroke-opacity=".14" stroke-width="2"/>
      </g>

      <!-- two late walkers, far down the row -->
      <g opacity=".6">
        ${standingFigure({ x: 214, y: 300, s: 0.4, lantern: false, rim: null })}
        ${standingFigure({ x: 240, y: 304, s: 0.38, lantern: false, rim: null })}
      </g>
      <ellipse cx="300" cy="286" rx="220" ry="16" fill="#ffd9a6" opacity=".05"/>
      <path d="M0 470 Q160 452 320 462 T640 456 V480 H0 Z" fill="#0b0812"/>
    `;
  },
};
