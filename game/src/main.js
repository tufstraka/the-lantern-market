// Boot and wiring: paint the two panels, hand clicks to the hunt, keep the HUD
// honest, and answer the keys H (hint), R (restart) and Enter (the lit button).

import { Hunt } from './play.js';
import { Hud } from './hud.js';
import { MarketChimes } from './audio.js';
import { paintPanel, scenePoint, addFoundMarker, addHintRing, addMissMark, clearLayer, nearestHotspot, SCENE_W, SCENE_H } from './board.js';
import { startScreen, clearScreen, completeScreen, failScreen } from './screens.js';
import { scenes } from './scenes/index.js';

const panels = [
  { root: document.getElementById('panel-a'), svg: document.getElementById('svg-a') },
  { root: document.getElementById('panel-b'), svg: document.getElementById('svg-b') },
];
const overlay = document.getElementById('overlay');
const card = document.getElementById('overlay-card');
const hintButton = document.getElementById('hint-button');
const restartButton = document.getElementById('restart-button');
const soundButton = document.getElementById('sound-button');

const hud = new Hud(document);
hud.setTrack(scenes);
const chimes = new MarketChimes();

let overlayAction = null;
let hintTimer = null;
let overlayTimer = null;

const hunt = new Hunt({
  scenes,
  emit: (type, payload) => handleEvent(type, payload),
});

/* ------------------------------------------------------------------ painting */

function paintScene() {
  const scene = hunt.scene;
  panels.forEach((panel, i) => {
    paintPanel(panel.svg, scene, i === 0 ? 'a' : 'b');
    clearLayer(panel.svg, 'marker');
    clearLayer(panel.svg, 'hint');
    clearLayer(panel.svg, 'miss');
  });
  hud.setScene(scene, hunt.index, scenes.length);
  hud.setFound(hunt.foundCount, scene.spots.length);
  hud.setTime(scene.time, scene.seconds);
  hud.setHints(scene.hintsLeft);
}

function paintFoundMarkers() {
  const scene = hunt.scene;
  const found = scene.spots.filter((spot) => spot.found);
  panels.forEach((panel) => clearLayer(panel.svg, 'marker'));
  found.forEach((spot, i) => {
    panels.forEach((panel) => addFoundMarker(panel.svg, spot, i + 1));
  });
}

function pulseHint(spot) {
  window.clearTimeout(hintTimer);
  clearLayer(panels[0].svg, 'hint');
  clearLayer(panels[1].svg, 'hint');
  panels.forEach((panel) => {
    addHintRing(panel.svg, spot, 'here');
    panel.root.classList.add('hinting');
  });
  hintTimer = window.setTimeout(() => {
    panels.forEach((panel) => {
      panel.root.classList.remove('hinting');
      clearLayer(panel.svg, 'hint');
    });
  }, 3200);
}

/* -------------------------------------------------------------------- events */

function handleEvent(type, payload) {
  switch (type) {
    case 'scene':
      paintScene();
      hud.setScene(payload, hunt.index, scenes.length);
      hud.setFound(0, payload.spots.length);
      hud.updateTrack(hunt.scenes, hunt.index);
      hud.toast(`${payload.name} — ${payload.hotspots.length} differences`, { quiet: true, hold: 3200 });
      break;
    case 'update': {
      const scene = hunt.scene;
      hud.setFound(hunt.foundCount, scene.spots.length);
      hud.setTime(scene.time, scene.seconds);
      hud.setHints(scene.hintsLeft);
      hud.updateTrack(hunt.scenes, hunt.index);
      break;
    }
    case 'found': {
      const { spot, number, scene } = payload;
      paintFoundMarkers();
      hud.popFound();
      chimes.found(number - 1);
      panels.forEach((panel) => {
        panel.root.classList.remove('found');
        void panel.root.offsetWidth;
        panel.root.classList.add('found');
      });
      hud.toast(`${number} / ${scene.spots.length} — ${spot.label}`);
      break;
    }
    case 'repeat':
      hud.toast('Already ringed — that one is counted.', { quiet: true });
      break;
    case 'miss': {
      const { point } = payload;
      addMissMark(panels[0].svg, point.x, point.y);
      addMissMark(panels[1].svg, point.x, point.y);
      panels.forEach((panel) => {
        panel.root.classList.remove('shake');
        void panel.root.offsetWidth;
        panel.root.classList.add('shake');
      });
      chimes.wrong();
      hud.toast('Not there — three seconds for the trouble.', { quiet: true, hold: 1800 });
      break;
    }
    case 'hint': {
      pulseHint(payload.spot);
      chimes.hint();
      hud.flashHint();
      hud.toast('A hint glows on both copies — five seconds spent.');
      break;
    }
    case 'hint-empty':
      hud.toast('No hints left in this scene — trust your eye.', { quiet: true });
      break;
    case 'tick':
      chimes.tick();
      break;
    case 'clear': {
      chimes.clear();
      window.clearTimeout(overlayTimer);
      overlayTimer = window.setTimeout(() => {
        if (hunt.status !== 'clear' || hunt.allDone) return;
        showOverlay(clearScreen({
          scene: hunt.scene,
          index: hunt.index,
          total: scenes.length,
          timeLeft: hunt.scene.time,
          hintsLeft: hunt.scene.hintsLeft,
          misses: hunt.scene.misses,
        }));
      }, 950);
      break;
    }
    case 'complete': {
      chimes.finish();
      window.clearTimeout(overlayTimer);
      overlayTimer = window.setTimeout(() => {
        showOverlay(completeScreen({
          scenes,
          totalFound: hunt.totalFound,
          hintsUsed: hunt.totalHints,
          misses: hunt.totalMisses,
        }));
      }, 1100);
      break;
    }
    case 'timeout': {
      chimes.fail();
      showOverlay(failScreen({
        scene: hunt.scene,
        found: hunt.foundCount,
        totalFound: hunt.totalFound,
        total: scenes.reduce((n, scene) => n + scene.spots.length, 0),
      }));
      break;
    }
    default:
      break;
  }
}

/* ------------------------------------------------------------------- overlay */

function showOverlay({ html, action }) {
  card.innerHTML = html;
  overlayAction = action;
  overlay.hidden = false;
  const primary = card.querySelector('.primary');
  if (primary) window.setTimeout(() => primary.focus({ preventScroll: true }), 30);
}

function hideOverlay() {
  overlay.hidden = true;
  overlayAction = null;
}

function runOverlayAction(action) {
  chimes.unlock();
  switch (action) {
    case 'begin':
      hideOverlay();
      hunt.reset();
      chimes.start();
      hud.toast('Click where the two pictures differ.');
      break;
    case 'next':
      hideOverlay();
      if (!hunt.nextScene()) {
        showOverlay(completeScreen({ scenes, totalFound: hunt.totalFound, hintsUsed: hunt.totalHints, misses: hunt.totalMisses }));
      }
      break;
    case 'retry':
    case 'replay':
      hideOverlay();
      hunt.restartScene();
      hud.toast('A fresh pair of eyes, then.');
      break;
    case 'again':
      hideOverlay();
      hunt.reset();
      chimes.start();
      break;
    default:
      break;
  }
}

overlay.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (button) runOverlayAction(button.dataset.action);
});

overlay.addEventListener('click', (event) => {
  if (event.target === overlay && overlayAction) hideOverlay();
});

/* ------------------------------------------------------------------- pointer */

panels.forEach((panel) => {
  const svg = panel.svg;
  svg.addEventListener('click', (event) => {
    chimes.unlock();
    if (overlay.hidden === false) return;
    if (hunt.status !== 'playing') return;
    const point = scenePoint(svg, event);
    const spot = nearestHotspot(hunt.scene, point);
    if (spot) {
      hunt.find(spot.id);
    } else {
      hunt.miss(point);
    }
  });
  svg.addEventListener('pointermove', (event) => {
    if (hunt.status !== 'playing') return;
    panel.root.classList.toggle('hot', Boolean(nearestHotspot(hunt.scene, scenePoint(svg, event))));
  });
  svg.addEventListener('pointerleave', () => panel.root.classList.remove('hot'));
  svg.addEventListener('pointerdown', () => chimes.unlock(), { once: true });
});

/* -------------------------------------------------------------------- chrome */

hintButton?.addEventListener('click', () => {
  chimes.unlock();
  if (overlay.hidden === false) return;
  hunt.hint();
});

restartButton?.addEventListener('click', () => {
  chimes.unlock();
  if (hunt.status === 'idle') return;
  hideOverlay();
  hunt.restartScene();
  hud.toast('Scene restarted — the clock is full again.', { quiet: true });
});

soundButton?.addEventListener('click', () => {
  chimes.unlock();
  chimes.setMuted(!chimes.muted);
  hud.setMuted(chimes.muted);
  hud.toast(chimes.muted ? 'Sound off.' : 'Sound on.', { quiet: true, hold: 1400 });
});

window.addEventListener('keydown', (event) => {
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  const key = event.key.toLowerCase();
  if (key === 'enter') {
    const primary = card.querySelector('.primary');
    if (!overlay.hidden && primary) {
      event.preventDefault();
      runOverlayAction(overlayAction);
    } else if (hunt.status === 'idle') {
      event.preventDefault();
      runOverlayAction('begin');
    }
    return;
  }
  if (key === 'h') {
    event.preventDefault();
    chimes.unlock();
    if (!overlay.hidden) return;
    hunt.hint();
    return;
  }
  if (key === 'r') {
    event.preventDefault();
    chimes.unlock();
    if (hunt.status === 'idle') return;
    hideOverlay();
    hunt.restartScene();
    hud.toast('Scene restarted — the clock is full again.', { quiet: true });
    return;
  }
  if (key === 'm') {
    chimes.unlock();
    chimes.setMuted(!chimes.muted);
    hud.setMuted(chimes.muted);
  }
});

/* --------------------------------------------------------------------- clock */

let last = performance.now();
function frame(now) {
  const dt = Math.min(120, now - last);
  last = now;
  if (overlay.hidden) hunt.update(dt);
  requestAnimationFrame(frame);
}

/* ------------------------------------------------------------ screenshot modes */

function poseShot(mode) {
  if (mode !== 'complete' && mode !== 'start') document.body.classList.add('shot');
  const pick = (ids) => ids;
  if (mode === 'start') {
    paintScene();
    showOverlay(startScreen(scenes));
    return;
  }
  if (mode === 'cover') {
    hunt.pose(0, pick(['lantern', 'sign', 'cat', 'window', 'wheel']), 93, 1);
    paintScene();
    paintFoundMarkers();
    hud.setFound(5, 10);
    hud.updateTrack(hunt.scenes, hunt.index);
    hud.setTime(93, 120);
    hud.setHints(2);
    hud.toast('Five found, five still hiding.', { quiet: true, hold: 900000 });
    return;
  }
  if (mode === 'play') {
    hunt.pose(1, pick(['fish', 'scale', 'stamp']), 104, 0);
    paintScene();
    paintFoundMarkers();
    hud.setFound(3, 10);
    hud.updateTrack(hunt.scenes, hunt.index);
    hud.setTime(104, 120);
    hud.setHints(3);
    hud.toast('Three down. The ice keeps its secrets.', { quiet: true, hold: 900000 });
    const hinted = hunt.scene.spots.find((spot) => !spot.found);
    if (hinted) pulseHint(hinted);
    return;
  }
  if (mode === 'found') {
    hunt.pose(2, pick(['lattice', 'steam', 'teapot', 'umbrella', 'tassel', 'flowers']), 18, 2);
    paintScene();
    paintFoundMarkers();
    hud.setFound(6, 10);
    hud.updateTrack(hunt.scenes, hunt.index);
    hud.setTime(18, 120);
    hud.setHints(1);
    hud.toast('Six found — the tea house is nearly read.', { quiet: true, hold: 900000 });
    const hinted = hunt.scene.spots.find((spot) => !spot.found);
    if (hinted) pulseHint(hinted);
    return;
  }
  if (mode === 'complete') {
    const scene = scenes[2];
    hunt.pose(2, scene.hotspots.map((spot) => spot.id), 27, 1);
    paintScene();
    paintFoundMarkers();
    hud.setFound(10, 10);
    hud.updateTrack(hunt.scenes, hunt.index);
    hud.setTime(27, 120);
    hud.setHints(2);
    showOverlay(completeScreen({ scenes, totalFound: 30, hintsUsed: 2, misses: 3 }));
  }
}

const mode = new URLSearchParams(window.location.search).get('shot');
if (mode) {
  poseShot(mode);
} else {
  paintScene();
  showOverlay(startScreen(scenes));
}

window.__lanternMarket = {
  hunt,
  scenes,
  panels,
  warning: `scene is ${SCENE_W}x${SCENE_H}`,
};
window.__shotReady = true;
requestAnimationFrame(frame);
