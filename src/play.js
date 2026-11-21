// The rules of the hunt: which scene is open, what has been found, how much
// sand is left, and the three hints a careful eye can spend per scene.

export class Hunt {
  constructor({ scenes, emit = () => {} }) {
    this.scenes = scenes.map((scene) => ({
      ...scene,
      spots: scene.hotspots.map((hotspot) => ({ ...hotspot, found: false })),
      hintsLeft: 3,
      time: scene.seconds,
      misses: 0,
    }));
    this.emit = emit;
    this.index = 0;
    this.status = 'idle';
    this.lastTick = null;
    this.totalMisses = 0;
    this.totalHints = 0;
  }

  get scene() {
    return this.scenes[this.index];
  }

  get foundCount() {
    return this.scene.spots.filter((spot) => spot.found).length;
  }

  get totalFound() {
    return this.scenes.reduce((sum, scene) => sum + scene.spots.filter((spot) => spot.found).length, 0);
  }

  get remaining() {
    return this.scene.spots.length - this.foundCount;
  }

  get allDone() {
    return this.scenes.every((scene) => scene.spots.every((spot) => spot.found));
  }

  reset() {
    this.index = 0;
    this.totalMisses = 0;
    this.totalHints = 0;
    this.scenes.forEach((scene) => {
      scene.spots.forEach((spot) => { spot.found = false; });
      scene.hintsLeft = 3;
      scene.time = scene.seconds;
      scene.misses = 0;
    });
    this.status = 'playing';
    this.lastTick = null;
    this.emit('scene', this.scene);
    this.emit('update');
  }

  restartScene() {
    const scene = this.scene;
    scene.spots.forEach((spot) => { spot.found = false; });
    scene.hintsLeft = 3;
    scene.time = scene.seconds;
    scene.misses = 0;
    this.status = 'playing';
    this.lastTick = null;
    this.emit('scene', scene);
    this.emit('update');
  }

  startScene(index) {
    this.index = Math.max(0, Math.min(this.scenes.length - 1, index));
    const scene = this.scene;
    scene.spots.forEach((spot) => { spot.found = false; });
    scene.hintsLeft = 3;
    scene.time = scene.seconds;
    scene.misses = 0;
    this.status = 'playing';
    this.lastTick = null;
    this.emit('scene', scene);
    this.emit('update');
  }

  nextScene() {
    if (this.index + 1 >= this.scenes.length) {
      this.status = 'complete';
      this.emit('complete');
      return false;
    }
    this.startScene(this.index + 1);
    return true;
  }

  find(spotId) {
    if (this.status !== 'playing') return 'idle';
    const spot = this.scene.spots.find((candidate) => candidate.id === spotId);
    if (!spot) return 'unknown';
    if (spot.found) {
      this.emit('repeat', spot);
      return 'repeat';
    }
    spot.found = true;
    const number = this.foundCount;
    this.emit('found', { spot, number, scene: this.scene });
    if (this.remaining === 0) {
      this.status = 'clear';
      this.emit('clear', { scene: this.scene, lastOfScene: true });
      if (this.allDone) this.emit('complete', { scene: this.scene });
    }
    this.emit('update');
    return 'found';
  }

  miss(point) {
    if (this.status !== 'playing') return;
    this.scene.misses += 1;
    this.totalMisses += 1;
    this.scene.time = Math.max(0, this.scene.time - 3);
    this.emit('miss', { point, scene: this.scene });
    if (this.scene.time <= 0) {
      this.status = 'failed';
      this.emit('timeout', { scene: this.scene });
    }
    this.emit('update');
  }

  hint() {
    if (this.status !== 'playing') return null;
    const scene = this.scene;
    if (scene.hintsLeft <= 0) {
      this.emit('hint-empty');
      return null;
    }
    const candidates = scene.spots.filter((spot) => !spot.found);
    if (!candidates.length) return null;
    scene.hintsLeft -= 1;
    this.totalHints += 1;
    scene.time = Math.max(0, scene.time - 5);
    const spot = candidates[Math.floor(Math.random() * candidates.length)];
    this.emit('hint', { spot, scene });
    if (scene.time <= 0) {
      this.status = 'failed';
      this.emit('timeout', { scene });
    }
    this.emit('update');
    return spot;
  }

  update(dtMs) {
    if (this.status !== 'playing') return;
    const scene = this.scene;
    scene.time = Math.max(0, scene.time - dtMs / 1000);
    const whole = Math.ceil(scene.time);
    if (scene.time <= 10 && whole !== this.lastTick) {
      this.lastTick = whole;
      if (whole > 0) this.emit('tick', whole);
    }
    if (scene.time <= 0) {
      this.status = 'failed';
      this.emit('timeout', { scene });
    }
    this.emit('update');
  }

  // Used by the screenshot modes to pose a scene without playing it.
  pose(index, foundIds = [], time = null, hintsSpent = 0) {
    this.index = index;
    const scene = this.scene;
    scene.spots.forEach((spot) => { spot.found = foundIds.includes(spot.id); });
    scene.hintsLeft = 3 - hintsSpent;
    scene.time = time ?? scene.seconds;
    this.status = 'playing';
    this.emit('scene', scene);
    this.emit('update');
  }
}
