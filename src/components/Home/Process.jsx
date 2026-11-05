import { useLayoutEffect, useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { gsap, reducedMotion } from "@/lib/motion";

const STEPS = [
  {
    number: "01",
    title: "Listen",
    description: "We start with a focused conversation about your goals, audience and what success should look like.",
  },
  {
    number: "02",
    title: "Explore",
    description: "Research and a clear creative direction give the project a strong point of view before design begins.",
  },
  {
    number: "03",
    title: "Make",
    description: "We build, refine and test the work together, keeping the important decisions visible at every step.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "You receive polished final assets and practical guidelines that make the system easy to use.",
  },
];

export default function Process() {
  const sceneRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  const ringsRef = useRef(null);
  const outroRef = useRef(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const content = contentRef.current;
    const cards = cardsRef.current;
    const rings = ringsRef.current?.querySelectorAll(".cave-tunnel-ring");
    const outro = outroRef.current;
    if (!scene || !content || !cards.length || !rings?.length || !outro) return undefined;

    const context = gsap.context(() => {
      if (reducedMotion()) {
        gsap.set(cards, { clearProps: "all" });
        gsap.set(outro, { autoAlpha: 0 });
        return;
      }

      gsap.set(content, { autoAlpha: 1 });
      gsap.set(cards, { autoAlpha: 0, y: 80, scale: 0.78, rotation: 0 });
      gsap.set(rings, { autoAlpha: 0, scale: 0.2, rotation: -12 });
      gsap.set(outro, { autoAlpha: 0, scale: 0.72, y: 40 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(rings, {
          autoAlpha: 0.58,
          scale: 1.15,
          rotation: 0,
          stagger: 0.035,
          ease: "power2.out",
          duration: 0.18,
        }, 0)
        .to(rings, {
          autoAlpha: 0.28,
          scale: 2.2,
          rotation: 12,
          stagger: 0.025,
          ease: "none",
          duration: 0.58,
        }, 0.24);

      cards.forEach((card, index) => {
        const fromLeft = index % 2 === 0;
        const fromTop = index < 2;
        const start = 0.12 + index * 0.1;

        timeline
          .fromTo(
            card,
            {
              autoAlpha: 0,
              x: fromLeft ? -120 : 120,
              y: fromTop ? -70 : 70,
              scale: 0.74,
              rotation: fromLeft ? -6 : 6,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              ease: "power2.out",
              duration: 0.16,
            },
            start
          )
          .to(
            card,
            {
              autoAlpha: 0,
              x: fromLeft ? 150 : -150,
              y: fromTop ? 150 : -150,
              scale: 2.4,
              rotation: fromLeft ? 8 : -8,
              ease: "power3.in",
              duration: 0.26,
            },
            0.58 + index * 0.035
          );
      });

      timeline
        .to(content, {
          autoAlpha: 0,
          scale: 1.42,
          y: -55,
          ease: "power3.in",
          duration: 0.28,
        }, 0.68)
        .to(outro, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.16,
        }, 0.78)
        .to(outro, {
          autoAlpha: 0,
          scale: 2.2,
          y: -45,
          ease: "power3.in",
          duration: 0.22,
        }, 0.92)
        .to(rings, { autoAlpha: 0, scale: 5.2, ease: "power3.in", duration: 0.28 }, 0.78);
    }, scene);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sceneRef}
      className="relative isolate flex h-[100svh] min-h-[42rem] items-center justify-center overflow-hidden bg-[#101113] text-background"
      aria-label="Design process"
    >
      <div ref={ringsRef} className="cave-tunnel" aria-hidden="true">
        <span className="cave-tunnel-ring" />
        <span className="cave-tunnel-ring" />
        <span className="cave-tunnel-ring" />
      </div>

      <p className="cave-backdrop" aria-hidden="true">LISTEN · MAKE · DELIVER</p>

      <div ref={contentRef} className="container-editorial relative z-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabel
              index="07"
              className="[&>span:nth-child(2)]:text-background/55 [&>span:last-child]:text-background/70"
            >
              The Process
            </SectionLabel>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            <h2 className="max-w-5xl text-[clamp(2.4rem,6.2vw,6rem)] font-black uppercase leading-[0.94] tracking-[-0.065em]">
              A thoughtful process. A more memorable result.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <article
              key={step.number}
              ref={(element) => { cardsRef.current[index] = element; }}
              className="min-h-64 border border-white/15 bg-[#101113]/85 p-5 backdrop-blur-sm md:min-h-72 md:p-6"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {step.number}
                </span>
                <ArrowDownRight className="h-5 w-5 text-accent" aria-hidden="true" />
              </div>
              <h3 className="mt-8 text-2xl font-medium tracking-[-0.035em] md:text-3xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/60">{step.description}</p>
            </article>
          ))}
        </div>
      </div>

      <h3
        ref={outroRef}
        className="pointer-events-none absolute z-20 max-w-[90vw] text-center text-[clamp(2.5rem,9vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]"
      >
        Let&apos;s make it matter
      </h3>

      <p className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-background/50">
        Scroll to move forward
      </p>
    </section>
  );
}
