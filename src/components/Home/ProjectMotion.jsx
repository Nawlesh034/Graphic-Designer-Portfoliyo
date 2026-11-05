import { useLayoutEffect, useRef } from "react";
import { Image } from "@/components/ui/image";
import SectionLabel from "@/components/SectionLabel";
import { gsap, reducedMotion } from "@/lib/motion";
import { projects } from "@/lib/projects";

const ROWS = [
  { projects: [...projects, ...projects], distance: -0.3 },
  { projects: [...projects.slice(2), ...projects.slice(0, 2), ...projects], distance: 0.24 },
  { projects: [...projects.slice(4), ...projects.slice(0, 4), ...projects], distance: -0.2 },
];

export default function ProjectMotion() {
  const rowsRef = useRef(null);
  const tracksRef = useRef([]);
  const sequenceRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const rows = rowsRef.current;
    const sequence = sequenceRef.current;
    const tracks = tracksRef.current;
    const cards = cardsRef.current;
    if (!rows || !sequence || !tracks.length || !cards.length) return undefined;

    const context = gsap.context(() => {
      gsap.set(cards, { autoAlpha: 1 });
      if (reducedMotion()) {
        gsap.set(cards.slice(1), { autoAlpha: 0 });
        return;
      }

      tracks.forEach((track, index) => {
        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => window.innerWidth * ROWS[index].distance,
            ease: "none",
            scrollTrigger: {
              trigger: rows,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sequence,
          start: "top top",
          end: () => {
            const stagger = Math.min(0.16, 1.2 / cards.length);
            return `+=${window.innerHeight * (1.32 + (cards.length - 1) * stagger)}`;
          },
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        const corner = index % 4;
        const startX = corner === 0 || corner === 2 ? -1 : 1;
        const startY = corner < 2 ? 1 : -1;
        const endX = -startX;
        const endY = -startY;
        const stagger = Math.min(0.16, 1.2 / cards.length);
        const startTime = index * stagger;
        const convergenceDuration = 0.48;
        const divergenceDuration = 0.62;
        const angle = (index / cards.length) * Math.PI * 2;
        const centerX = () => Math.cos(angle) * window.innerWidth * 0.1;
        const centerY = () => Math.sin(angle) * window.innerHeight * 0.09;

        const getCornerPosition = (horizontal, vertical) => {
          const rect = sequence.getBoundingClientRect();
          const cardWidth = card.offsetWidth;
          const cardHeight = card.offsetHeight;
          return {
            x: horizontal * (rect.width / 2 + cardWidth / 2),
            y: vertical * (rect.height / 2 + cardHeight / 2),
          };
        };

        gsap.set(card, {
          x: () => getCornerPosition(startX, startY).x,
          y: () => getCornerPosition(startX, startY).y,
          rotation: startX * -8,
          scale: 0.88,
          autoAlpha: 0,
        });

        timeline
          .to(
            card,
            {
              autoAlpha: 1,
              ease: "none",
              duration: 0.16,
            },
            startTime
          )
          .to(
            card,
            {
              x: centerX,
              y: centerY,
              rotation: 0,
              scale: 1,
              ease: "none",
              duration: convergenceDuration,
            },
            startTime
          )
          .to(
            card,
            {
              x: () => getCornerPosition(endX, endY).x,
              y: () => getCornerPosition(endX, endY).y,
              rotation: endX * 8,
              scale: 0.84,
              ease: "none",
              duration: divergenceDuration,
            },
            startTime + convergenceDuration
          )
          .to(
            card,
            {
              autoAlpha: 0,
              ease: "none",
              duration: 0.16,
            },
            startTime + convergenceDuration + divergenceDuration - 0.08
          );

        const sizeScale = index === 0 ? 0.9 : index === 1 || index === 2 ? 1.12 : 1;
          const widthVw = (130 / cards.length) * sizeScale;
        gsap.set(card, {
            width: `${Math.min(184, (window.innerWidth * widthVw) / 100)}px`,
        });
      });
    }, rows);

    return () => context.revert();
  }, []);

  return (
    <>
      <section ref={rowsRef} className="overflow-hidden bg-secondary py-12 md:py-16">
        <div className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">A moving selection of concept work</p>
        </div>
        <div className="space-y-3 md:space-y-5">
          {ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="overflow-hidden">
              <div ref={(element) => { tracksRef.current[rowIndex] = element; }} className="flex w-max gap-3 md:gap-5">
                {row.projects.map((project, index) => (
                  <article
                    key={`${rowIndex}-${project.slug}-${index}`}
                    className="w-[66vw] shrink-0 sm:w-[42vw] lg:w-[27vw]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-background">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        className="h-full w-full object-cover"
                        fittingType="fill"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {project.title} <span aria-hidden="true">·</span> Concept project
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        ref={sequenceRef}
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
      >
        <SectionLabel index="06" className="absolute left-6 top-8 z-20 md:left-12 md:top-10">
          In focus
        </SectionLabel>
        <h3 className="pointer-events-none absolute z-0 max-w-[90vw] text-center text-[clamp(2.6rem,9vw,8rem)] font-black uppercase leading-[0.82] tracking-[-0.07em]">
          Make something memorable
        </h3>

        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-label="Concept projects moving diagonally">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              ref={(element) => { cardsRef.current[index] = element; }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              aria-label={`${project.title}, concept project`}
            >
              <div className="aspect-[4/3] overflow-hidden border-[5px] border-background bg-secondary shadow-2xl md:border-[8px]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-full w-full object-cover"
                  fittingType="fill"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{project.title}</span>
                <span>Concept project</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
