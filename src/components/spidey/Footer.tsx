import { motion } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/spideycutss?igsh=MXR0bjVxOW8xY3lkaw==",
    Icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/spideycuts-undefined-317744428?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    Icon: Linkedin,
  },
  { name: "GitHub", href: "https://github.com/spideycuts", Icon: Github },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border px-4 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
        <div className="flex flex-wrap justify-center gap-4">
          {SOCIALS.map(({ name, href, Icon }, i) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.12 }}
              className="glass-panel hud-corner flex h-12 w-12 items-center justify-center rounded-sm text-cyan transition-colors hover:text-spider"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          ))}
        </div>

        <div className="text-center">
          <div className="text-web-gradient font-display text-xl font-black tracking-widest">
            SPIDEY.CUTS
          </div>
          <p className="mt-2 text-xs tracking-[0.18em] text-muted-foreground">
            VIRAL SHORT-FORM VIDEO AGENCY // {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
