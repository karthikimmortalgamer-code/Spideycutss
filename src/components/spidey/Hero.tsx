import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Crosshair, Zap } from "lucide-react";

const ThreeCanvas = lazy(() => import("./ThreeCanvas"));

const METRICS = [
  { value: "120M+", label: "VIEWS ENGINEERED" },
  { value: "85%", label: "AVG RETENTION" },
  { value: "24HR", label: "TURNAROUND" },
];

function EqBars() {
  return (
    <div className="flex h-6 items-end gap-[3px]" aria-hidden="true">
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom rounded-sm bg-cyan/70"
          style={{
            height: "100%",
            animation: `eq-bar ${0.7 + (i % 5) * 0.19}s ease-in-out ${i * 0.05}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="hero" className="relative min-h-screen px-4 pt-36 pb-20 md:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.22em] text-cyan">
            <Crosshair className="h-3.5 w-3.5 animate-web-pulse" />
            AGENCY FOR INSTAGRAM INFLUENCERS
          </span>

          <h1 className="mt-6 text-5xl leading-[0.95] font-black md:text-7xl">
            WE WEAVE
            <br />
            <span className="text-web-gradient">VIRAL VISUAL</span>
            <br />
            WEBS.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Cinematic short-form editing, sound design, and 3D VFX engineered to maximize watch
            retention — frame by frame, beat by beat.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#hire"
              className="glow-spider group inline-flex items-center gap-2 rounded-sm bg-spider px-7 py-3.5 text-sm font-bold tracking-[0.18em] text-accent-foreground transition-transform hover:scale-105"
            >
              SHOOT YOUR WEB
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a
              href="#reels"
              className="hud-corner inline-flex items-center gap-2 border border-border px-7 py-3.5 text-sm font-bold tracking-[0.18em] text-cyan transition-colors hover:bg-cyan/10"
            >
              <Zap className="h-4 w-4" />
              VIEW REELS
            </a>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
                className="glass-panel hud-corner rounded-sm p-4"
              >
                <div className="font-display text-2xl font-black text-cyan">{m.value}</div>
                <div className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <EqBars />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
              SOUND DESIGN // ACTIVE
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hud-corner relative aspect-square w-full cursor-grab active:cursor-grabbing"
        >
          <div className="absolute inset-0 rounded-full bg-cyan/10 blur-3xl" />
          <Suspense fallback={null}>{mounted && <ThreeCanvas />}</Suspense>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
            DRAG TO ROTATE THE WEB CORE
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
