import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

export const SECTIONS = [
  { id: "hero", label: "01 // HERO" },
  { id: "reels", label: "02 // REELS & VFX" },
  { id: "fx", label: "03 // FX SUITE" },
  { id: "rates", label: "04 // RATE CALCULATOR" },
  { id: "hire", label: "05 // HIRE US" },
];

export function Navbar({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="glass-panel mx-auto mt-3 flex max-w-7xl flex-col gap-3 rounded-md px-4 py-3 md:mt-4 md:flex-row md:items-center md:justify-between md:px-6">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 self-start"
          aria-label="SPIDEY.CUTS home"
        >
          <Clapperboard className="h-5 w-5 text-spider" />
          <span className="text-web-gradient font-display text-lg font-black tracking-widest">
            SPIDEY.CUTS
          </span>
        </button>

        <nav
          className="scrollbar-none -mx-1 flex items-center gap-1 overflow-x-auto"
          aria-label="Timeline navigation"
        >
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="group relative shrink-0 px-3 py-2 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground transition-colors hover:text-cyan data-[active=true]:text-cyan"
                data-active={isActive}
              >
                {s.label}
                <span className="absolute inset-x-1 bottom-0 h-[2px] bg-border" />
                {isActive && (
                  <motion.span
                    layoutId="timeline-playhead"
                    className="glow-cyan absolute inset-x-1 bottom-0 h-[2px] bg-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;
