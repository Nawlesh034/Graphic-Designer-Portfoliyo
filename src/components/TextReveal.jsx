import { useLayoutEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/motion";

/**
 * Reveals type through clipping masks — line by line, or word by word.
 * Pass `scrub` to let the reveal follow the visitor's scroll position.
 */
export default function TextReveal({
  lines,
  text,
  mode = "lines",
  as: Tag = "h2",
  className = "",
  itemClassName = "",
  delay = 0,
  stagger = 0.12,
  duration = 1.2,
  scrub = false,
  start = "top 85%",
  end = "top 40%",
  once = false,
}) {
  const ref = useRef(null);
  const items = lines ?? (text ? text.split(" ") : []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    if (reducedMotion()) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 118, opacity: 0 });
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          once,
          scrub,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, end, once, scrub, stagger, start]);

  if (mode === "words") {
    return (
      <Tag ref={ref} className={className}>
        {items.map((word, i) => (
          <span key={`${word}-${i}`} className="line-mask inline-block align-top">
            <span data-reveal className={`inline-block ${itemClassName}`}>
              {word}
            </span>
            {i < items.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      {items.map((line, i) => (
        <span key={`${line}-${i}`} className="line-mask block">
          <span data-reveal className={`block ${itemClassName}`}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}