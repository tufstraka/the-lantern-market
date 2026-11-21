// The cards that open before, between and after the hunts. Each returns markup
// with data-action buttons that main.js wires up; the primary action always
// answers to Enter.

const fmt = (seconds) => {
  const whole = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
};

export function startScreen(scenes) {
  const sceneList = scenes
    .map((scene, i) => `<div><b>${i + 1}. ${scene.name}</b>Ten differences · ${fmt(scene.seconds)}</div>`)
    .join('');
  return {
    action: 'begin',
    html: `
      <p class="overlay-eyebrow">make.fun · a night-market hunt</p>
      <h2 id="overlay-title">The Lantern Market</h2>
      <p>Two copies of the same lantern-lit street, painted side by side. Something in the second copy has been changed — ten times in each of three scenes. Click the spot where the pictures part ways.</p>
      <div class="overlay-list">${sceneList}</div>
      <div class="overlay-stats">
        <div class="stat"><span>Scenes</span><strong>${scenes.length}</strong></div>
        <div class="stat"><span>Differences</span><strong>${scenes.reduce((n, s) => n + s.hotspots.length, 0)}</strong></div>
        <div class="stat"><span>Hints each</span><strong>3</strong></div>
        <div class="stat"><span>Clock each</span><strong>${fmt(scenes[0].seconds)}</strong></div>
      </div>
      <p class="start-keys">In play: <kbd>H</kbd> hint · <kbd>R</kbd> restart · <kbd>M</kbd> sound. <kbd>Enter</kbd> starts.</p>
      <div class="overlay-actions">
        <button class="primary" type="button" data-action="begin">Open the market<kbd>Enter</kbd></button>
      </div>`,
  };
}

export function clearScreen({ scene, index, total, timeLeft, hintsLeft, misses }) {
  const last = index + 1 >= total;
  return {
    action: 'next',
    html: `
      <p class="overlay-eyebrow">scene ${index + 1} of ${total} · all ten found</p>
      <h2 id="overlay-title">${scene.name} is accounted for</h2>
      <p>Every changed lantern, tail and tile has been marked. The market keeps its lights on for the next row.</p>
      <div class="overlay-stats">
        <div class="stat"><span>Found</span><strong>${scene.hotspots.length} / ${scene.hotspots.length}</strong></div>
        <div class="stat"><span>Time left</span><strong>${fmt(timeLeft)}</strong></div>
        <div class="stat"><span>Hints left</span><strong>${hintsLeft}</strong></div>
        <div class="stat"><span>Wrong clicks</span><strong>${misses}</strong></div>
      </div>
      <div class="overlay-scenes">
        ${Array.from({ length: total }, (_, i) => `<span class="${i <= index ? 'done' : ''}">${i + 1}</span>`).join('')}
      </div>
      <div class="overlay-actions">
        <button class="primary" type="button" data-action="next">${last ? 'See the night’s tally' : 'Next scene'}<kbd>Enter</kbd></button>
        <button class="ghost" type="button" data-action="replay">Walk it again<kbd>R</kbd></button>
      </div>`,
  };
}

export function completeScreen({ scenes, totalFound, hintsUsed, misses }) {
  const perfect = hintsUsed === 0 ? ' · not a single hint' : '';
  const confetti = Array.from({ length: 26 }, (_, i) => {
    const left = 6 + Math.random() * 88;
    const delay = Math.random() * 1.6;
    const dur = 2.2 + Math.random() * 1.8;
    const dx = (Math.random() * 2 - 1) * 90;
    const colours = ['#ffcf8a', '#e2603f', '#6fc2b8', '#f6e7c8', '#b6533f'];
    return `<i style="left:${left.toFixed(1)}%;--dx:${dx.toFixed(0)}px;background:${colours[i % colours.length]};animation-delay:${delay.toFixed(2)}s;animation-duration:${dur.toFixed(2)}s"></i>`;
  }).join('');
  return {
    action: 'again',
    html: `
      <div class="confetti">${confetti}</div>
      <p class="overlay-eyebrow">all three scenes · the market is lit</p>
      <h2 id="overlay-title">Thirty differences, all found</h2>
      <p>Lantern Row, the Fish Market and the Tea House have given up every secret they had. The lanterns burn a little brighter for it${perfect}.</p>
      <div class="overlay-stats">
        <div class="stat"><span>Found</span><strong>${totalFound} / 30</strong></div>
        <div class="stat"><span>Hints spent</span><strong>${hintsUsed}</strong></div>
        <div class="stat"><span>Wrong clicks</span><strong>${misses}</strong></div>
      </div>
      <div class="overlay-scenes">
        ${scenes.map((scene) => `<span class="done">${scene.name}</span>`).join('')}
      </div>
      <div class="overlay-actions">
        <button class="primary" type="button" data-action="again">Walk the market again<kbd>Enter</kbd></button>
      </div>`,
  };
}

export function failScreen({ scene, found, totalFound, total }) {
  return {
    action: 'retry',
    html: `
      <p class="overlay-eyebrow">the lanterns dim</p>
      <h2 id="overlay-title">Time ran out on ${scene.name}</h2>
      <p>The market closes one stall at a time. You marked ${found} of ${scene.hotspots.length} here — ${totalFound} of ${total} across the night. Take a breath and walk the row again.</p>
      <div class="overlay-stats">
        <div class="stat"><span>This scene</span><strong>${found} / ${scene.hotspots.length}</strong></div>
        <div class="stat"><span>Whole night</span><strong>${totalFound} / ${total}</strong></div>
      </div>
      <div class="overlay-actions">
        <button class="primary" type="button" data-action="retry">Relight the scene<kbd>Enter</kbd></button>
      </div>`,
  };
}
