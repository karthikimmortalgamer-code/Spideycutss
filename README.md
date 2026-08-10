# Spider Web Edit

Build a complete, production-ready, heavily animated Spider-Man themed Video Editing Agency Portfolio website tailored specifically for pitching to Instagram influencers and brand clients.

Title: SPIDEY.CUTS // Viral Short-Form Video Agency

Aesthetic & Theme:
- Dark cinematic Spider-Man suit theme: Deep Void background (#080B11), Electric Cyan (#00F0FF), Neon Spider Red (#FF0055), and Glassmorphism dark cards with glow overlays.
- HUD Elements: Crosshair indicators, film editor timeline navigation bar, sound frequency waves, and glowing web-node connections.

Technical Stack & Dependencies:
- React + Tailwind CSS
- framer-motion (for seamless web-slinging page transitions and entrance animations)
- @react-three/fiber and @react-three/drei (for an interactive 3D glowing spider web/core mesh in the Hero section)
- @tsparticles/react and tsparticles-slim (for an interactive spider-web particle network in the background that reacts on cursor movement)
- lucide-react (for video editing, play buttons, and social icons)

Structure & Component Layout:

1. Navigation Bar (Film Editor HUD):
   - Branding "SPIDEY.CUTS" with gradient text.
   - Editor timeline HUD tab switching: "01 // HERO", "02 // REELS & VFX", "03 // FX SUITE", "04 // RATE CALCULATOR", "05 // HIRE US".

2. Hero + About Section (Page 1):
   - Badge: "AGENCY FOR INSTAGRAM INFLUENCERS".
   - Headline: "WE WEAVE VIRAL VISUAL WEBS."
   - Value Prop: Cinematic short-form editing, sound design, and 3D VFX engineered to maximize watch retention.
   - Interactive 3D Canvas: Glowing distorted web sphere using React Three Fiber that spins on drag/scroll.
   - High-impact metrics: 120M+ Views, 85% Avg Retention, 24hr Turnaround.

3. Featured Reels & VFX Showcase (Page 2):
   - 3-column video card grid showcasing influencer reels.
   - Hover cards with subtle tilt/scale, custom tags (FITNESS, FASHION, TECH), play button overlays, and performance metrics (e.g., "4.2M Views // +18k Followers").

4. FX Tech & Editing Stack (Page 3):
   - Animated Framer Motion progress bars for Adobe Premiere Pro, After Effects (3D Tracking), DaVinci Resolve (Color Grade), and Blender 3D.

5. Influencer Rate Calculator (Page 4):
   - Interactive slider for Reels count (2 to 20 per month).
   - Selection buttons for VFX complexity ("Pro Shorts" vs "3D Motion FX") and Delivery Speed ("48hr", "24hr", "Same Day").
   - Live updating monthly estimate price box with a "LOCK IN RATE" call-to-action button.

6. Interactive Contact / Transmit Page (Page 5):
   - Input fields: Creator/Client Name, Email, Instagram Handle (@yourhandle), Project Details.
   - Form validation with interactive success state animation upon submission.

7. Footer & Socials:
   - Floating interactive hover icons for Instagram, YouTube, Twitter, LinkedIn, and GitHub.

Please build the project with proper file separation (components/Navbar, components/Hero, components/ThreeCanvas, components/ParticlesBg, components/PricingCalculator, components/ContactForm) and ensure all dependencies are properly installed and imported.
In the Projects section, allow clicking a card to open a video modal or embed actual Instagram Reels / TikTok iframe videos
Add a Before vs After video comparison slider showing raw camera footage on the left and fully edited cinematic reel with kinetic captions on the right.
Integrate EmailJS or Supabase into the contact form so submissions reach my inbox immediately.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://spidey-cuts-web.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/faf682bc-d5e1-43d5-96a7-6f615d46ffaf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
