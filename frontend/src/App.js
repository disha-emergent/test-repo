import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Toaster, toast } from "sonner";
import "@/App.css";
import HeaderNav from "@/components/HeaderNav";
import HeroCounterSection from "@/components/HeroCounterSection";
import EditorialMarquee from "@/components/EditorialMarquee";
import ManifestoSection from "@/components/ManifestoSection";
import InteractionMetrics from "@/components/InteractionMetrics";
import Spatial3DCanvas from "@/components/Spatial3DCanvas";
import FooterSection from "@/components/FooterSection";
import { playClick, playPop, playChime } from "@/lib/audio";

export const MILESTONES = [
  { at: 10, label: "Origin" },
  { at: 50, label: "Momentum" },
  { at: 100, label: "Kinetic Master" },
  { at: 500, label: "Transcendent" },
];

export default function App() {
  const [count, setCount] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [soundOn, setSoundOn] = useState(true);
  const soundRef = useRef(true);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    document.title = "PULSE — The Kinetic Counter";
    const lenis = new Lenis({ lerp: 0.09 });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const increment = useCallback((n = 1) => {
    const now = Date.now();
    setClicks((c) => [...c.slice(-80), ...Array(n).fill(now)]);
    setCount((prev) => {
      const next = prev + n;
      const hit = MILESTONES.find((m) => prev < m.at && next >= m.at);
      if (hit) {
        if (soundRef.current) playChime();
        toast(`Milestone unlocked — ${hit.label}`, {
          description: `${hit.at} accumulations reached.`,
        });
      } else if (soundRef.current) {
        n > 1 ? playPop() : playClick();
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    setClicks([]);
    toast("Counter reset", { description: "The slate is clean. Begin again." });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundOn((s) => {
      soundRef.current = !s;
      return !s;
    });
  }, []);

  return (
    <div className="App grain">
      <Toaster position="bottom-right" toastOptions={{ style: { background: "var(--card)", color: "var(--ink)", border: "1px solid var(--line)" } }} />
      <HeaderNav count={count} soundOn={soundOn} onToggleSound={toggleSound} onReset={reset} />
      <main>
        <HeroCounterSection count={count} clicks={clicks} onIncrement={increment} onReset={reset} />
        <EditorialMarquee />
        <ManifestoSection />
        <InteractionMetrics count={count} clicks={clicks} startedAt={startedAt.current} />
        <Spatial3DCanvas count={count} />
      </main>
      <FooterSection startedAt={startedAt.current} onReset={reset} />
    </div>
  );
}
