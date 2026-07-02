import { Reveal } from "./Reveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  { name: "James Carter", role: "Lost 18kg", text: "Elevate completely changed how I train. The AI plans and coaching kept me accountable every single week. I'm in the best shape of my life.", stars: 5 },
  { name: "Priya Nair", role: "Marathon Finisher", text: "The environment is unreal — premium equipment, incredible coaches and a community that pushes you. Worth every penny.", stars: 5 },
  { name: "Diego Alvarez", role: "Gained 8kg muscle", text: "From nutrition to recovery, everything is dialled in. This feels like a performance lab, not a gym.", stars: 5 },
  { name: "Hannah Lee", role: "Strength PR x3", text: "I've never felt stronger or more confident. The trainers genuinely care about your progress.", stars: 5 },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + reviews.length) % reviews.length);
  const r = reviews[i];

  return (
    <section className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-accent">/ TESTIMONIALS</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">
            Real people. <span className="text-gradient-vivid">Real results.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: 25, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -25, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass mx-auto max-w-2xl rounded-3xl p-10"
            >
              <Quote className="mx-auto h-10 w-10 text-accent" />
              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: r.stars }).map((_, s) => (
                  <Star key={s} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="mt-6 text-lg font-medium leading-relaxed sm:text-xl">"{r.text}"</p>
              <p className="mt-6 font-bold">{r.name}</p>
              <p className="text-sm text-accent">{r.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={() => go(-1)} data-cursor="hover" aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full glass hover:bg-secondary">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, d) => (
              <button key={d} onClick={() => setI(d)} aria-label={`Review ${d + 1}`}
                className={`h-2 rounded-full transition-all ${d === i ? "w-8 bg-gradient-primary" : "w-2 bg-border"}`} />
            ))}
          </div>
          <button onClick={() => go(1)} data-cursor="hover" aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full glass hover:bg-secondary">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
