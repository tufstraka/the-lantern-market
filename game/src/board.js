// Painting and marking the two panels: the scene SVG, found rings that appear
// on both pictures, the hint pulse and the little cross of a wrong click.

import { svgDefs } from './art/defs.js';

export const SCENE_W = 620;
export const SCENE_H = 470;

export function paintPanel(svg, scene, variant) {
  svg.innerHTML = `${svgDefs()}
    <g class="scene-art">${scene.render(variant)}</g>
    <g class="hint-layer"></g>
    <g class="marker-layer"></g>
    <g class="miss-layer"></g>`;
  if (svg.innerHTML.includes('undefined') || svg.innerHTML.includes('NaN')) {
    console.error(`paintPanel: bad markup in ${scene.id}/${variant}`);
  }
  return svg;
}

export function scenePoint(svg, event) {
  const box = svg.getBoundingClientRect();
  return {
    x: ((event.clientX - box.left) / box.width) * SCENE_W,
    y: ((event.clientY - box.top) / box.height) * SCENE_H,
  };
}

function layer(svg, name) {
  let node = svg.querySelector(`.${name}-layer`);
  if (!node) {
    node = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    node.setAttribute('class', `${name}-layer`);
    svg.appendChild(node);
  }
  return node;
}

export function markerRadius(hotspot) {
  return Math.max(15, Math.min(27, Math.max(hotspot.w, hotspot.h) / 2 + 2));
}

export function addFoundMarker(svg, hotspot, number) {
  const cx = hotspot.x + hotspot.w / 2;
  const cy = hotspot.y + hotspot.h / 2;
  const r = markerRadius(hotspot);
  const badgeX = cx + r * 0.78;
  const badgeY = cy - r * 0.78;
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('class', 'marker');
  group.dataset.id = hotspot.id;
  group.innerHTML = `
    <circle class="ring-soft" cx="${cx}" cy="${cy}" r="${r + 4}"/>
    <circle class="ring" cx="${cx}" cy="${cy}" r="${r}"/>
    <circle cx="${cx}" cy="${cy}" r="2.2" fill="#ffcf8a"/>
    <path class="tick" d="M${cx - 4} ${cy + 0.5} l3 3.4 l5.4 -6.4" transform="translate(0 0)" opacity="0"/>
    <g>
      <circle class="badge" cx="${badgeX}" cy="${badgeY}" r="7.8"/>
      <text class="badge-text" x="${badgeX}" y="${badgeY + 0.4}">${number}</text>
    </g>`;
  layer(svg, 'marker').appendChild(group);
  return group;
}

export function addHintRing(svg, hotspot, label = 'hint') {
  const cx = hotspot.x + hotspot.w / 2;
  const cy = hotspot.y + hotspot.h / 2;
  const r = markerRadius(hotspot) + 7;
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('class', 'hint-ring');
  group.innerHTML = `
    <circle cx="${cx}" cy="${cy}" r="${r}"/>
    <circle cx="${cx}" cy="${cy}" r="${Math.max(3, r * 0.12)}" fill="#9fe6da" opacity=".7"/>
    <text x="${cx}" y="${cy + r + 13}">${label}</text>`;
  layer(svg, 'hint').appendChild(group);
  return group;
}

export function addMissMark(svg, x, y) {
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('class', 'miss-mark');
  group.innerHTML = `
    <circle class="spark" cx="${x}" cy="${y}" r="12" fill="none" stroke="#ffe0ad" stroke-width="1.6"/>
    <line x1="${x - 7}" y1="${y - 7}" x2="${x + 7}" y2="${y + 7}"/>
    <line x1="${x + 7}" y1="${y - 7}" x2="${x - 7}" y2="${y + 7}"/>`;
  const host = layer(svg, 'miss');
  host.appendChild(group);
  window.setTimeout(() => group.remove(), 760);
  return group;
}

export function clearLayer(svg, name) {
  const node = svg.querySelector(`.${name}-layer`);
  if (node) node.replaceChildren();
}

export function nearestHotspot(scene, point) {
  let best = null;
  let bestScore = Infinity;
  scene.hotspots.forEach((hotspot) => {
    const pad = 10;
    if (
      point.x >= hotspot.x - pad &&
      point.x <= hotspot.x + hotspot.w + pad &&
      point.y >= hotspot.y - pad &&
      point.y <= hotspot.y + hotspot.h + pad
    ) {
      const cx = hotspot.x + hotspot.w / 2;
      const cy = hotspot.y + hotspot.h / 2;
      const score = Math.hypot(point.x - cx, point.y - cy);
      if (score < bestScore) {
        bestScore = score;
        best = hotspot;
      }
    }
  });
  return best;
}
