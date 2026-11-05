import { useLayoutEffect, useRef } from "react";
import SectionLabel from "@/components/SectionLabel";
import { gsap, reducedMotion } from "@/lib/motion";

const STATEMENT = "CLARITY — CRAFT — CONNECTION — ";

export default function Achievement() {
  const sectionRef = useRef(null);
  const shadeRef = useRef(null);
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const shade = shadeRef.current;
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!section || !shade || !marquee || !track || reducedMotion()) return undefined;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(shade, { opacity: 0.16, ease: "none", duration: 1 }, 0)
        .to(marquee, { y: () => -window.innerHeight * 0.7, ease: "none", duration: 1 }, 0)
        .to(track, { x: () => -window.innerWidth * 0.75, ease: "none", duration: 1 }, 0);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="achievement-section relative flex min-h-[100svh] items-center overflow-hidden">
      <div ref={shadeRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
      <div className="achievement-content w-full">
        <div className="container-editorial">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-2">
              <SectionLabel index="04">Achievement</SectionLabel>
            </div>
            <div className="md:col-span-8 md:col-start-4">
              <h2 className="max-w-3xl text-[clamp(1.7rem,4vw,3.8rem)] font-light leading-[1.14] tracking-[-0.04em]">
                Good work grows from listening closely, thinking clearly and making with care.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Each project is an opportunity to turn a distinct point of view into a visual
                language that feels clear, useful and memorable.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={marqueeRef}
          className="achievement-marquee relative z-20 mt-16 border-y border-border bg-background py-5 md:mt-24 md:py-8"
          aria-label="Clarity, craft, connection"
        >
          <div
            ref={trackRef}
            aria-hidden="true"
            className="flex w-max whitespace-nowrap font-bold uppercase leading-[0.82] tracking-[-0.065em]"
          >
            {[0, 1, 2].map((copy) => (
              <span key={copy} className="px-4 text-[clamp(4rem,14vw,12rem)]">
                {STATEMENT}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
