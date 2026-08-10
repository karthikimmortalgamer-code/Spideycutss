import { useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

type Errors = Partial<Record<"name" | "email" | "details", string>>;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const RECIPIENT_EMAIL = "spideycutsedits@gmail.com";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", instagram: "", details: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Enter a valid email";
    if (form.details.trim().length < 10) next.details = "Tell us a bit more about the project";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast.error("Email delivery is not configured yet.");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: RECIPIENT_EMAIL,
          from_name: form.name.trim(),
          reply_to: form.email.trim(),
          instagram: form.instagram.trim() || "Not provided",
          project_details: form.details.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      setForm({ name: "", email: "", instagram: "", details: "" });
    } catch (err) {
      setStatus("idle");
      toast.error(err instanceof Error ? err.message : "Transmission failed. Try again.");
    }
  };

  const inputClass =
    "w-full rounded-sm border border-input bg-void/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-cyan focus:ring-1 focus:ring-ring";

  return (
    <section id="hire" className="relative px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-[11px] font-bold tracking-[0.22em] text-spider">
            05 // HIRE US
          </span>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            TRANSMIT <span className="text-web-gradient">YOUR BRIEF</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Send the signal. We reply within one business day with a cut plan.
          </p>
        </motion.div>

        <div className="glass-panel hud-corner relative mt-10 overflow-hidden rounded-sm p-6 md:p-8">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 14 }}
                  className="glow-cyan flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan"
                >
                  <CheckCircle2 className="h-9 w-9 text-cyan" />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-black">SIGNAL RECEIVED</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Your brief is locked in our web. Expect a reply within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 border border-border px-6 py-2.5 text-xs font-bold tracking-[0.18em] text-cyan transition-colors hover:bg-cyan/10"
                >
                  SEND ANOTHER
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="space-y-5"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-[11px] font-bold tracking-[0.18em] text-muted-foreground"
                    >
                      CREATOR / CLIENT NAME
                    </label>
                    <input
                      id="name"
                      value={form.name}
                      maxLength={100}
                      onChange={(e) => set("name")(e.target.value)}
                      placeholder="Peter Parker"
                      className={`mt-2 ${inputClass}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-spider">{errors.name}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-[11px] font-bold tracking-[0.18em] text-muted-foreground"
                    >
                      EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      maxLength={255}
                      onChange={(e) => set("email")(e.target.value)}
                      placeholder="you@studio.com"
                      className={`mt-2 ${inputClass}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-spider">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="instagram"
                    className="text-[11px] font-bold tracking-[0.18em] text-muted-foreground"
                  >
                    INSTAGRAM HANDLE
                  </label>
                  <input
                    id="instagram"
                    value={form.instagram}
                    maxLength={60}
                    onChange={(e) => set("instagram")(e.target.value)}
                    placeholder="@yourhandle"
                    className={`mt-2 ${inputClass}`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="details"
                    className="text-[11px] font-bold tracking-[0.18em] text-muted-foreground"
                  >
                    PROJECT DETAILS
                  </label>
                  <textarea
                    id="details"
                    rows={5}
                    value={form.details}
                    maxLength={2000}
                    onChange={(e) => set("details")(e.target.value)}
                    placeholder="Volume, niche, references, deadlines..."
                    className={`mt-2 resize-none ${inputClass}`}
                  />
                  {errors.details && <p className="mt-1 text-xs text-spider">{errors.details}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="glow-spider inline-flex w-full items-center justify-center gap-2 rounded-sm bg-spider px-6 py-3.5 text-sm font-bold tracking-[0.18em] text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> TRANSMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> TRANSMIT BRIEF
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
