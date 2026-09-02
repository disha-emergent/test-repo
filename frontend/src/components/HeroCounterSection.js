import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, RotateCcw } from "lucide-react";

const LINES = ["EVERY CLICK IS", "A SMALL ACT", "OF FAITH."];

function VelocityMeter({ clicks }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);
  const cps = clicks.filter((t) => now - t < 1000).length;
  const pct = Math.min(100, (cps / 12) * 100);
  return (
    <div data-testid="click-velocity-meter" className="flex items-center gap-3">
      <span className="font-mono-s text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">Velocity</span>
      <div className="w-28 h-[3px] bg-[var(--line)] overflow-hidden">
        <div className="h-full bg-[var(--accent)] transition-[width] duration-200" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono-s text-xs text-[var(--ink)]">{cps}/s</span>
    </div>
  );
}

export default function HeroCounterSection({ count, clicks, onIncrement, onReset }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fit = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    fit();
    window.addEventListener("resize", fit);
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => p.life > 0);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12 * devicePixelRatio;
        p.life -= 0.018;
        p.rot += p.spin;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", fit);
    };
  }, []);

  const burst = (clientX, clientY, n = 22) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) * devicePixelRatio;
    const y = (clientY - rect.top) * devicePixelRatio;
    const colors = ["#FF3E20", "#0D0D0D", "#3B4CCA", "#8C8780"];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = (2 + Math.random() * 6) * devicePixelRatio;
      particles.current.push({
        x, y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 2 * devicePixelRatio,
        size: (3 + Math.random() * 6) * devicePixelRatio,
        rot: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.3,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  const press = (n) => (e) => {
    onIncrement(n);
    burst(e.clientX, e.clientY, n > 1 ? 40 : 22);
  };

  const ghostBtn =
    "px-5 py-3 border border-[var(--line)] font-mono-s text-xs uppercase tracking-[0.2em] text-[var(--ink2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200";

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16" data-testid="hero-section">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-mono-s text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[var(--accent)] mb-6"
        >
          01 — The Primal Act
        </motion.p>

        <h1 className="font-display font-black tracking-tighter leading-[0.95] text-[var(--ink)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-10">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 2 ? (
                  <>
                    OF <span className="text-[var(--accent)]">FAITH.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md text-sm sm:text-base leading-relaxed text-[var(--ink2)] mb-14"
        >
          A button. A number. Nothing is saved, nothing is remembered — the count lives only while you do.
          Press it and watch a fleeting thing exist.
        </motion.p>

        <div className="flex flex-col items-start gap-8">
          <motion.div
            key={count}
            data-testid="counter-live-display"
            initial={{ scale: 0.9, y: 18, opacity: 0.5 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className="font-mono-s font-bold leading-none tracking-tighter text-[var(--ink)] select-none text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem]"
          >
            {count}
          </motion.div>

          <VelocityMeter clicks={clicks} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3"
          >
            <motion.button
              data-testid="counter-increment-button"
              onPointerDown={press(1)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.93, y: 3 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="group relative flex items-center gap-3 px-10 sm:px-14 py-5 sm:py-6 bg-[var(--accent)] text-white font-display font-extrabold text-lg sm:text-2xl tracking-tight uppercase shadow-[0_20px_60px_-15px_var(--glow)]"
            >
              Increment
              <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={26} />
            </motion.button>
            <button data-testid="counter-add-10-button" onPointerDown={press(10)} className={ghostBtn}>+10</button>
            <button data-testid="counter-add-100-button" onPointerDown={press(100)} className={ghostBtn}>+100</button>
            <button data-testid="hero-reset-button" onClick={onReset} className={`${ghostBtn} flex items-center gap-2`}>
              <RotateCcw size={13} /> Reset
            </button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono-s text-[9px] uppercase tracking-[0.35em] text-[var(--muted2)]">Scroll</span>
        <motion.span
          className="w-px h-10 bg-[var(--muted2)]"
          animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
