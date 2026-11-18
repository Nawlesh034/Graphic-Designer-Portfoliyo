import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, reducedMotion } from "@/lib/motion";
import { Image } from "@/components/ui/image";

/**
 * An artwork plate: revealed through an animated clipping mask, then kept
 * alive with a slow parallax as it travels through the viewport.
 */
export default function ParallaxImage({
  src,
  alt,
  aspect = "aspect-[3/2]",
  className = "",
  strength = 7,
  reveal = true,
  priority = false,
}) {
  const wrapRef = useRef(null);
  const shiftRef = useRef(null);
  const scaleRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const shift = shiftRef.current;
    const scale = scaleRef.current;
    if (!wrap || !shift || !scale || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        shift,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      if (reveal) {
        gsap.set(wrap, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(scale, { scale: 1.16 });
        gsap
          .timeline({ scrollTrigger: { trigger: wrap, start: "top 85%", once: true } })
          .to(wrap, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" }, 0)
          .to(scale, { scale: 1, duration: 1.7, ease: "power4.out" }, 0);
      }
    }, wrap);

    return () => ctx.revert();
  }, [reveal, strength]);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden bg-secondary", aspect, className)}>
      <div ref={shiftRef} className="absolute inset-x-0 -top-[9%] h-[118%]">
        <div ref={scaleRef} className="h-full w-full">
          <Image
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            fittingType="fill"
            loading={priority ? "eager" : "lazy"}
          />
        </div>
      </div>
    </div>
  );
}