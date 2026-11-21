// Shared paints, patterns and filters for the painted night-market scenes.
// Defined once per panel; both panels use the same ids so the same defs serve
// scene art, lantern light and the markers drawn on top.

export function svgDefs() {
  return `<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070b22"/>
      <stop offset="0.36" stop-color="#151a3e"/>
      <stop offset="0.62" stop-color="#332248"/>
      <stop offset="0.82" stop-color="#572f44"/>
      <stop offset="1" stop-color="#7a4144"/>
    </linearGradient>

    <linearGradient id="sky-harbour" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#050d24"/>
      <stop offset="0.4" stop-color="#102340"/>
      <stop offset="0.7" stop-color="#263a52"/>
      <stop offset="1" stop-color="#4a4656"/>
    </linearGradient>

    <linearGradient id="sky-tea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#090c22"/>
      <stop offset="0.38" stop-color="#1c1738"/>
      <stop offset="0.68" stop-color="#3f2540"/>
      <stop offset="1" stop-color="#703b3d"/>
    </linearGradient>

    <radialGradient id="city-glow" cx="0.5" cy="1" r="0.8">
      <stop offset="0" stop-color="#ff9a4d" stop-opacity="0.4"/>
      <stop offset="0.55" stop-color="#e2603f" stop-opacity="0.12"/>
      <stop offset="1" stop-color="#e2603f" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="moon-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffeec6" stop-opacity="0.5"/>
      <stop offset="0.45" stop-color="#ffd9a0" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="lantern-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffcf8a" stop-opacity="0.62"/>
      <stop offset="0.5" stop-color="#ff9a4d" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#ff7a3a" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="pool-warm" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffb469" stop-opacity="0.3"/>
      <stop offset="0.6" stop-color="#ff8a4c" stop-opacity="0.09"/>
      <stop offset="1" stop-color="#ff8a4c" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="street" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#35283c"/>
      <stop offset="0.45" stop-color="#2b2133"/>
      <stop offset="1" stop-color="#191124"/>
    </linearGradient>

    <linearGradient id="street-harbour" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b3546"/>
      <stop offset="0.5" stop-color="#212a3b"/>
      <stop offset="1" stop-color="#141826"/>
    </linearGradient>

    <linearGradient id="street-tea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#372a3d"/>
      <stop offset="0.5" stop-color="#2b2132"/>
      <stop offset="1" stop-color="#181020"/>
    </linearGradient>

    <linearGradient id="ice" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="#b9d6d8"/>
      <stop offset="0.5" stop-color="#8fb6bd"/>
      <stop offset="1" stop-color="#5f8b99"/>
    </linearGradient>

    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#553a36"/>
      <stop offset="0.5" stop-color="#3f2a2c"/>
      <stop offset="1" stop-color="#2a1a20"/>
    </linearGradient>

    <linearGradient id="wood-warm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a4a37"/>
      <stop offset="0.55" stop-color="#57332a"/>
      <stop offset="1" stop-color="#37201d"/>
    </linearGradient>

    <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff2d4"/>
      <stop offset="0.55" stop-color="#f4d9a8"/>
      <stop offset="1" stop-color="#d9a97a"/>
    </linearGradient>

    <linearGradient id="puddle" x1="0" y1="0" x2="0.7" y2="1">
      <stop offset="0" stop-color="#3b4b63" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#1b2233" stop-opacity="0.9"/>
    </linearGradient>

    <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a2b3d"/>
      <stop offset="1" stop-color="#1d1628"/>
    </linearGradient>

    <pattern id="stripe-warm" width="26" height="10" patternUnits="userSpaceOnUse">
      <rect width="26" height="10" fill="#e8c79a"/>
      <rect width="13" height="10" fill="#b6533f"/>
    </pattern>

    <pattern id="stripe-sea" width="24" height="10" patternUnits="userSpaceOnUse">
      <rect width="24" height="10" fill="#d9d2ba"/>
      <rect width="12" height="10" fill="#3f7d7a"/>
    </pattern>

    <pattern id="stripe-plum" width="22" height="9" patternUnits="userSpaceOnUse">
      <rect width="22" height="9" fill="#e6cfae"/>
      <rect width="11" height="9" fill="#6c3b57"/>
    </pattern>

    <pattern id="tiles" width="16" height="9" patternUnits="userSpaceOnUse">
      <rect width="16" height="9" fill="#2a1f30"/>
      <path d="M0 8 Q4 4 8 8 T16 8" fill="none" stroke="#463253" stroke-width="1.1"/>
    </pattern>

    <pattern id="tiles-harbour" width="15" height="8" patternUnits="userSpaceOnUse">
      <rect width="15" height="8" fill="#1e2735"/>
      <path d="M0 7 Q3.7 3.6 7.5 7 T15 7" fill="none" stroke="#38465a" stroke-width="1"/>
    </pattern>

    <pattern id="lattice" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="#ffbf7a" fill-opacity="0.12"/>
      <path d="M14 0 L0 14 M0 0 L14 14" stroke="#2a1b22" stroke-width="2.4"/>
      <path d="M0 0 H14 V14 H0 Z" fill="none" stroke="#2a1b22" stroke-width="1.4"/>
    </pattern>

    <pattern id="lattice-diamond" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect width="16" height="16" fill="#ffbf7a" fill-opacity="0.12"/>
      <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="none" stroke="#2a1b22" stroke-width="2"/>
      <path d="M0 0 H16 V16 H0 Z" fill="none" stroke="#2a1b22" stroke-width="1.2"/>
    </pattern>

    <pattern id="crate-stencil" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="none"/>
      <path d="M4 4 H16 M10 4 V16" stroke="#ffffff18" stroke-width="1"/>
    </pattern>

    <filter id="blur-3" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="blur-7" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="blur-14" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="soft-shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#05060e" flood-opacity="0.55"/>
    </filter>
  </defs>`;
}
