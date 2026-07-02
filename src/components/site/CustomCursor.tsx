import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let mx = rx;
    let my = ry;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      if (dot.current) {
        dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      }
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('[data-cursor="hover"], a, button'));
    };

    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        ref={ring}
        className="absolute left-0 top-0 -ml-5 -mt-5 h-10 w-10 rounded-full border border-primary/70 transition-[width,height,opacity] duration-300"
        style={{
          width: hovering ? 64 : 40,
          height: hovering ? 64 : 40,
          marginLeft: hovering ? -32 : -20,
          marginTop: hovering ? -32 : -20,
          background: hovering ? "oklch(0.68 0.17 240 / 12%)" : "transparent",
          boxShadow: "0 0 24px -4px oklch(0.68 0.17 240 / 60%)",
        }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
      />
    </div>
  );
}
