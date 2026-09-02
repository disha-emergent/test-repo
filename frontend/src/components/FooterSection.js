import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function FooterSection({ startedAt, onReset }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const age = Math.floor((now - startedAt) / 1000);

  return (
    <footer className="border-t border-[var(--line)] pt-20 pb-10 overflow-hidden" data-testid="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
          <div className="flex items-center gap-2 font-mono-s text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
            Session live — {Math.floor(age / 60)}:{String(age % 60).padStart(2, "0")}
          </div>
          <button
            data-testid="footer-reset-button"
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-3 border border-[var(--line)] font-mono-s text-xs uppercase tracking-[0.2em] text-[var(--ink2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            <RotateCcw size={13} /> Return to zero
          </button>
        </div>

        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black uppercase tracking-tighter leading-[0.9] text-[var(--ink)] text-[13vw] lg:text-[9rem] select-none"
        >
          Count.<br />
          Observe.<br />
          <span className="text-[var(--accent)]">Repeat.</span>
        </motion.h2>

        <div className="mt-14 pt-6 border-t border-[var(--line)] flex flex-wrap justify-between gap-4 font-mono-s text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">
          <span>PULSE — The Kinetic Counter</span>
          <span>Nothing is saved. Everything counts.</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
