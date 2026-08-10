import { motion } from "framer-motion";
import { Clapperboard, Film, Wand2 } from "lucide-react";

const STACK = [
  { name: "ADOBE PREMIERE PRO", detail: "Pacing & retention edit", value: 98, Icon: Film },
  { name: "AFTER EFFECTS", detail: "3D tracking & kinetic type", value: 94, Icon: Wand2 },
  { name: "CAPCUT DESKTOP", detail: "Short-form edits & captions", value: 92, Icon: Clapperboard },
];

export function FxStack() {
  return (
    <section id="fx" className="relative px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-bold tracking-[0.22em] text-spider">
            03 // FX SUITE
          </span>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            THE <span className="text-web-gradient">TECH WEB</span>
          </h2>
        </motion.div>

        <div className="mt-12 space-y-7">
          {STACK.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel hud-corner rounded-sm p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <item.Icon className="h-5 w-5 text-cyan" />
                  <div>
                    <div className="font-display text-sm font-black tracking-widest">
                      {item.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{item.detail}</div>
                  </div>
                </div>
                <span className="font-display text-xl font-black text-spider">{item.value}%</span>
              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="glow-cyan h-full rounded-full"
                  style={{ background: "var(--gradient-web)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FxStack;
