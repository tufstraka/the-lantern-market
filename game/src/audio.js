// Tiny WebAudio workshop: every sound is made at run time from two or three
// oscillators, so the market has a voice without shipping a single audio file.

const PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0, 987.77, 1046.5, 1174.66, 1318.51, 1567.98];

export class MarketChimes {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
  }

  unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.34;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return true;
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) this.master.gain.value = muted ? 0 : 0.34;
  }

  tone(freq, duration, { type = 'sine', gain = 0.2, delay = 0, glide = 0 } = {}) {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + glide), now + duration);
    env.gain.setValueAtTime(0.0001, now);
    env.gain.exponentialRampToValueAtTime(gain, now + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(env);
    env.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  noise(duration = 0.16, gain = 0.12) {
    if (!this.ctx || this.muted) return;
    const size = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, size, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < size; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / size) ** 2;
    }
    const src = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();
    filter.type = 'bandpass';
    filter.frequency.value = 420;
    env.gain.value = gain;
    src.buffer = buffer;
    src.connect(filter);
    filter.connect(env);
    env.connect(this.master);
    src.start();
  }

  start() {
    [392, 493.88, 587.33, 784].forEach((freq, i) => this.tone(freq, 1.5, { type: 'sine', gain: 0.075, delay: i * 0.09 }));
  }

  found(index) {
    const note = PENTATONIC[Math.min(index, PENTATONIC.length - 1)];
    this.tone(note, 0.5, { type: 'sine', gain: 0.2 });
    this.tone(note * 2, 0.34, { type: 'sine', gain: 0.07, delay: 0.035 });
    this.tone(note * 1.5, 0.6, { type: 'triangle', gain: 0.05, delay: 0.09 });
  }

  wrong() {
    this.tone(150, 0.16, { type: 'triangle', gain: 0.13, glide: -60 });
    this.noise(0.12, 0.07);
  }

  hint() {
    [659.25, 880, 1174.66].forEach((freq, i) => this.tone(freq, 0.7, { type: 'sine', gain: 0.09, delay: i * 0.1 }));
  }

  hintSpent() {
    this.tone(392, 0.5, { type: 'sine', gain: 0.1 });
    this.tone(523.25, 0.6, { type: 'sine', gain: 0.06, delay: 0.08 });
  }

  tick() {
    this.tone(1046.5, 0.06, { type: 'square', gain: 0.03 });
  }

  clear() {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => this.tone(freq, 1.1, { type: 'sine', gain: 0.11, delay: i * 0.12 }));
    this.tone(2093, 0.5, { type: 'sine', gain: 0.04, delay: 0.5 });
  }

  finish() {
    [392, 523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) => {
      this.tone(freq, 1.6, { type: 'sine', gain: 0.1, delay: i * 0.13 });
      this.tone(freq * 2, 0.9, { type: 'triangle', gain: 0.03, delay: i * 0.13 + 0.04 });
    });
  }

  fail() {
    [392, 349.23, 293.66, 196].forEach((freq, i) => this.tone(freq, 1.2, { type: 'sine', gain: 0.1, delay: i * 0.16 }));
    this.noise(0.5, 0.04);
  }
}
