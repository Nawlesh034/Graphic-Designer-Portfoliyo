import { useLayoutEffect, useRef } from "react";
import PillButton from "@/components/PillButton";
import TypingLine from "@/components/TypingLine";
import { gsap, reducedMotion, scrollToId } from "@/lib/motion";

const PHRASES = [
  "Graphic Designer.",
  "Visual Storyteller.",
  "Brand Identity Designer.",
  "Creative Thinker.",
];

export default function Hero() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(section.querySelectorAll("[data-hero-item]")), {
        opacity: 0,
        y: 26,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(Array.from(section.querySelectorAll("[data-hero-line]")), {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.14,
        delay: 0.12,
        ease: "power4.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="overflow-hidden pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="container-editorial">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p
            data-hero-item
            className="flex items-center gap-2.5 text-xs uppercase tracking-[0.16em] text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Open to new projects
          </p>
          <p
            data-hero-item
            className="hidden text-xs uppercase tracking-[0.16em] text-muted-foreground md:block"
          >
            Independent designer · Available worldwide
          </p>
        </div>

        <h1
          data-hero-item
          className="mt-12 max-w-[70rem] text-[clamp(2.6rem,10vw,8.5rem)] font-light uppercase leading-[0.92] tracking-[-0.065em] md:mt-20"
        >
          <span className="line-mask block">
            <span className="inline-block" data-hero-line>I turn ideas into</span>
          </span>
          <span className="line-mask block text-accent">
            <span className="inline-block" data-hero-line>visual stories.</span>
          </span>
        </h1>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
          <p
            data-hero-item
            className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5"
          >
            I’m Aman, an independent graphic designer creating thoughtful identities and visual
            systems for brands, businesses and ideas ready to grow.
          </p>
          <p
            data-hero-item
            className="text-xl text-accent md:col-span-5 md:col-start-8 md:justify-self-end md:text-2xl"
          >
            <TypingLine phrases={PHRASES} />
          </p>
        </div>

        <div
          data-hero-item
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-border pt-7 md:mt-20"
        >
          <PillButton as="button" onClick={() => scrollToId("work")}>
            Explore selected work
          </PillButton>
          <p className="text-sm text-muted-foreground">Brand identity · Editorial · Packaging · Campaigns</p>
        </div>
        <button
          type="button"
          onClick={() => scrollToId("work")}
          className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to selected work"
        >
          <span className="h-px w-8 bg-accent" />
          Scroll to explore
        </button>
      </div>
    </section>
  );
}