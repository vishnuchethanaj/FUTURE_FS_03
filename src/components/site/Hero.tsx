import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Counter } from "./Counter";

const stats = [
  { value: 20, suffix: "+", label: "Certified Coaches" },
  { value: 15, suffix: "K+", label: "Members" },
  { value: 120, suffix: "K+", label: "Workouts Completed" },
  { value: 4.9, suffix: "★", label: "Rating", decimals: 1 },
];

const particles = Array.from({ length: 22 });

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Athlete training in a premium gym"
          width={1600}
          height={1600}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
      </motion.div>

      {/* particles */}
      <div aria-hidden className="absolute inset-0">
        {particles.map((_, i) => {
          const size = 2 + (i % 4);
          return (
            <motion.span
              key={i}
              className="absolute rounded-full bg-accent/60"
              style={{
                width: size,
                height: size,
                left: `${(i * 47) % 100}%`,
                top: `${(i * 71) % 100}%`,
                boxShadow: "0 0 12px 2px oklch(0.82 0.14 195 / 60%)",
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 5 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
            />
          );
        })}
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium tracking-[0.25em] text-muted-foreground"
        >
          <span className="h-2 w-2 rounded-full bg-accent" /> ELEVATE FITNESS CLUB
        </motion.span>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.98] sm:text-7xl lg:text-8xl">
          {["Become The", "Strongest Version", "Of Yourself"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 2.2 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${i === 1 ? "text-gradient-vivid" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.8 }}
          className="mt-7 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Premium fitness coaching, strength training, nutrition guidance, group
          classes, recovery, and transformation programs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#membership"
            data-cursor="hover"
            className="group flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          >
            Start Your Journey
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#membership"
            data-cursor="hover"
            className="flex items-center gap-2 rounded-full glass px-7 py-4 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <Play className="h-4 w-4 text-accent" /> Explore Membership
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.8 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </dd>
              <dt className="mt-1 text-xs text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
