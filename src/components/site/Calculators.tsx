import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Scale, Utensils } from "lucide-react";

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", tip: "Focus on strength training and a calorie surplus.", color: "var(--cyan)" };
  if (bmi < 25) return { label: "Healthy", tip: "Maintain with balanced training and nutrition.", color: "var(--accent)" };
  if (bmi < 30) return { label: "Overweight", tip: "Add cardio + a mild deficit for lean results.", color: "var(--purple)" };
  return { label: "Obese", tip: "Start with guided coaching and steady progression.", color: "var(--destructive)" };
}

function BMI() {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const bmi = h && w ? Number(w) / Math.pow(Number(h) / 100, 2) : 0;
  const cat = bmiCategory(bmi);
  const pct = Math.min(Math.max((bmi / 40) * 100, 0), 100);

  return (
    <div className="glass rounded-3xl p-7">
      <div className="flex items-center gap-3">
        <Scale className="h-6 w-6 text-accent" />
        <h3 className="text-xl font-bold">BMI Calculator</h3>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="text-sm">
          <span className="text-muted-foreground">Height (cm)</span>
          <input type="number" value={h} onChange={(e) => setH(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 outline-none focus:border-primary" />
        </label>
        <label className="text-sm">
          <span className="text-muted-foreground">Weight (kg)</span>
          <input type="number" value={w} onChange={(e) => setW(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 outline-none focus:border-primary" />
        </label>
      </div>
      <AnimatePresence>
        {bmi > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }} className="overflow-hidden">
            <div className="mt-6 flex items-end justify-between">
              <div>
                <motion.div key={bmi.toFixed(1)} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-5xl font-extrabold text-gradient">
                  {bmi.toFixed(1)}
                </motion.div>
                <p className="mt-1 text-sm font-semibold" style={{ color: cat.color }}>{cat.label}</p>
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div className="h-full rounded-full" style={{ background: "var(--gradient-vivid)" }}
                initial={{ width: 0 }} animate={{ width: `${pct}%` }} />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{cat.tip}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Calories() {
  const [age, setAge] = useState("");
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const [gender, setGender] = useState("Male");
  const [activity, setActivity] = useState("1.55");

  const bmr = age && h && w
    ? (gender === "Male"
        ? 10 * Number(w) + 6.25 * Number(h) - 5 * Number(age) + 5
        : 10 * Number(w) + 6.25 * Number(h) - 5 * Number(age) - 161)
    : 0;
  const tdee = Math.round(bmr * Number(activity));
  const macros = tdee > 0
    ? { protein: Math.round((tdee * 0.3) / 4), carbs: Math.round((tdee * 0.4) / 4), fat: Math.round((tdee * 0.3) / 9) }
    : null;

  return (
    <div className="glass rounded-3xl p-7">
      <div className="flex items-center gap-3">
        <Utensils className="h-6 w-6 text-accent" />
        <h3 className="text-xl font-bold">Calorie Calculator</h3>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}
          className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm outline-none focus:border-primary" />
        <input type="number" placeholder="Height" value={h} onChange={(e) => setH(e.target.value)}
          className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm outline-none focus:border-primary" />
        <input type="number" placeholder="Weight" value={w} onChange={(e) => setW(e.target.value)}
          className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm outline-none focus:border-primary" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <select value={gender} onChange={(e) => setGender(e.target.value)}
          className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm outline-none focus:border-primary">
          <option>Male</option><option>Female</option>
        </select>
        <select value={activity} onChange={(e) => setActivity(e.target.value)}
          className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm outline-none focus:border-primary">
          <option value="1.2">Sedentary</option>
          <option value="1.375">Light</option>
          <option value="1.55">Moderate</option>
          <option value="1.725">Very Active</option>
        </select>
      </div>
      <AnimatePresence>
        {macros && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0 }} className="overflow-hidden">
            <div className="mt-6 text-center">
              <div className="text-5xl font-extrabold text-gradient">{tdee}</div>
              <p className="text-sm text-muted-foreground">kcal / day to maintain</p>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {[
                { l: "Protein", v: macros.protein, c: "var(--accent)" },
                { l: "Carbs", v: macros.carbs, c: "var(--primary)" },
                { l: "Fat", v: macros.fat, c: "var(--purple)" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl border border-border p-3">
                  <div className="text-lg font-bold" style={{ color: m.c }}>{m.v}g</div>
                  <div className="text-xs text-muted-foreground">{m.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Calculators() {
  return (
    <section id="tools" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal className="mb-12 text-center">
        <span className="text-xs font-semibold tracking-[0.3em] text-accent">/ SMART TOOLS</span>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">
          Know your numbers. <span className="text-gradient">Own your progress.</span>
        </h2>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal><BMI /></Reveal>
        <Reveal delay={0.1}><Calories /></Reveal>
      </div>
    </section>
  );
}
