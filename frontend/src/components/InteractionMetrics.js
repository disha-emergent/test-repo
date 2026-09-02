import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { MILESTONES } from "@/App";

const card = "bg-[var(--card)] border border-[var(--line)] p-6 flex flex-col gap-3";
const label = "font-mono-s text-[10px] uppercase tracking-[0.3em] text-[var(--muted2)]";

function useTick(ms = 500) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

export default function InteractionMetrics({ count, clicks, startedAt }) {
  const now = useTick(500);
  const ageSec = Math.floor((now - startedAt) / 1000);

  const peak = useMemo(() => {
    let max = 0;
    for (let i = 0; i < clicks.length; i++) {
      const c = clicks.filter((t) => t >= clicks[i] && t < clicks[i] + 1000).length;
      if (c > max) max = c;
    }
    return max;
  }, [clicks]);

  const rhythm = useMemo(() => {
    const gaps = [];
    for (let i = 1; i < clicks.length; i++) gaps.push(clicks[i] - clicks[i - 1]);
    return gaps.slice(-24);
  }, [clicks]);

  const maxGap = Math.max(...rhythm, 1);

  return (
    <section className="py-24 md:py-36 bg-[var(--bg2)] border-y border-[var(--line)]" data-testid="interaction-metrics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`${label} !text-[var(--accent)] mb-4`}
        >
          Telemetry
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold tracking-tight text-[var(--ink)] text-3xl sm:text-4xl md:text-5xl mb-16"
        >
          The session, measured.
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
          <motion.div className={`${card} lg:col-span-3`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className={label}>Total Accumulations</span>
            <span data-testid="metrics-total-clicks" className="font-mono-s text-5xl font-bold text-[var(--ink)]">{count}</span>
          </motion.div>
          <motion.div className={`${card} lg:col-span-3`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }}>
            <span className={label}>Session Age</span>
            <span data-testid="metrics-session-age" className="font-mono-s text-5xl font-bold text-[var(--ink)]">
              {Math.floor(ageSec / 60)}:{String(ageSec % 60).padStart(2, "0")}
            </span>
          </motion.div>
          <motion.div className={`${card} lg:col-span-3`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.16 }}>
            <span className={label}>Peak Velocity</span>
            <span data-testid="metrics-peak-velocity" className="font-mono-s text-5xl font-bold text-[var(--accent)]">{peak}<span className="text-lg text-[var(--muted2)]">/s</span></span>
          </motion.div>
          <motion.div className={`${card} lg:col-span-3`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.24 }}>
            <span className={label}>Click Rhythm</span>
            <div data-testid="metrics-rhythm-graph" className="flex items-end gap-[3px] h-14">
              {rhythm.length === 0 ? (
                <span className="font-mono-s text-xs text-[var(--muted2)]">awaiting input…</span>
              ) : (
                rhythm.map((g, i) => (
                  <div
                    key={i}
                    className="w-2 bg-[var(--indigo)]"
                    style={{ height: `${Math.max(8, 100 - (g / maxGap) * 92)}%`, opacity: 0.35 + (i / rhythm.length) * 0.65 }}
                  />
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            className={`${card} lg:col-span-12`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className={label}>Milestones</span>
            <ul data-testid="counter-milestones-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
              {MILESTONES.map((m) => {
                const done = count >= m.at;
                return (
                  <li
                    key={m.at}
                    className={`flex items-center gap-3 border px-4 py-3 transition-colors duration-300 ${
                      done ? "border-[var(--accent)] bg-[var(--glow)]" : "border-[var(--line)]"
                    }`}
                  >
                    {done ? <Check size={15} className="text-[var(--accent)]" /> : <Lock size={15} className="text-[var(--muted2)]" />}
                    <div>
                      <div className={`font-mono-s text-xs ${done ? "text-[var(--ink)]" : "text-[var(--muted2)]"}`}>
                        {m.at} — {m.label}
                      </div>
                      <div className="font-mono-s text-[10px] text-[var(--muted2)]">{done ? "unlocked" : `${m.at - count} to go`}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
