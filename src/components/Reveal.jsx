import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";

/**
 * Gently fades and lifts its children as they enter the viewport.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 34,
  duration = 1.15,
  start = "top 88%",
  once = false,
  as: Tag = "div",
  style,
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration, start, once]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}