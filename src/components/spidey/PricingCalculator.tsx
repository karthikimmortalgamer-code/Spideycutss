import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Gauge, Layers, Lock } from "lucide-react";

const COMPLEXITY = [
  { id: "insta", label: "INSTA REEL", note: "Cuts, captions, sound design", rate: 500 },
  { id: "edits", label: "VIDEO EDITS", note: "Polished edits for your content", rate: 700 },
] as const;

const SPEED = [
  { id: "48", label: "48HR", mult: 1 },
  { id: "24", label: "24HR", mult: 1.25 },
  { id: "same", label: "SAME DAY", mult: 1.6 },
] as const;

export function PricingCalculator() {
  const [reels, setReels] = useState(8);
  const [complexity, setComplexity] = useState<(typeof COMPLEXITY)[number]["id"]>("insta");
  const [speed, setSpeed] = useState<(typeof SPEED)[number]["id"]>("24");

  const total = useMemo(() => {
    const base = COMPLEXITY.find((c) => c.id === complexity)!.rate;
    const mult = SPEED.find((s) => s.id === speed)!.mult;
    const volumeDiscount = reels >= 12 ? 0.88 : reels >= 6 ? 0.94 : 1;
    return Math.round((base * reels * mult * volumeDiscount) / 5) * 5;
  }, [reels, complexity, speed]);

  return (
    <section id="rates" className="relative px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-bold tracking-[0.22em] text-spider">
            04 // RATE CALCULATOR
          </span>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            BUILD YOUR <span className="text-web-gradient">RETAINER</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="glass-panel hud-corner space-y-8 rounded-sm p-6 md:p-8">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="reel-count"
                  className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-muted-foreground"
                >
                  <Layers className="h-4 w-4 text-cyan" /> REELS PER MONTH
                </label>
                <span className="font-display text-2xl font-black text-cyan">{reels}</span>
              </div>
              <input
                id="reel-count"
                type="range"
                min={2}
                max={20}
                step={1}
                value={reels}
                onChange={(e) => setReels(Number(e.target.value))}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--cyan)]"
              />
              <div className="mt-2 flex justify-between text-[10px] tracking-[0.15em] text-muted-foreground">
                <span>2</span>
                <span>20</span>
              </div>
            </div>

            <div>
              <span className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-muted-foreground">
                <Gauge className="h-4 w-4 text-cyan" /> EDITING PACKAGE
              </span>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {COMPLEXITY.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setComplexity(c.id)}
                    data-active={complexity === c.id}
                    className="rounded-sm border border-border p-4 text-left transition-all hover:border-cyan data-[active=true]:border-cyan data-[active=true]:bg-cyan/10"
                  >
                    <div className="font-display text-sm font-black">{c.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{c.note}</div>
                    <div className="mt-2 text-[11px] font-bold tracking-[0.14em] text-spider">
                      Rs. {c.rate} / REEL
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold tracking-[0.18em] text-muted-foreground">
                DELIVERY SPEED
              </span>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {SPEED.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSpeed(s.id)}
                    data-active={speed === s.id}
                    className="rounded-sm border border-border py-3 font-display text-xs font-black tracking-widest transition-all hover:border-spider data-[active=true]:border-spider data-[active=true]:bg-spider/15 data-[active=true]:text-spider"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel hud-corner flex flex-col justify-between rounded-sm p-6 md:p-8">
            <div>
              <div className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground">
                MONTHLY ESTIMATE
              </div>
              <motion.div
                key={total}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-web-gradient mt-3 font-display text-5xl font-black"
              >
                Rs. {total.toLocaleString("en-IN")}
              </motion.div>
              <p className="mt-3 text-sm text-muted-foreground">
                {reels} reels · {COMPLEXITY.find((c) => c.id === complexity)!.label} ·{" "}
                {SPEED.find((s) => s.id === speed)!.label} delivery
              </p>
              {reels >= 6 && (
                <p className="mt-2 text-[11px] font-bold tracking-[0.14em] text-cyan">
                  VOLUME DISCOUNT APPLIED
                </p>
              )}
            </div>

            <a
              href="#hire"
              className="glow-spider mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-spider px-6 py-3.5 text-sm font-bold tracking-[0.18em] text-accent-foreground transition-transform hover:scale-105"
            >
              <Lock className="h-4 w-4" />
              LOCK IN RATE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingCalculator;
