import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Spatial3DCanvas({ count }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const countRef = useRef(count);
  countRef.current = count;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    const N = 42;
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = phi * i;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }

    const fit = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    fit();
    window.addEventListener("resize", fit);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    };
    window.addEventListener("pointermove", onMove);

    const draw = () => {
      const speed = 0.004 + Math.min(countRef.current, 300) * 0.00005;
      t += speed;
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.32;
      const tiltX = mouse.current.y * 0.6;
      const tiltY = mouse.current.x * 0.6;
      const rotY = t + tiltY, rotX = t * 0.6 + tiltX;

      const proj = pts.map(([x, y, z]) => {
        const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
        const y1 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
        const s = 1 / (1 + z2 * 0.35);
        return [cx + x1 * R * s, cy + y1 * R * s, z2];
      });

      const dark = document.documentElement.classList.contains("dark");
      const line = dark ? "rgba(244,242,237,0.12)" : "rgba(13,13,13,0.12)";

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1], dz = pts[i][2] - pts[j][2];
          if (dx * dx + dy * dy + dz * dz < 0.55) {
            ctx.strokeStyle = line;
            ctx.lineWidth = devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(proj[i][0], proj[i][1]);
            ctx.lineTo(proj[j][0], proj[j][1]);
            ctx.stroke();
          }
        }
      }
      proj.forEach(([x, y], i) => {
        ctx.fillStyle = i % 7 === 0 ? "#FF3E20" : dark ? "rgba(244,242,237,0.5)" : "rgba(13,13,13,0.5)";
        const s = (i % 7 === 0 ? 5 : 3) * devicePixelRatio;
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section className="py-24 md:py-36" data-testid="spatial-canvas-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-s text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[var(--accent)] mb-4">06 — Spatial</p>
          <h2 className="font-display font-bold tracking-tight text-[var(--ink)] text-3xl sm:text-4xl md:text-5xl mb-6">
            The count has a body.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-[var(--ink2)] max-w-md">
            This geometry spins to your cursor — and the higher the count climbs, the faster it turns.
            Move your pointer across the field and feel the number take up space.
          </p>
        </motion.div>
        <motion.div
          className="lg:col-span-7 border border-[var(--line)] bg-[var(--card)]"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <canvas ref={canvasRef} className="w-full h-[380px] md:h-[460px] block" data-testid="spatial-3d-canvas" />
        </motion.div>
      </div>
    </section>
  );
}
