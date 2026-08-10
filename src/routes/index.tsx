import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Navbar, { SECTIONS } from "@/components/spidey/Navbar";
import ParticlesBg from "@/components/spidey/ParticlesBg";
import Hero from "@/components/spidey/Hero";
import Reels from "@/components/spidey/Reels";
import FxStack from "@/components/spidey/FxStack";
import PricingCalculator from "@/components/spidey/PricingCalculator";
import ContactForm from "@/components/spidey/ContactForm";
import Footer from "@/components/spidey/Footer";

const TITLE = "SPIDEY.CUTS // Viral Short-Form Video Agency";
const DESC =
  "Cinematic short-form editing, sound design and 3D VFX for Instagram influencers and brands. 120M+ views engineered, 24hr turnaround.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticlesBg />
      <Navbar active={active} />
      <main>
        
        <Hero />
        <Reels />
        <FxStack />
        <PricingCalculator />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
