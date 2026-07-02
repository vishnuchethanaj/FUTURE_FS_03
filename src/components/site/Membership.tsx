import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";

const cycles = { Monthly: 1, Quarterly: 2.7, Yearly: 10 } as const;
type Cycle = keyof typeof cycles;

const plans = [
  {
    name: "Starter", base: 39, featured: false,
    perks: ["Full gym access", "2 group classes / week", "Fitness assessment", "Mobile app tracking"],
  },
  {
    name: "Pro", base: 79, featured: true,
    perks: ["Everything in Starter", "Unlimited group classes", "AI coaching plans", "Nutrition guidance", "Recovery zone access"],
  },
  {
    name: "Elite", base: 139, featured: false,
    perks: ["Everything in Pro", "2 personal training sessions", "Body composition scans", "Priority booking", "Guest passes"],
  },
];

export function Membership() {
  const [cycle, setCycle] = useState<Cycle>("Monthly");

  return (
    <section id="membership" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mb-10 text-center">
        <span className="text-xs font-semibold tracking-[0.3em] text-accent">/ MEMBERSHIP</span>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">
          Choose your <span className="text-gradient">level of ambition</span>
        </h2>
      </Reveal>

      <Reveal className="mb-14 flex justify-center">
        <div className="inline-flex rounded-full glass p-1">
          {(Object.keys(cycles) as Cycle[]).map((c) => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              data-cursor="hover"
              className="relative rounded-full px-5 py-2 text-sm font-semibold"
            >
              {cycle === c && (
                <motion.span layoutId="cyclePill" className="absolute inset-0 rounded-full bg-gradient-primary" />
              )}
              <span className={`relative ${cycle === c ? "text-primary-foreground" : "text-muted-foreground"}`}>
                {c}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((p, i) => {
          const price = Math.round(p.base * cycles[cycle]);
          return (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                data-cursor="hover"
                className={`relative h-full overflow-hidden rounded-3xl p-8 transition-transform hover:-translate-y-2 ${
                  p.featured ? "bg-gradient-primary text-primary-foreground shadow-glow" : "glass"
                }`}
              >
                {p.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-background/20 px-3 py-1 text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-extrabold">{p.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <motion.span key={price} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-extrabold">
                    ${price}
                  </motion.span>
                  <span className={p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}>
                    /{cycle === "Monthly" ? "mo" : cycle === "Quarterly" ? "qtr" : "yr"}
                  </span>
                </div>
                <ul className="mt-8 space-y-3">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "" : "text-accent"}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 block rounded-full py-3.5 text-center text-sm font-semibold transition-transform hover:scale-[1.02] ${
                    p.featured ? "bg-background text-foreground" : "bg-gradient-primary text-primary-foreground"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
