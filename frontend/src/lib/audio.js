let ctx;

const ac = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

const blip = (freq, dur, type = "triangle", gain = 0.18, slideTo = null) => {
  const c = ac();
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
};

export const playClick = () => blip(190, 0.09, "triangle", 0.22, 90);
export const playPop = () => blip(520, 0.14, "sine", 0.16, 880);
export const playChime = () => {
  blip(660, 0.35, "sine", 0.14);
  setTimeout(() => blip(990, 0.45, "sine", 0.12), 110);
};
