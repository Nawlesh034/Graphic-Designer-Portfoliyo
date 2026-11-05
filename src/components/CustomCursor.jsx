import { useEffect, useRef, useState } from "react";
import { gsap, finePointer, reducedMotion } from "@/lib/motion";

/**
 * A small eased dot that becomes a “VIEW PROJECT” disc over portfolio artwork.
 * Rendered only for fine pointers with motion allowed — every pointer device
 * keeps its native cursor.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const discRef = useRef(null);
  const labelRef = useRef(null);
  const [active] = useState(() => finePointer() && !reducedMotion());

  useEffect(() => {
    if (!active) return undefined;
    document.documentElement.classList.add("custom-cursor");
    return () => document.documentElement.classList.remove("custom-cursor");
  }, [active]);

  useEffect(() => {
    if (!active) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const disc = discRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !disc || !label) return undefined;

    gsap.set([dot, ring, disc], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(disc, { scale: 0.3, opacity: 0 });
    gsap.set(label, { opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.14, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.14, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
    const discX = gsap.quickTo(disc, "x", { duration: 0.65, ease: "power3.out" });
    const discY = gsap.quickTo(disc, "y", { duration: 0.65, ease: "power3.out" });

    let mode = "hidden";

    const applyMode = (next) => {
      if (next === mode) return;
      mode = next;
      const isView = next === "view";
      const isLink = next === "link";

      gsap.to([dot, ring], { opacity: next === "hidden" ? 0 : 1, duration: 0.4 });
      gsap.to(ring, { scale: isLink ? 1.9 : 1, duration: 0.5 });
      gsap.to(disc, {
        scale: isView ? 1 : 0.3,
        opacity: isView ? 1 : 0,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(label, { opacity: isView ? 1 : 0, duration: 0.3 });
    };

    const onMove = (event) => {
      const { clientX, clientY } = event;
      dotX(clientX);
      dotY(clientY);
      ringX(clientX);
      ringY(clientY);
      discX(clientX);
      discY(clientY);

      if (mode === "hidden") applyMode("default");
    };

    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      applyMode(target?.getAttribute("data-cursor") || "default");
    };

    const onLeaveWindow = () => applyMode("hidden");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120]" aria-hidden="true">
      <span
        ref={discRef}
        className="absolute left-0 top-0 flex h-[104px] w-[104px] items-center justify-center rounded-full bg-accent"
      >
        <span ref={labelRef} className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent-foreground">
          View project
        </span>
      </span>
      <span
        ref={ringRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full border border-accent/40"
      />
      <span ref={dotRef} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  );
}