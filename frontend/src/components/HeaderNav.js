import { motion } from "framer-motion";
import { Volume2, VolumeX, Sun, Moon, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeaderNav({ count, soundOn, onToggleSound, onReset }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const iconBtn =
    "h-9 w-9 grid place-items-center border border-[var(--line)] text-[var(--ink2)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-200";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b border-[var(--line)]"
      style={{ background: "var(--glass)" }}
      data-testid="header-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group" data-testid="brand-link">
          <motion.span
            className="h-3.5 w-3.5 bg-[var(--accent)]"
            animate={{ rotate: [0, 90, 90, 180, 180, 270, 270, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-display font-extrabold tracking-tight text-lg text-[var(--ink)]">
            PULSE<span className="text-[var(--accent)]">.</span>
          </span>
          <span className="hidden md:inline font-mono-s text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]">
            The Kinetic Counter
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            data-testid="header-mini-counter"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[var(--line)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
            <span className="font-mono-s text-xs text-[var(--ink)] tabular-nums">{String(count).padStart(4, "0")}</span>
          </div>
          <button data-testid="audio-sfx-toggle" onClick={onToggleSound} className={iconBtn} aria-label="Toggle sound">
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
          <button data-testid="theme-mode-toggle" onClick={() => setDark((d) => !d)} className={iconBtn} aria-label="Toggle theme">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button data-testid="counter-reset-button" onClick={onReset} className={iconBtn} aria-label="Reset counter">
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
