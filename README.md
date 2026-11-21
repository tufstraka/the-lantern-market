# The Lantern Market

A spot-the-difference game set in a hand-painted night market, played in a desktop
browser. Two near-identical copies of the same illustrated street sit side by side;
ten quiet differences hide in each of three scenes. Click either copy where the
pictures part ways, and both are ringed at once.

Everything is drawn at run time with inline SVG — lanterns, roofs, ice slabs, a cat,
a bicycle, a teapot and a moon with a memory — so the game ships no images, no fonts
and no library. Sound is a small WebAudio workshop of oscillators, and the whole
thing runs from three static files' worth of modules.

## Play

Live at **https://tufstraka.github.io/the-lantern-market/**

```sh
node serve.ts          # serves game/ at http://localhost:8080
```

Or open `game/index.html` through any static server. The game is played with the
mouse and the keyboard:

| Input | Action |
| --- | --- |
| Click / tap either panel | Mark a difference (or take a wrong-click penalty) |
| `H` or the Hint button | Pulse a hint on both copies; three per scene, five seconds each |
| `R` or the ↺ button | Restart the scene with a full clock |
| `M` | Mute or unmute the sound |
| `Enter` | Press the lit button on any card |

Three scenes, ten differences each, two minutes per scene: **Lantern Row**, **The Fish
Market** and **The Tea House**. A wrong click shakes the frame and costs three seconds;
a find rings the same spot in both panels, stamps a numbered marker, and plays a note
from a pentatonic scale that climbs as the scene fills up. Clear all thirty to see the
night's tally.

## Hand-in

`main.ts` copies `game/` and `screenshots/` to `/output` (or `MAKEFUN_OUTPUT_DIR`) and
writes `dossier.json` with the kit's `buildDossier`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Two runs produce a byte-identical dossier. `screenshots/` holds four 1280×800 JPEGs
taken from the running game with headless Chrome; `shots.json` records the query each
one was posed with.

## Where things live

```
game/
  index.html            the frame: title bar, two panels, tray, overlay
  styles.css            night palette, HUD, markers, overlays, motion
  src/main.js           boot, input, keyboard, scene changes, screenshot poses
  src/play.js           the rules: found sets, clock, hints, win and loss
  src/board.js          paints a panel, maps clicks, draws rings and misses
  src/hud.js            the counter, timer, hint stock and scene track
  src/screens.js        start, scene-clear, complete and time-out cards
  src/audio.js          oscillator chimes made at run time
  src/art/defs.js       gradients, tile and stripe patterns, glows
  src/art/common.js     seeded stars, moon, street, cobbles, skyline
  src/art/props.js      lanterns, stalls, cats, bicycles, fish, teapots, signs
  src/scenes/lantern-row.js   scene 1, its ten differences
  src/scenes/fish-market.js   scene 2
  src/scenes/tea-house.js     scene 3
  src/scenes/index.js         the night's running order
```

Each scene exports its hotspots — an id, a rectangle in scene coordinates and a line
of description — and a `render(variant)` that paints the same street twice, once with
the ten changes applied. The rules never touch the artwork; the artwork never touches
the clock.

## Licence

MIT. The scenes, names, sounds and glyphs are original to this entry.
