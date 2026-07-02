import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const dur = 1800;
    let raf = 0;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute h-24 w-24 rounded-full border border-primary/40 animate-pulse-ring" />
            <span
              className="absolute h-24 w-24 rounded-full border border-accent/40 animate-pulse-ring"
              style={{ animationDelay: "0.8s" }}
            />
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-gradient">EF</span>
              <span className="text-foreground">C</span>
            </motion.div>
          </div>
          <div className="mt-10 h-px w-56 overflow-hidden bg-border">
            <motion.div
              className="h-full bg-gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="mt-4 text-xs font-medium tracking-[0.4em] text-muted-foreground">
            {count}% · ELEVATE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
