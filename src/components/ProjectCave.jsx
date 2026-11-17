import { useLayoutEffect, useRef } from "react";
import { Image } from "@/components/ui/image";
import { gsap, reducedMotion } from "@/lib/motion";
import { projects } from "@/lib/projects";

const FLOATING_PROJECTS = [
  { index: 0, className: "cave-card cave-card--one", x: -0.32, y: 0.26, rotation: -7 },
  { index: 1, className: "cave-card cave-card--two", x: 0.32, y: 0.24, rotation: 6 },
  { index: 2, className: "cave-card cave-card--three", x: -0.32, y: -0.24, rotation: 5 },
  { index: 3, className: "cave-card cave-card--four", x: 0.32, y: -0.26, rotation: -5 },
  { index: 4, className: "cave-card cave-card--five", x: -0.24, y: 0.3, rotation: 7 },
  { index: 5, className: "cave-card cave-card--six", x: 0.24, y: -0.3, rotation: -6 },
];

export default function ProjectCave() {
  const sceneRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef(null);
  const tunnelRef = useRef(null);
  const backdropRef = useRef(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    const cards = cardsRef.current?.querySelectorAll(".cave-card");
    const tunnelRings = tunnelRef.current?.querySelectorAll(".cave-tunnel-ring");
    const backdrop = backdropRef.current;
    if (!scene || !panel || !content || !cards?.length || !tunnelRings?.length || !backdrop || reducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(panel, {
        yPercent: 62,
        scale: 0.48,
        rotationX: 8,
        borderRadius: 28,
        transformOrigin: "center center",
      });
      gsap.set(content, { autoAlpha: 0, scale: 0.82, y: 32 });
      gsap.set(cards, { autoAlpha: 0, scale: 0.62 });
      gsap.set(tunnelRings, { autoAlpha: 0, scale: 0.22, rotation: -8 });
      gsap.set(backdrop, { autoAlpha: 0, scale: 0.75 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scene,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          panel,
          {
            yPercent: 0,
            scale: 1.08,
            rotationX: 0,
            borderRadius: 0,
            ease: "power2.out",
            duration: 0.34,
          },
          0
        )
        .to(content, { autoAlpha: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.18 }, 0.18)
        .to(content, { autoAlpha: 0, scale: 0.92, y: -24, ease: "power2.in", duration: 0.12 }, 0.49)
        .to(panel, { scale: 3.4, autoAlpha: 0, ease: "power2.in", duration: 0.36 }, 0.56)
        .to(tunnelRings, {
          autoAlpha: 0.65,
          scale: 1.15,
          rotation: 0,
          stagger: 0.035,
          ease: "power2.out",
          duration: 0.22,
        }, 0.42)
        .to(tunnelRings, {
          scale: 4.2,
          autoAlpha: 0,
          stagger: 0.025,
          ease: "power2.in",
          duration: 0.35,
        }, 0.67)
        .to(backdrop, { autoAlpha: 1, scale: 1, ease: "none", duration: 0.2 }, 0.72)
        .to(backdrop, { scale: 1.6, autoAlpha: 0, ease: "power2.in", duration: 0.25 }, 0.9);

      FLOATING_PROJECTS.forEach((card, index) => {
        const cardStart = 0.12 + index * 0.045;
        const xDistance = () => window.innerWidth * card.x;
        const yDistance = () => window.innerHeight * card.y;

        gsap.set(cards[index], {
          autoAlpha: 0,
          scale: 0.62,
          x: () => -xDistance() * 0.65,
          y: () => -yDistance() * 0.65,
        });

        timeline.to(
          cards[index],
          {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: card.rotation,
            ease: "power1.out",
            duration: 0.36,
          },
          cardStart
        );
        timeline.to(
          cards[index],
          {
            autoAlpha: 0,
            scale: 1.2,
            x: xDistance,
            y: yDistance,
            rotation: card.rotation * -2,
            ease: "power1.in",
            duration: 0.24,
          },
          0.52 + index * 0.035
        );
      });
    }, scene);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sceneRef}
      className="project-cave relative isolate flex h-[100svh] min-h-[38rem] items-center justify-center overflow-hidden"
      aria-label="Selected design concepts"
    >
      <p ref={backdropRef} className="cave-backdrop" aria-hidden="true">
        IDEAS TAKE SHAPE
      </p>

      <div ref={tunnelRef} className="cave-tunnel" aria-hidden="true">
        <span className="cave-tunnel-ring" />
        <span className="cave-tunnel-ring" />
        <span className="cave-tunnel-ring" />
      </div>

      <div ref={panelRef} className="cave-panel absolute inset-[8%] bg-background">
        <div ref={contentRef} className="cave-panel-content">
          <p className="text-xs uppercase tracking-[0.2em] text-accent sm:text-sm">
            Independent design practice
          </p>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.4rem,8vw,7.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.06em]">
            Ideas take shape through thoughtful design.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            A closer look at selected concept work across identity, packaging, editorial and campaign design.
          </p>
        </div>
      </div>

      <div ref={cardsRef} className="cave-card-layer" aria-hidden="true">
        {FLOATING_PROJECTS.map((card) => {
          const project = projects[card.index];
          return (
            <div key={project.slug} className={card.className}>
              <Image
                src={project.image}
                alt=""
                className="h-full w-full object-cover"
                fittingType="fill"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      <p className="cave-scroll-hint absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Scroll to explore
      </p>
    </section>
  );
}
