import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";

export default function ScrollHandoff({ children, className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion()) return undefined;

    const context = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(element, { y: 72 }, { y: 0, duration: 0.18, ease: "none" }, 0)
        .to(element, { y: 72, duration: 0.18, ease: "none" }, 0.82);
    }, element);

    return () => context.revert();
  }, []);

  return (
    <div ref={ref} className={`scroll-handoff ${className}`}>
      {children}
    </div>
  );
}
