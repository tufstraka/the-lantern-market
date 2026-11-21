// Scene 2 — The Fish Market. Ice, scales and a harbour wind. Ten differences,
// including a fish that never made it onto the slab.

import {
  f, starField, moon, lightPool, streetBand, cobbles, farSkyline, hangingCable, pointOnCable,
} from '../art/common.js';
import {
  paperLantern, bulbString, awning, counter, crates, signBoard, windowBox,
  standingFigure, seatedFigure, fish, puddle, potPlant, roofTiles, stool,
  balanceScale, glyph, hangingCloth,
} from '../art/props.js';

const CABLE = [-10, 128, 630, 146, 36];
const FISH_X = [340, 396, 452, 508, 564];

function fishingBoats() {
  const hulls = [
    { x: 58, w: 76, y: 212, mast: 56 },
    { x: 180, w: 58, y: 222, mast: 40 },
    { x: 372, w: 90, y: 216, mast: 64 },
    { x: 516, w: 60, y: 226, mast: 34 },
  ];
  return hulls.map((hull, i) => `<g opacity="${0.55 + i * 0.07}">
      <path d="M${hull.x} ${hull.y} q${hull.w / 2} 12 ${hull.w} 0 l-6 -12 h-${hull.w - 12} Z" fill="#0b1320"/>
      <path d="M${f(hull.x + hull.w * 0.42)} ${hull.y - 12} V${hull.y - hull.mast}" stroke="#0b1320" stroke-width="2"/>
      <path d="M${f(hull.x + hull.w * 0.42)} ${hull.y - hull.mast + 8} L${f(hull.x + hull.w * 0.72)} ${hull.y - 22}" stroke="#0b1320" stroke-width="1.2"/>
      <path d="M${f(hull.x + hull.w * 0.42)} ${hull.y - hull.mast + 4} L${f(hull.x + hull.w * 0.2)} ${hull.y - 20}" stroke="#0b1320" stroke-width="1"/>
      <circle cx="${f(hull.x + hull.w * 0.42)}" cy="${hull.y - hull.mast + 6}" r="2.6" fill="#ffb469" opacity=".6"/>
    </g>`).join('');
}

function harbourBridge() {
  return `<g opacity=".72">
    <path d="M470 232 Q560 184 650 232" fill="none" stroke="#0e1623" stroke-width="5"/>
    <path d="M470 232 V246 M650 232 V246" stroke="#0e1623" stroke-width="4"/>
    <path d="M492 226 Q560 192 628 226" fill="none" stroke="#0e1623" stroke-width="1.6" opacity=".7"/>
    ${[504, 542, 580, 618].map((x, i) => `<circle cx="${x}" cy="${194 + Math.abs(i - 1.5) * 7}" r="2.2" fill="#ffcf8a" opacity=".55"/>`).join('')}
  </g>`;
}

function gull(perched) {
  if (!perched) return '';
  return `<g transform="translate(112 122) scale(1.3)">
    <path d="M0 0 q6 -9 12 -8 q-2 3 0 6 q7 -4 12 2 q-9 1 -12 6 q-1 4 -4 4 q-1 -3 -3 -3 q-2 3 -5 1 q1 -4 0 -8 Z" fill="#4a5c70"/>
    <path d="M12 5 q3 2 4 6" stroke="#26313f" stroke-width="1.6" fill="none"/>
    <path d="M0 0 q6 -9 12 -8" fill="none" stroke="#cfe3e6" stroke-width="1" stroke-opacity=".6"/>
    <circle cx="20" cy="-4" r="1.1" fill="#ffcf8a" opacity=".9"/>
  </g>`;
}

export const fishMarket = {
  id: 'fish-market',
  name: 'The Fish Market',
  flavour: 'Ice, scales and a harbour wind that moves everything twice.',
  seconds: 120,
  hotspots: [
    { id: 'gull', label: 'The gull left the roof', x: 84, y: 92, w: 68, h: 46 },
    { id: 'fish', label: 'One fish is missing from the ice', x: 476, y: 292, w: 66, h: 46 },
    { id: 'scale', label: 'The scale lost its right pan', x: 252, y: 240, w: 96, h: 70 },
    { id: 'stamp', label: 'The crate stamp changed', x: 44, y: 378, w: 64, h: 52 },
    { id: 'puddle', label: 'The puddle lost its lantern light', x: 100, y: 420, w: 92, h: 42 },
    { id: 'bulb', label: 'A bulb on the wire went out', x: 124, y: 124, w: 54, h: 52 },
    { id: 'arrow', label: 'The sign points the other way', x: 220, y: 244, w: 56, h: 60 },
    { id: 'stool', label: 'A stool lost a leg', x: 190, y: 400, w: 64, h: 58 },
    { id: 'tag', label: 'The price tag changed', x: 490, y: 246, w: 52, h: 46 },
    { id: 'lantern', label: 'A lantern changed colour', x: 576, y: 244, w: 52, h: 58 },
  ],

  render(variant) {
    const B = variant === 'b';
    const fishAt = FISH_X.filter((_, i) => !(B && i === 3));
    const bulbPos = pointOnCable(CABLE[0], CABLE[1], CABLE[2], CABLE[3], CABLE[4], 0.25);

    return `
      ${starField(19, 52, 620, 188)}
      <ellipse cx="330" cy="196" rx="240" ry="44" fill="#9fb6c4" opacity=".06" filter="url(#blur-14)"/>
      <ellipse cx="120" cy="172" rx="160" ry="30" fill="#cfe3e6" opacity=".05" filter="url(#blur-14)"/>
      ${moon({ x: 512, y: 80, r: 26, craterSet: 0 })}
      <g opacity=".5">
        <path d="M92 158 L60 212 M92 158 L120 206 M92 158 L92 208" fill="none" stroke="#0b1320" stroke-width="1"/>
        <path d="M412 152 L372 216 M412 152 L452 210 M412 152 L412 214" fill="none" stroke="#0b1320" stroke-width="1"/>
      </g>
      ${fishingBoats()}
      ${harbourBridge()}
      <path d="M-20 226 Q180 214 400 226 T640 220 V240 H-20 Z" fill="#0c111c" opacity=".92"/>
      ${farSkyline({ seed: 44, baseY: 232, colour: '#0f1424', lit: '#ffb469' })}

      ${streetBand({ y: 250, gradient: 'street-harbour', glow: true })}
      ${cobbles(41, 300, 470)}
      <g opacity=".45">
        <path d="M420 330 q9 3 13 9 q-10 2 -16 -4 Z" fill="#7a8a92"/>
        <path d="M300 366 q7 3 9 8 q-8 1 -12 -4 Z" fill="#6d7d86"/>
        <path d="M532 352 q6 2 9 7 q-8 2 -12 -3 Z" fill="#7a8a92"/>
      </g>

      <!-- left: chandler's shop, the gull's perch -->
      <g>
        <rect x="-6" y="150" width="212" height="96" fill="#2b2433"/>
        <rect x="-6" y="150" width="212" height="96" fill="url(#tiles-harbour)" opacity=".3"/>
        <path d="M-6 186 H206 M-6 214 H206" stroke="#0f0c16" stroke-width="2" opacity=".6"/>
        <path d="M-6 150 V246 M40 150 V246 M96 150 V246 M152 150 V246" stroke="#1a1424" stroke-width="4"/>
        ${roofTiles({ x: -14, y: 120, w: 232, h: 34, pattern: 'tiles-harbour', colour: '#1c2334', curve: 8 })}

        ${windowBox({ x: 24, y: 196, w: 22, h: 26, lit: true })}
        ${windowBox({ x: 74, y: 196, w: 22, h: 26, lit: true })}
        ${windowBox({ x: 130, y: 196, w: 22, h: 26, lit: false })}
        <g opacity=".9">
          <rect x="176" y="192" width="28" height="40" fill="#241a22"/>
          <path d="M178 200 H202 M178 210 H202 M178 220 H202" stroke="#ffcf8a" stroke-opacity=".18" stroke-width="1.2"/>
          ${glyph('fish', 190, 182, 18, '#e8c79a', 1.4, 0.8)}
        </g>
        ${hangingCloth({ x: 214, y: 156, w: 18, h: 48, pattern: 'stripe-sea', poleTo: 148 })}
        <g opacity=".55">
          <path d="M6 168 Q46 190 30 244 M6 168 Q40 196 52 244 M6 168 Q16 200 8 244" fill="none" stroke="#9fb6c4" stroke-width=".9"/>
        </g>
        <path d="M-6 246 H206" stroke="#00000066" stroke-width="3"/>
        ${gull(!B)}
      </g>

      <!-- bulb wire over the quay -->
      <path d="${hangingCable(CABLE[0], CABLE[1], CABLE[2], CABLE[3], CABLE[4])}" fill="none" stroke="#0e121c" stroke-width="1.4"/>
      ${bulbString({ points: CABLE, count: 20, skipBulb: B ? 5 : -1 })}
      ${B ? '' : `<circle cx="${bulbPos.x}" cy="${f(bulbPos.y + 5)}" r="7" fill="url(#lantern-glow)"/>`}

      <!-- the fish stall -->
      <g>
        <path d="M244 322 V204 M606 322 V204" stroke="#241a22" stroke-width="4"/>
        ${awning({ x: 232, y: 192, w: 388, h: 58, pattern: 'stripe-sea', valance: '#2f5f5c', poles: false })}
        <ellipse cx="420" cy="330" rx="180" ry="44" fill="url(#lantern-glow)" opacity=".22"/>
        <g opacity=".8">
          <path d="M248 250 Q330 268 412 250" fill="none" stroke="#1b2a2c" stroke-width="1.1"/>
          <path d="M262 258 l-2 9 M300 264 l-2 10 M340 266 l-2 10 M380 262 l-2 9" stroke="#1b2a2c" stroke-width="1"/>
          ${[262, 300, 340, 380].map((x) => `<circle cx="${x}" cy="${270}" r="3.4" fill="#c9a37e" opacity=".7"/>`).join('')}
        </g>

        ${standingFigure({ x: 566, y: 352, s: 1.0, hat: false, lantern: false, rim: '#9fb6c4', flip: true })}
        <path d="M548 318 q18 -8 36 0 v18 q-18 6 -36 0 Z" fill="#2b3a42" opacity=".9"/>

        ${counter({ x: 246, y: 322, w: 356, h: 66, top: '#6b4531' })}
        <rect x="258" y="302" width="330" height="24" rx="4" fill="url(#ice)" opacity=".95"/>
        <rect x="258" y="302" width="330" height="7" rx="3" fill="#eef8f8" opacity=".55"/>
        <path d="M262 322 H584" stroke="#3d6673" stroke-width="1" opacity=".6"/>
        <path d="M270 314 H580" stroke="#eef8f8" stroke-opacity=".35" stroke-width="1"/>
        <g opacity=".5">
          <path d="M286 306 l8 8 l-4 6 M330 308 l6 6 l-3 5 M470 307 l7 7 l-4 5 M556 306 l6 8 l-4 4" fill="none" stroke="#eef8f8" stroke-width=".8"/>
        </g>

        ${fishAt.map((x, i) => fish({
          x, y: 312 + (i % 2 ? 3 : 0), s: 1.16, angle: i % 2 ? -8 : 6,
          colour: i === 1 ? '#8fa9bd' : '#a8bec9', belly: '#e6f0f0',
        })).join('')}
        <g opacity=".9">
          <path d="M556 316 l24 -3 M560 320 l20 -3" stroke="#eef8f8" stroke-width="1.2" opacity=".45"/>
          <path d="M544 306 h18" stroke="#eef8f8" stroke-width="1.4" opacity=".35"/>
        </g>
        <g>
          <path d="M262 300 h30 l-3 10 h-24 Z" fill="#6b4531"/>
          <ellipse cx="277" cy="300" rx="14" ry="3" fill="#8f6a4d"/>
          <path d="M340 300 l4 -12 M344 288 l-4 -3 M344 288 l4 -2" stroke="#c9a37e" stroke-width="2.4" fill="none"/>
          <path d="M588 292 h16 v10 h-16 Z" fill="#3f5f66"/>
          ${glyph('fish', 596, 296, 10, '#e8c79a', 1, 0.5)}
        </g>

        <path d="M246 388 H602" stroke="#00000055" stroke-width="2"/>
        <path d="M300 388 V410 M540 388 V410" stroke="#2a1a20" stroke-width="4"/>

        <!-- the hanging scale -->
        <path d="M302 252 v8" stroke="#c9a37e" stroke-width="1"/>
        ${balanceScale({ x: 300, y: 320, s: 1.32, pan: !B, panFill: 1 })}

        <!-- price tag under the awning -->
        <g>
          <path d="M516 250 v8" stroke="#c9a37e" stroke-width="1"/>
          <rect x="502" y="258" width="30" height="24" rx="2" fill="#22302c" stroke="#6b4a33" stroke-width="1.6"/>
          ${glyph('price', 517, 270, 15, '#e8d6b0', 1.2, 0.85)}
        </g>

        <!-- arrow sign at the left post -->
        ${signBoard({ x: 226, y: 260, w: 46, h: 34, glyphKind: 'fish', arrow: B ? -1 : 1, rope: 6 })}

        <!-- lantern at the right post: its colour is the difference -->
        ${paperLantern({ x: 600, y: 270, w: 20, h: 26, colour: B ? '#e8a34f' : '#d9553f', tassel: 7 })}
      </g>

      <g>
        <path d="M300 424 h34 v-28 h-34 Z" fill="#4a3229"/>
        <ellipse cx="317" cy="396" rx="17" ry="5" fill="#6b4a37"/>
        <path d="M300 414 h34" stroke="#2a1a20" stroke-width="1.4"/>
        ${glyph('mount', 317, 410, 12, '#e8c79a', 1, 0.35)}
        <path d="M470 430 h30 v-24 h-30 Z" fill="#3f2a26"/>
        <path d="M470 422 h30" stroke="#00000055" stroke-width="1.2"/>
      </g>
      ${lightPool(330, 406, 200, 66, 0.55)}
      ${lightPool(540, 396, 140, 50, 0.4)}

      <!-- foreground crates, barrel and puddle -->
      <g>
        ${crates({ x: 54, y: 398, w: 58, h: 42, stampSet: B ? 1 : 0 })}
        ${crates({ x: 108, y: 416, w: 44, h: 32, stampSet: 0 })}
        <g>
          <path d="M236 402 h34 v-32 h-34 Z" fill="#4a3229"/>
          <ellipse cx="253" cy="370" rx="17" ry="5" fill="#5d4335"/>
          <path d="M236 386 h34" stroke="#2a1a20" stroke-width="1.4"/>
          ${glyph('fish', 253, 404, 12, '#e8c79a', 1, 0.35)}
        </g>
        ${puddle({ x: 148, y: 446, rx: 84, ry: 16, reflection: B ? 1 : 0 })}
      </g>

      <!-- customer and the stool with something missing -->
      <g>
        ${seatedFigure({ x: 172, y: 432, s: 0.92, cup: false })}
        ${stool({ x: 222, y: 434, s: 1.05, legs: B ? 2 : 3 })}
      </g>
      ${standingFigure({ x: 552, y: 450, s: 0.8, hat: true, lantern: true, flip: true })}
      ${potPlant({ x: 596, y: 434, s: 1.1, flowers: 3 })}

      <path d="M0 454 Q140 442 300 452 T640 446 V480 H0 Z" fill="#080b12"/>
      <ellipse cx="300" cy="392" rx="250" ry="12" fill="#cfe3e6" opacity=".03"/>
    `;
  },
};
