import { Reveal } from "./Reveal";
import { Target, Eye, Award, TrendingUp } from "lucide-react";
import interior from "@/assets/interior.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { year: "2014", title: "The Beginning", text: "Elevate opens its first studio with a bold vision for premium training." },
  { year: "2018", title: "Going Elite", text: "Launched athlete performance labs and recovery science programs." },
  { year: "2021", title: "Community 10K", text: "Reached 10,000 members across strength, mobility and wellness." },
  { year: "2025", title: "AI-Powered", text: "Introduced AI coaching and data-driven transformation programs." },
];

const pillars = [
  { icon: Target, title: "Mission", text: "Empower every member to unlock their strongest, healthiest self." },
  { icon: Eye, title: "Vision", text: "Redefine fitness as a premium, science-led lifestyle experience." },
  { icon: Award, title: "Why Us", text: "Elite coaches, world-class equipment, and personalized programming." },
  { icon: TrendingUp, title: "Results", text: "Measurable progress with data tracking and expert accountability." },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.3em] text-accent">/ ABOUT US</span>
          <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            More than a gym.<br />
            <span className="text-gradient">A performance culture.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Elevate Fitness Club blends elite coaching, cutting-edge technology
            and a design-led environment to make training feel effortless,
            addictive and deeply rewarding.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="glass h-full rounded-2xl p-5" data-cursor="hover">
                  <p.icon className="h-6 w-6 text-accent" />
                  <h3 className="mt-3 font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div ref={ref} className="relative overflow-hidden rounded-3xl">
            <motion.img
              style={{ y }}
              src={interior}
              alt="Luxury gym interior"
              width={1600}
              height={1104}
              loading="lazy"
              className="h-[520px] w-full scale-110 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-elegant">
            <p className="text-3xl font-extrabold text-gradient">A+</p>
            <p className="text-xs text-muted-foreground">Certified Excellence</p>
          </div>
        </Reveal>
      </div>

      {/* timeline */}
      <div className="mt-28">
        <Reveal>
          <h3 className="text-center text-2xl font-bold sm:text-3xl">Our Journey</h3>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.1}>
              <div className="relative rounded-2xl border border-border p-6" data-cursor="hover">
                <div className="text-4xl font-extrabold text-gradient-vivid">{t.year}</div>
                <div className="mt-2 h-px w-full bg-gradient-primary" />
                <h4 className="mt-4 font-bold">{t.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
