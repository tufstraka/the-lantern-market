// Scene 3 — The Tea House. Steam, lattice and a paper umbrella. Ten differences
// in the warmest corner of the market.

import {
  f, starField, moon, lightPool, cobbles, farSkyline, pagodaSilhouette,
  hangingCable, pointOnCable,
} from '../art/common.js';
import {
  paperLantern, bulbString, signBoard, seatedFigure, standingFigure,
  teapot, kettle, steam, stool, umbrella, potPlant, chalkboard, glyph,
  hangingCloth, roofTiles, crates,
} from '../art/props.js';

const CABLE = [-10, 84, 630, 92, 26];

function teaHouseFacade(B) {
  return `<g>
    <!-- roof -->
    ${roofTiles({ x: 122, y: 96, w: 376, h: 56, colour: '#241a30', curve: 12 })}
    <rect x="140" y="148" width="340" height="8" fill="#1c1326" opacity=".55"/>
    <ellipse cx="310" cy="292" rx="190" ry="46" fill="url(#lantern-glow)" opacity=".28"/>
    <g>
      <path d="M462 196 v-16 M462 196 h-4" stroke="#2a1b26" stroke-width="1.4"/>
      ${paperLantern({ x: 462, y: 208, w: 14, h: 18, colour: '#e8a34f', tassel: 4 })}
      <rect x="336" y="204" width="22" height="38" fill="#8a3f3f" opacity=".7"/>
      ${glyph('tea', 347, 220, 14, '#f3dcb4', 1.2, 0.8)}
      <path d="M336 204 h22" stroke="#c9a37e" stroke-width="1.6"/>
    </g>
    <g opacity=".8">${Array.from({ length: 14 }, (_, i) => `<path d="M${150 + i * 24} 152 v8" stroke="#0f0a16" stroke-width="2.4"/>`).join('')}</g>

    <!-- the roof ornament: present in A, gone in B -->
    ${B ? '' : `<g>
      <path d="M312 98 V80" stroke="#33243a" stroke-width="2.6"/>
      <path d="M300 82 Q312 66 324 82 Q312 90 300 82 Z" fill="#33243a"/>
      <circle cx="312" cy="64" r="2.6" fill="#4a3550"/>
      <path d="M300 82 Q312 66 324 82" fill="none" stroke="#ffcf8a" stroke-opacity=".35" stroke-width="1"/>
    </g>`}

    <!-- wall -->
    <rect x="140" y="152" width="340" height="150" fill="#4a3040"/>
    <rect x="140" y="152" width="340" height="150" fill="url(#tiles)" opacity=".1"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${146 + i * 68}" y="192" width="58" height="50" fill="#5a3a4a" opacity=".55"/>`).join('')}
    <path d="M140 152 V302 M200 152 V302 M270 152 V302 M330 152 V302 M400 152 V302 M480 152 V302" stroke="#2a1b29" stroke-width="5"/>
    <path d="M140 190 H480 M140 246 H480 M140 302 H480" stroke="#2a1b29" stroke-width="4"/>
    <path d="M140 152 V302" stroke="#7a5666" stroke-width="1.2" opacity=".5"/>
    <rect x="140" y="152" width="340" height="5" fill="#2b1c27"/>

    <!-- shoji windows: the left lattice was restrung -->
    <g>
      <rect x="172" y="196" width="78" height="44" rx="2" fill="#ffbf7a" opacity=".92"/>
      <rect x="172" y="196" width="78" height="44" rx="2" fill="url(#${B ? 'lattice-diamond' : 'lattice'})" opacity=".9"/>
      <rect x="172" y="196" width="78" height="44" rx="2" fill="none" stroke="#2b1c27" stroke-width="3"/>
      <rect x="166" y="192" width="90" height="4" fill="#2b1c27"/>

      <rect x="358" y="196" width="78" height="44" rx="2" fill="#ffbf7a" opacity=".92"/>
      <rect x="358" y="196" width="78" height="44" rx="2" fill="url(#lattice)" opacity=".9"/>
      <rect x="358" y="196" width="78" height="44" rx="2" fill="none" stroke="#2b1c27" stroke-width="3"/>
      <rect x="352" y="192" width="90" height="4" fill="#2b1c27"/>
    </g>

    <!-- balcony rail -->
    <path d="M150 250 H470" stroke="#33212e" stroke-width="3"/>
    <path d="M164 250 V262 M190 250 V262 M216 250 V262 M242 250 V262 M268 250 V262 M294 250 V262 M320 250 V262 M346 250 V262 M372 250 V262 M398 250 V262 M424 250 V262 M450 250 V262" stroke="#33212e" stroke-width="2"/>
    <path d="M150 262 H470" stroke="#33212e" stroke-width="2.6"/>

    <!-- doorway with noren -->
    <g>
      <rect x="276" y="246" width="62" height="56" fill="#2a1b26"/>
      <rect x="280" y="250" width="54" height="52" fill="#ffbf7a" opacity=".7"/>
      <path d="M280 250 H334 V272 H280 Z" fill="#3f4a63"/>
      <path d="M280 272 q13 -6 27 0 q14 -6 27 0 v4 q-13 -6 -27 0 q-14 -6 -27 0 Z" fill="#4c5875"/>
      ${glyph('tea', 307, 262, 15, '#e8d6b0', 1.3, 0.9)}
      <path d="M274 246 H340" stroke="#2b1c27" stroke-width="4"/>
    </g>

    <!-- tea jars on a shelf -->
    <g>
      <rect x="346" y="268" width="86" height="5" fill="#2a1b26"/>
      ${[0, 1, 2].map((i) => `<g transform="translate(${360 + i * 26} 268)">
        <ellipse cx="0" cy="-6" rx="7" ry="8" fill="#3f6b6a"/>
        <rect x="-7" y="-8" width="14" height="8" fill="#345a59"/>
        <ellipse cx="0" cy="-14" rx="6" ry="3" fill="#284544"/>
        <path d="M-4 -12 q4 -3 8 0" stroke="#e8c79a" stroke-width=".9" opacity=".5" fill="none"/>
      </g>`).join('')}
    </g>

    <!-- the house's own sign, and a small lantern by the door -->
    ${signBoard({ x: 146, y: 208, w: 42, h: 46, glyphKind: 'tea', rope: 26 })}
    ${paperLantern({ x: 452, y: 172, w: 20, h: 24, colour: '#e8a34f', tassel: 7 })}

    <path d="M140 302 H480" stroke="#00000066" stroke-width="3"/>
  </g>`;
}

export const teaHouse = {
  id: 'tea-house',
  name: 'The Tea House',
  flavour: 'Steam, lattice and a paper umbrella waiting for rain.',
  seconds: 120,
  hotspots: [
    { id: 'lattice', label: 'The window lattice was restrung', x: 166, y: 188, w: 90, h: 58 },
    { id: 'steam', label: 'The kettle stopped steaming', x: 392, y: 300, w: 58, h: 62 },
    { id: 'teapot', label: 'The teapot handle changed shape', x: 280, y: 330, w: 60, h: 46 },
    { id: 'umbrella', label: 'A paper umbrella changed colour', x: 62, y: 202, w: 68, h: 68 },
    { id: 'tassel', label: 'A lantern tassel grew longer', x: 132, y: 148, w: 48, h: 72 },
    { id: 'finial', label: 'The roof lost its ornament', x: 284, y: 60, w: 58, h: 48 },
    { id: 'stool', label: 'A stool is missing', x: 352, y: 408, w: 68, h: 58 },
    { id: 'chalk', label: 'The chalk menu changed', x: 54, y: 330, w: 70, h: 60 },
    { id: 'flowers', label: 'The planter lost a blossom', x: 556, y: 392, w: 50, h: 58 },
    { id: 'shadow', label: "The tea drinker's shadow turned", x: 452, y: 434, w: 130, h: 30 },
  ],

  render(variant) {
    const B = variant === 'b';
    const umbrellaPanel = B ? '#3f6f74' : '#c0533f';

    return `
      ${starField(31, 66, 620, 200)}
      ${moon({ x: 548, y: 76, r: 24, craterSet: 0 })}
      ${pagodaSilhouette({ x: 578, y: 268, scale: 0.7 })}
      ${farSkyline({ seed: 71, baseY: 246, colour: '#1b1128', lit: '#ffcf8a' })}
      <ellipse cx="300" cy="252" rx="420" ry="62" fill="url(#city-glow)" opacity=".7"/>
      <ellipse cx="120" cy="200" rx="150" ry="26" fill="#cfe3e6" opacity=".05" filter="url(#blur-14)"/>

      <path d="${hangingCable(CABLE[0], CABLE[1], CABLE[2], CABLE[3], CABLE[4])}" fill="none" stroke="#100b16" stroke-width="1.3"/>
      ${bulbString({ points: CABLE, count: 22 })}
      ${(() => {
        const a = pointOnCable(CABLE[0], CABLE[1], CABLE[2], CABLE[3], CABLE[4], 0.2);
        const b = pointOnCable(CABLE[0], CABLE[1], CABLE[2], CABLE[3], CABLE[4], 0.62);
        return paperLantern({ x: a.x, y: f(a.y + 16), w: 18, h: 22, colour: '#e8a34f', tassel: 5 })
          + paperLantern({ x: b.x, y: f(b.y + 16), w: 18, h: 22, colour: '#d9553f', tassel: 5 });
      })()}

      <rect x="-10" y="248" width="640" height="232" fill="url(#street-tea)"/>
      <ellipse cx="310" cy="254" rx="360" ry="60" fill="url(#city-glow)" opacity=".6"/>
      ${cobbles(61, 300, 470)}
      <g opacity=".45">
        <path d="M262 330 q7 3 9 8 q-8 1 -12 -4 Z" fill="#8a5a3a"/>
        <path d="M470 352 q6 2 9 7 q-8 2 -12 -3 Z" fill="#7a5a3a"/>
        <path d="M140 366 q6 3 8 7 q-7 1 -10 -3 Z" fill="#6b4a33"/>
      </g>

      ${teaHouseFacade(B)}
      ${paperLantern({ x: 150, y: 172, w: 22, h: 28, colour: '#d9553f', tassel: B ? 4 : 18 })}

      <!-- umbrella rack to the left of the house -->
      <g>
        <path d="M56 300 V214 M132 300 V214" stroke="#2a1c25" stroke-width="3"/>
        <path d="M52 218 H136" stroke="#2a1c25" stroke-width="3"/>
        ${umbrella({ x: 94, y: 240, r: 33, panel: umbrellaPanel, alt: '#efd7ad' })}
        <path d="M124 300 L132 232" stroke="#6b5a3a" stroke-width="2.4"/>
        <path d="M124 300 q-3 -4 1 -6" fill="none" stroke="#6b5a3a" stroke-width="2"/>
      </g>

      ${lightPool(310, 372, 220, 74, 0.65)}

      <!-- the tea table -->
      <g>
        <ellipse cx="306" cy="424" rx="104" ry="22" fill="#05060e" opacity=".38"/>
        <path d="M214 392 H398" stroke="#4a3229" stroke-width="4"/>
        <path d="M226 392 V428 M386 392 V428" stroke="#3a2620" stroke-width="6"/>
        <ellipse cx="306" cy="374" rx="96" ry="21" fill="#5d3f30"/>
        <ellipse cx="306" cy="370" rx="96" ry="20" fill="#6b4a37"/>
        <ellipse cx="306" cy="370" rx="82" ry="15" fill="#7a563f" opacity=".55"/>
        ${teapot({ x: 300, y: 358, s: 1.15, handle: B ? 1 : 0, colour: '#4f6f74' })}
        ${[254, 356].map((x) => `<g transform="translate(${x} 364)">
          <ellipse cx="0" cy="6" rx="9" ry="3" fill="#05060e" opacity=".35"/>
          ${glyph('cup', 0, 0, 11, '#e8d6b0', 1.2, 0.9)}
        </g>`).join('')}
        <ellipse cx="330" cy="378" rx="16" ry="4.5" fill="#2f5f5c" opacity=".7"/>
        <g opacity=".95">
          <ellipse cx="272" cy="384" rx="11" ry="4" fill="#c9a37e"/>
          <ellipse cx="272" cy="383" rx="8" ry="2.6" fill="#8a5a3a"/>
          <path d="M284 380 q6 -2 8 2" stroke="#ffcf8a" stroke-width="1" fill="none" opacity=".5"/>
          <ellipse cx="348" cy="386" rx="9" ry="3.4" fill="#d9ab72"/>
          <path d="M344 384 h8" stroke="#8a5a3a" stroke-width="1"/>
        </g>
        <path d="M306 388 q-20 4 -40 2 M306 388 q20 4 40 2" fill="none" stroke="#3a2620" stroke-width="2" opacity=".6"/>
        <path d="M264 362 q6 -8 14 -4" stroke="#ffe0ad" stroke-width="1.2" opacity=".35" fill="none"/>
        <g>
          <ellipse cx="336" cy="366" rx="8" ry="2.6" fill="#c9a37e"/>
          <ellipse cx="336" cy="365" rx="5.6" ry="1.6" fill="#8a5a3a"/>
          <path d="M232 372 q4 -6 9 -2" stroke="#ffe0ad" stroke-width="1" opacity=".3" fill="none"/>
          <path d="M356 374 h16 M356 377 h13" stroke="#e8c79a" stroke-width="1" opacity=".4"/>
          <path d="M306 356 q-3 -8 0 -12 q3 4 0 12" fill="#ffcf8a" opacity=".35"/>
        </g>
      </g>

      <!-- clay stove, kettle and its steam -->
      <g>
        <path d="M396 404 h48 v-18 h-48 Z" fill="#7a4535"/>
        <path d="M396 386 h48 v-6 h-48 Z" fill="#8f553f"/>
        <path d="M406 404 v6 M434 404 v6" stroke="#3a2620" stroke-width="3"/>
        ${kettle({ x: 420, y: 360, s: 1.05 })}
        ${B ? '' : steam({ x: 420, y: 330, s: 0.95 })}
        <ellipse cx="434" cy="386" rx="4" ry="2.4" fill="#ffb469" opacity=".65"/>
      </g>

      <!-- stools around the table -->
      <g>
        ${stool({ x: 200, y: 438, s: 1.1, legs: 3 })}
        ${B ? '' : stool({ x: 386, y: 442, s: 1.1, legs: 3 })}
      </g>

      <!-- chalkboard menu -->
      ${chalkboard({ x: 56, y: 336, w: 58, h: 44, glyphKind: B ? 'cup' : 'price' })}

      <!-- the tea drinker on the bench -->
      <g>
        <rect x="470" y="420" width="96" height="12" rx="3" fill="#4a3229"/>
        <rect x="478" y="432" width="10" height="22" fill="#3a2620"/>
        <rect x="548" y="432" width="10" height="22" fill="#3a2620"/>
        <path d="M470 420 H566" stroke="#ffcf8a" stroke-opacity=".25" stroke-width="1.2"/>
        <ellipse cx="494" cy="414" rx="12" ry="5" fill="#6b4a37"/>
        ${seatedFigure({ x: 522, y: 428, s: 1.02, cup: true })}
        <ellipse cx="${B ? 556 : 488}" cy="452" rx="${B ? 36 : 44}" ry="7" fill="#05060e" opacity=".45"/>
        <path d="M${B ? 556 : 488} 448 Q${B ? 592 : 454} 444 ${B ? 608 : 434} 450" fill="none" stroke="#ffcf8a" stroke-opacity=".15" stroke-width="2"/>
        ${potPlant({ x: 580, y: 444, s: 1.15, flowers: B ? 2 : 3 })}
      </g>

      <!-- planter by the door, steamer stack, crates -->
      <g>
        <g transform="translate(150 438)">
          <ellipse cx="0" cy="2" rx="24" ry="5" fill="#05060e" opacity=".35"/>
          <ellipse cx="0" cy="-4" rx="18" ry="6" fill="#b98a55"/>
          <ellipse cx="0" cy="-12" rx="16" ry="5" fill="#c99a63"/>
          <ellipse cx="0" cy="-19" rx="14" ry="4.6" fill="#d9ab72"/>
          <path d="M-18 -4 q18 6 36 0" fill="none" stroke="#8a6238" stroke-width="1.4"/>
        </g>
        ${crates({ x: 96, y: 414, w: 42, h: 30, stampSet: 1 })}
      </g>

      ${standingFigure({ x: 232, y: 320, s: 0.56, lantern: false, rim: '#ffb469' })}
      <ellipse cx="300" cy="326" rx="220" ry="14" fill="#ffd9a6" opacity=".05"/>
      <path d="M0 462 Q160 446 320 456 T640 450 V480 H0 Z" fill="#0a0710"/>
    `;
  },
};
