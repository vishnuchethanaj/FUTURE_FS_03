import { Reveal } from "./Reveal";
import { Instagram, Linkedin } from "lucide-react";
import t1 from "@/assets/trainer1.jpg";
import t2 from "@/assets/trainer2.jpg";
import t3 from "@/assets/trainer3.jpg";

const trainers = [
  { name: "Sofia Vance", role: "Head Strength Coach", img: t1, exp: "12 yrs", spec: ["Strength", "Powerlifting"] },
  { name: "Marcus Reid", role: "Performance Director", img: t2, exp: "15 yrs", spec: ["Athlete Perf.", "Hypertrophy"] },
  { name: "Elena Ford", role: "Conditioning Specialist", img: t3, exp: "9 yrs", spec: ["HIIT", "Weight Loss"] },
];

export function Trainers() {
  return (
    <section id="trainers" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mb-14 text-center">
        <span className="text-xs font-semibold tracking-[0.3em] text-accent">/ TRAINERS</span>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">
          Coached by <span className="text-gradient">the best in the game</span>
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {trainers.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div
              data-cursor="hover"
              className="group relative h-[460px] overflow-hidden rounded-3xl"
            >
              <img
                src={t.img}
                alt={t.name}
                width={800}
                height={1000}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-2xl font-extrabold">{t.name}</h3>
                <p className="text-sm text-accent">{t.role}</p>
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                  <p className="mt-3 text-sm text-muted-foreground">{t.exp} experience</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.spec.map((s) => (
                      <span key={s} className="rounded-full glass px-3 py-1 text-xs">{s}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full glass"><Instagram className="h-4 w-4" /></span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full glass"><Linkedin className="h-4 w-4" /></span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
