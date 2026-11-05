import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";

/**
 * A hairline that tracks how far the visitor has scrolled.
 */
export default function ScrollProgress() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(el, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: reducedMotion() ? true : 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[2px]" aria-hidden="true">
      <div ref={ref} className="h-full w-full origin-left bg-accent" />
    </div>
  );
}