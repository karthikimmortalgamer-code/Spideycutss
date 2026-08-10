import { useEffect, useMemo, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine) => {
  await loadSlim(engine);
};

function WebField() {
  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 190, links: { opacity: 0.75, color: "#D11A2A" } },
          push: { quantity: 2 },
        },
      },
      particles: {
        color: { value: ["#E8E8E8", "#D11A2A"] },
        links: { color: "#E8E8E8", distance: 145, enable: true, opacity: 0.22, width: 1 },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none",
          outModes: { default: "bounce" },
        },
        number: { value: 70, density: { enable: true, width: 1200, height: 900 } },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.4 } },
      },
    }),
    [],
  );

  return <Particles id="spidey-web" options={options} className="h-full w-full" />;
}

export function ParticlesBg() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10">
      <ParticlesProvider init={init}>
        <WebField />
      </ParticlesProvider>
    </div>
  );
}

export default ParticlesBg;
