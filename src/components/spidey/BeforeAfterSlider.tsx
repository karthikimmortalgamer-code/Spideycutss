import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { ImagePlus, Loader2, MoveHorizontal } from "lucide-react";

import { createAestheticPortrait } from "@/lib/aesthetic-portrait.functions";

const RAW_SRC = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
const EDITED_SRC = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

export function BeforeAfterSlider() {
  const createPortrait = useServerFn(createAestheticPortrait);
  const containerRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [pos, setPos] = useState(50);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const dragging = useRef(false);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setGenerationError("Upload a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setGenerationError("Use an image smaller than 8 MB.");
      return;
    }

    const imageDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("The image could not be read."));
      reader.readAsDataURL(file);
    });

    setRawImage(imageDataUrl);
    setEditedImage(null);
    setGenerationError(null);
    setIsGenerating(true);

    try {
      const result = await createPortrait({ data: { imageDataUrl } });
      setEditedImage(result.imageDataUrl);
      setPos(50);
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Portrait generation failed.");
    } finally {
      setIsGenerating(false);
      event.target.value = "";
    }
  };

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [updateFromClientX]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="mx-auto mt-20 max-w-5xl"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <h3 className="font-display text-2xl font-black">
          RAW FOOTAGE <span className="text-muted-foreground">VS</span>{" "}
          <span className="text-web-gradient">SPIDEY CUT</span>
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
            DRAG THE PLAYHEAD
          </span>
          <input
            ref={uploadRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleUpload}
            className="sr-only"
          />
          <button
            type="button"
            onClick={() => uploadRef.current?.click()}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 border border-cyan px-3 py-2 text-[10px] font-bold tracking-[0.14em] text-cyan transition-colors hover:bg-cyan/10 disabled:cursor-wait disabled:opacity-60"
          >
            {isGenerating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImagePlus className="h-3.5 w-3.5" />
            )}
            {isGenerating ? "CREATING" : "UPLOAD PORTRAIT"}
          </button>
        </div>
      </div>

      {generationError && <p className="mb-4 text-sm text-spider">{generationError}</p>}

      <div
        ref={containerRef}
        onPointerDown={(e) => {
          dragging.current = true;
          updateFromClientX(e.clientX);
        }}
        className="hud-corner relative aspect-video w-full touch-none overflow-hidden rounded-sm border border-border select-none"
      >
        {rawImage ? (
          <img
            src={rawImage}
            alt="Uploaded portrait"
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.6] brightness-75"
          />
        ) : (
          <video
            src={RAW_SRC}
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.6] brightness-75"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          {editedImage ? (
            <img
              src={editedImage}
              alt="AI-generated aesthetic portrait"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <video
              src={EDITED_SRC}
              className="absolute inset-0 h-full w-full object-cover contrast-125 saturate-150"
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-spider/25 via-transparent to-cyan/15" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <span className="glow-cyan inline-block bg-cyan px-3 py-1 font-display text-lg font-black text-primary-foreground italic">
              THIS CHANGED
            </span>
            <br />
            <span className="mt-1 inline-block bg-spider px-3 py-1 font-display text-lg font-black text-accent-foreground italic">
              EVERYTHING.
            </span>
          </div>
        </div>

        <span className="absolute top-3 left-3 bg-void/80 px-2 py-1 text-[10px] font-bold tracking-[0.18em] text-muted-foreground">
          BEFORE // RAW CAM {rawImage ? "// UPLOADED" : ""}
        </span>
        <span className="absolute top-3 right-3 bg-void/80 px-2 py-1 text-[10px] font-bold tracking-[0.18em] text-cyan">
          AFTER // AESTHETIC SUIT
        </span>

        {isGenerating && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-void/70 backdrop-blur-sm">
            <Loader2 className="h-7 w-7 animate-spin text-cyan" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-cyan">
              CREATING AESTHETIC SUIT
            </span>
          </div>
        )}

        <div
          className="glow-cyan absolute inset-y-0 w-[2px] bg-cyan"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        >
          <div className="glow-cyan absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cyan bg-void">
            <MoveHorizontal className="h-4 w-4 text-cyan" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default BeforeAfterSlider;
