import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => setShow(v > 0.15));

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[200] h-1 origin-left bg-gradient-vivid"
      />
      <motion.button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        data-cursor="hover"
        initial={false}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.5 }}
        className="fixed bottom-6 right-6 z-[200] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </>
  );
}
