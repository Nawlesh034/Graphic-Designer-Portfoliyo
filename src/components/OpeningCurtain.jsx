import { useLayoutEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/motion";

export default function OpeningCurtain() {
  const curtainRef = useRef(null);
  const [visible, setVisible] = useState(() => !reducedMotion());

  useLayoutEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return undefined;

    if (reducedMotion()) return undefined;

    const cloth = curtain.querySelector("[data-curtain-cloth]");
    const mark = curtain.querySelector("[data-curtain-mark]");
    const context = gsap.context(() => {
      gsap.set(cloth, { transformOrigin: "100% 0%", transformPerspective: 1400 });
      gsap.timeline({
        delay: 0.35,
        onComplete: () => setVisible(false),
      })
        .to(mark, {
          autoAlpha: 0,
          scale: 0.9,
          duration: 1.3,
          ease: "power3.inOut",
        }, 0)
        .to(cloth, {
          xPercent: 110,
          yPercent: -6,
          rotationY: -62,
          rotationZ: -8,
          skewX: -5,
          scale: 0.9,
          duration: 1.3,
          ease: "power3.inOut",
        }, 0);
    }, curtain);

    return () => context.revert();
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={curtainRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
    >
      <div
        data-curtain-cloth
        className="opening-cloth absolute -inset-x-[8%] -top-[4%] h-[112%]"
      >
        <span className="opening-cloth-fold opening-cloth-fold--one" />
        <span className="opening-cloth-fold opening-cloth-fold--two" />
        <span className="opening-cloth-fold opening-cloth-fold--three" />
        <span className="opening-cloth-hem" />
      </div>
      <div
        data-curtain-mark
        className="absolute inset-0 flex items-center justify-center text-background"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
            A
          </span>
          <span className="text-xl font-medium tracking-[-0.03em]">Aman</span>
        </span>
      </div>
    </div>
  );
}
