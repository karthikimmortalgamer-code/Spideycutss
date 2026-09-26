import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Play, TrendingUp, X } from "lucide-react";

import fitness from "@/assets/reel-fitness.jpg";
import fashion from "@/assets/reel-fashion.jpg";
import tech from "@/assets/reel-tech.jpg";
import BeforeAfterSlider from "./BeforeAfterSlider";

type Reel = {
  id: string;
  title: string;
  tag: string;
  image: string;
  video?: string;
  featured?: boolean;
  views: string;
  growth: string;
  embed: string;
};

// Direct public URLs without tokens
const REELS: Reel[] = [
  {
    id: "outings",
    title: "OUTINGS HIGHLIGHTS",
    tag: "OUTINGS",
    image: fitness,
    video:
      "https://wwrjnqzvhjdfyqbnzgnm.supabase.co/storage/v1/object/public/videos/lv_0_20260810145418.mp4",
    views: "4.2M Views",
    growth: "+18k Followers",
    embed: "https://www.instagram.com/reel/C1sQb3nO0Zs/embed",
  },
  {
    id: "memories",
    title: "MEMORIES HIGHLIGHTS",
    tag: "MEMORIES",
    image: fashion,
    video:
      "https://wwrjnqzvhjdfyqbnzgnm.supabase.co/storage/v1/object/public/videos/lv_7590360326604950837_20260418225752.mp4",
    views: "2.8M Views",
    growth: "+11k Followers",
    embed: "https://www.instagram.com/reel/C2VuqRXNKQz/embed",
  },
  {
    id: "cini-cuts",
    title: "CINI CUTS",
    tag: "CINI CUTS",
    image: tech,
    video:
      "https://wwrjnqzvhjdfyqbnzgnm.supabase.co/storage/v1/object/public/videos/Kabii.mp4",
    featured: true,
    views: "6.1M Views",
    growth: "+27k Followers",
    embed: "https://www.instagram.com/reel/C0nS9pFrPtE/embed",
  },
];

function ReelCard({ reel, onOpen, index }: { reel: Reel; onOpen: () => void; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Direct DOM property assignment required by iOS Safari
    el.muted = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "true");

    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay restricted (e.g. low power mode)
      });
    }
  }, []);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ scale: 1.03, rotateX: -4, rotateY: 4 }}
      className={`hud-corner group relative block w-full overflow-hidden rounded-sm border border-border bg-void text-left [transform-style:preserve-3d] ${
        reel.featured
          ? "aspect-[9/14] sm:col-span-2 sm:aspect-video lg:col-span-3"
          : "aspect-[9/14]"
      }`}
    >
      {reel.video ? (
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110 ${
            reel.featured ? "object-contain" : "object-cover"
          }`}
        />
      ) : (
        <img
          src={reel.image}
          alt={`${reel.title} — ${reel.tag} reel edited by Spidey Cuts`}
          loading="lazy"
          width={720}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
      <div className="absolute inset-0 bg-cyan/0 transition-colors duration-500 group-hover:bg-cyan/10" />

      <span className="absolute top-3 left-3 bg-spider px-2.5 py-1 text-[10px] font-black tracking-[0.18em] text-accent-foreground">
        {reel.tag}
      </span>

      <span className="glow-cyan absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan bg-void/60 opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100">
        <Play className="h-6 w-6 fill-cyan text-cyan" />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-display text-base font-black">{reel.title}</h3>
        <div className="mt-2 flex flex-wrap gap-3 text-[11px] font-semibold tracking-[0.1em] text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-cyan">
            <Eye className="h-3.5 w-3.5" /> {reel.views}
          </span>
          <span className="inline-flex items-center gap-1 text-spider">
            <TrendingUp className="h-3.5 w-3.5" /> {reel.growth}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export function Reels() {
  const [active, setActive] = useState<Reel | null>(null);

  return (
    <section id="reels" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-bold tracking-[0.22em] text-spider">
            02 // REELS &amp; VFX
          </span>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            FEATURED <span className="text-web-gradient">SWINGS</span>
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Tap any card to open the reel. Every cut is retention-mapped, sound-designed, and
            captioned for silent scrolling.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REELS.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} onOpen={() => setActive(reel)} />
          ))}
        </div>

        <BeforeAfterSlider />
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-void/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel hud-corner relative w-full max-w-md rounded-sm p-3"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <div className="font-display text-sm font-black">{active.title}</div>
                  <div className="text-[10px] tracking-[0.18em] text-muted-foreground">
                    {active.tag} // {active.views}
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close reel"
                  className="rounded-sm border border-border p-2 text-cyan transition-colors hover:bg-cyan/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="aspect-[9/16] w-full overflow-hidden rounded-sm bg-black">
                {active.video ? (
                  <video
                    src={active.video}
                    title={active.title}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <iframe
                    src={active.embed}
                    title={active.title}
                    className="h-full w-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Reels;