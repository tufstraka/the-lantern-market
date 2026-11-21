// The frame around the pictures: scene name, found counter, sand timer,
// hint stock and the quiet line of feedback under the board.

export class Hud {
  constructor(root = document) {
    this.root = root;
    this.sceneIndex = root.getElementById('scene-index');
    this.sceneName = root.getElementById('scene-name');
    this.foundCount = root.getElementById('found-count');
    this.pips = root.getElementById('found-pips');
    this.foundChip = this.foundCount?.closest('.found-chip');
    this.timerChip = root.getElementById('timer-chip');
    this.timerText = root.getElementById('timer-text');
    this.timerFill = root.getElementById('timer-fill');
    this.hintButton = root.getElementById('hint-button');
    this.hintCount = root.getElementById('hint-count');
    this.soundButton = root.getElementById('sound-button');
    this.toastLine = root.getElementById('toast');
    this.coach = root.getElementById('coach');
    this.track = root.getElementById('scene-track');
    this.trackItems = [];
    this.pipNodes = [];
    this.toastTimer = null;
  }

  setTrack(scenes) {
    if (!this.track) return;
    this.track.replaceChildren();
    this.trackItems = scenes.map((scene, i) => {
      const item = document.createElement('li');
      item.innerHTML = `<b>${i + 1}</b><span>${scene.name}</span><span class="track-pips">${scene.hotspots
        .map(() => '<i></i>')
        .join('')}</span>`;
      this.track.appendChild(item);
      return item;
    });
  }

  updateTrack(scenes, activeIndex) {
    this.trackItems.forEach((item, i) => {
      const scene = scenes[i];
      const found = scene.spots.filter((spot) => spot.found).length;
      const done = found === scene.spots.length;
      item.classList.toggle('active', i === activeIndex);
      item.classList.toggle('done', done);
      item.querySelectorAll('.track-pips i').forEach((pip, p) => pip.classList.toggle('on', p < found));
    });
  }

  setScene(scene, index, total) {
    if (this.sceneIndex) this.sceneIndex.textContent = `Scene ${index + 1} of ${total}`;
    if (this.sceneName) this.sceneName.textContent = scene.name;
    this.buildPips(scene.spots.length);
    if (this.coach) this.coach.textContent = scene.flavour;
  }

  buildPips(count) {
    if (!this.pips) return;
    this.pips.replaceChildren();
    this.pipNodes = [];
    for (let i = 0; i < count; i += 1) {
      const pip = document.createElement('i');
      this.pips.appendChild(pip);
      this.pipNodes.push(pip);
    }
  }

  setFound(found, total) {
    if (this.foundCount) this.foundCount.textContent = `${found} / ${total} found`;
    this.pipNodes.forEach((pip, i) => pip.classList.toggle('on', i < found));
  }

  popFound() {
    if (!this.foundChip) return;
    this.foundChip.classList.remove('pulse');
    void this.foundChip.offsetWidth;
    this.foundChip.classList.add('pulse');
  }

  setTime(seconds, total) {
    const clamped = Math.max(0, seconds);
    const whole = Math.ceil(clamped);
    if (this.timerText) {
      const m = Math.floor(whole / 60);
      const s = whole % 60;
      this.timerText.textContent = `${m}:${String(s).padStart(2, '0')}`;
    }
    if (this.timerFill) {
      this.timerFill.style.transform = `scaleX(${Math.max(0, Math.min(1, clamped / total))})`;
    }
    if (this.timerChip) this.timerChip.classList.toggle('urgent', clamped <= 30);
  }

  setHints(left) {
    if (this.hintCount) this.hintCount.textContent = String(left);
    if (this.hintButton) {
      this.hintButton.disabled = left <= 0;
      this.hintButton.classList.toggle('empty', left <= 0);
    }
  }

  flashHint() {
    if (!this.hintButton) return;
    this.hintButton.classList.remove('flash');
    void this.hintButton.offsetWidth;
    this.hintButton.classList.add('flash');
  }

  setMuted(muted) {
    if (this.soundButton) this.soundButton.setAttribute('aria-pressed', String(muted));
  }

  toast(text, { quiet = false, hold = 2600 } = {}) {
    if (!this.toastLine) return;
    window.clearTimeout(this.toastTimer);
    this.toastLine.textContent = text;
    this.toastLine.classList.toggle('quiet', quiet);
    if (text) {
      this.toastTimer = window.setTimeout(() => {
        this.toastLine.textContent = '';
      }, hold);
    }
  }
}
