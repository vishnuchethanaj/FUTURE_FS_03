import { Reveal } from "./Reveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Dumbbell, Calendar, Flame } from "lucide-react";

type Form = {
  age: string; gender: string; height: string; weight: string;
  goal: string; experience: string; days: string;
};

const fields = [
  { key: "age", label: "Age", type: "number", ph: "28" },
  { key: "height", label: "Height (cm)", type: "number", ph: "178" },
  { key: "weight", label: "Weight (kg)", type: "number", ph: "75" },
] as const;

const selects = [
  { key: "gender", label: "Gender", opts: ["Male", "Female", "Other"] },
  { key: "goal", label: "Fitness Goal", opts: ["Build Muscle", "Lose Fat", "Get Stronger", "Improve Endurance", "General Health"] },
  { key: "experience", label: "Experience", opts: ["Beginner", "Intermediate", "Advanced"] },
  { key: "days", label: "Available Days", opts: ["3", "4", "5", "6"] },
] as const;

function buildPlan(f: Form) {
  const goal = f.goal || "General Health";
  const days = Number(f.days) || 4;
  const splits: Record<number, string[]> = {
    3: ["Full Body Strength", "Conditioning + Core", "Full Body Power"],
    4: ["Upper Body", "Lower Body", "Push + Core", "Pull + Conditioning"],
    5: ["Push", "Pull", "Legs", "Athletic Conditioning", "Mobility + Core"],
    6: ["Chest + Triceps", "Back + Biceps", "Legs", "Shoulders + Core", "HIIT", "Active Recovery"],
  };
  const plan = splits[days] || splits[4];
  const focus =
    goal === "Lose Fat" ? "High-volume circuits with 45s rest and daily 8k steps"
    : goal === "Build Muscle" ? "Hypertrophy 8–12 reps, progressive overload weekly"
    : goal === "Get Stronger" ? "Heavy compounds 3–5 reps, longer rest, 4-week waves"
    : goal === "Improve Endurance" ? "Zone 2 cardio + tempo intervals 4x/week"
    : "Balanced strength + mobility with steady cardio";
  return { plan, focus, days, goal };
}

export function AICoach() {
  const [form, setForm] = useState<Form>({
    age: "", gender: "", height: "", weight: "",
    goal: "", experience: "", days: "",
  });
  const [result, setResult] = useState<ReturnType<typeof buildPlan> | null>(null);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <section id="ai-coach" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "var(--gradient-glow)" }} />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold tracking-[0.25em] text-accent">
            <Sparkles className="h-4 w-4" /> AI FITNESS COACH
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold sm:text-5xl">
            Your personalized plan, <span className="text-gradient-vivid">generated instantly</span>
          </h2>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="glass rounded-3xl p-7">
              <div className="grid grid-cols-3 gap-4">
                {fields.map((fd) => (
                  <label key={fd.key} className="block text-sm">
                    <span className="text-muted-foreground">{fd.label}</span>
                    <input
                      type={fd.type}
                      placeholder={fd.ph}
                      value={form[fd.key]}
                      onChange={(e) => set(fd.key, e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 outline-none focus:border-primary"
                    />
                  </label>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {selects.map((s) => (
                  <label key={s.key} className="block text-sm">
                    <span className="text-muted-foreground">{s.label}</span>
                    <select
                      value={form[s.key]}
                      onChange={(e) => set(s.key, e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 outline-none focus:border-primary"
                    >
                      <option value="">Select</option>
                      {s.opts.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setResult(buildPlan(form))}
                data-cursor="hover"
                className="mt-6 w-full rounded-full bg-gradient-primary py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                Generate My Plan
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass relative h-full min-h-[360px] rounded-3xl p-7">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="res"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-3">
                      <Flame className="h-6 w-6 text-accent" />
                      <h3 className="text-xl font-bold">Your {result.goal} Plan</h3>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" /> {result.days} training days / week
                    </p>
                    <p className="mt-4 rounded-xl bg-secondary/50 p-4 text-sm">{result.focus}</p>
                    <div className="mt-5 space-y-2">
                      {result.plan.map((d, i) => (
                        <motion.div
                          key={d}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-3 rounded-xl border border-border p-3"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-xs font-bold text-primary-foreground">
                            {i + 1}
                          </span>
                          <span className="text-sm font-medium">{d}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="flex h-full min-h-[300px] flex-col items-center justify-center text-center text-muted-foreground"
                  >
                    <Dumbbell className="h-10 w-10 text-accent animate-float" />
                    <p className="mt-4 max-w-xs text-sm">
                      Fill in your details and our AI coach will craft a training
                      split tailored to your goals.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
