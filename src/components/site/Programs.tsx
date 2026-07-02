import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  Dumbbell, Flame, Trophy, Zap, Activity, Timer,
  Bike, Heart, Waves, Wind, Medal, Users, User, Baby, ArrowUpRight,
} from "lucide-react";

const programs = [
  { name: "Strength Training", icon: Dumbbell, duration: "8 weeks", level: "All levels" },
  { name: "Weight Loss", icon: Flame, duration: "12 weeks", level: "Beginner" },
  { name: "Bodybuilding", icon: Trophy, duration: "16 weeks", level: "Advanced" },
  { name: "CrossFit", icon: Zap, duration: "6 weeks", level: "Intermediate" },
  { name: "Functional Fitness", icon: Activity, duration: "8 weeks", level: "All levels" },
  { name: "HIIT", icon: Timer, duration: "4 weeks", level: "Intermediate" },
  { name: "Powerlifting", icon: Medal, duration: "12 weeks", level: "Advanced" },
  { name: "Yoga", icon: Waves, duration: "Ongoing", level: "All levels" },
  { name: "Pilates", icon: Wind, duration: "6 weeks", level: "All levels" },
  { name: "Cardio", icon: Heart, duration: "Ongoing", level: "Beginner" },
  { name: "Athlete Performance", icon: Bike, duration: "10 weeks", level: "Elite" },
  { name: "Senior Fitness", icon: User, duration: "Ongoing", level: "Gentle" },
  { name: "Women's Fitness", icon: Users, duration: "8 weeks", level: "All levels" },
  { name: "Kids Fitness", icon: Baby, duration: "Ongoing", level: "Youth" },
];

function TiltCard({ p, i }: { p: (typeof programs)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 12, ry: px * 12 });
  };

  return (
    <Reveal delay={(i % 4) * 0.05}>
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={() => setT({ rx: 0, ry: 0 })}
        style={{ transform: `perspective(900px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)` }}
        data-cursor="hover"
        className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-shadow duration-300 hover:shadow-glow"
      >
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-primary opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-gradient-primary">
          <p.icon className="h-6 w-6 text-accent transition-colors group-hover:text-primary-foreground" />
        </span>
        <h3 className="mt-5 text-lg font-bold">{p.name}</h3>
        <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-3 py-1">{p.duration}</span>
          <span className="rounded-full bg-secondary px-3 py-1">{p.level}</span>
        </div>
        <button className="mt-5 flex items-center gap-1 text-sm font-semibold text-accent">
          Book Now <ArrowUpRight className="h-4 w-4" />
        </button>
      </motion.div>
    </Reveal>
  );
}

export function Programs() {
  return (
    <section id="programs" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mb-14 text-center">
        <span className="text-xs font-semibold tracking-[0.3em] text-accent">/ PROGRAMS</span>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">
          Find the training that <span className="text-gradient">transforms you</span>
        </h2>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map((p, i) => (
          <TiltCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
