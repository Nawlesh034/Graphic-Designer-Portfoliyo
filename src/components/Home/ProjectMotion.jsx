import { useLayoutEffect, useRef } from "react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import ScrollHandoff from "@/components/ScrollHandoff";
import SectionLabel from "@/components/SectionLabel";
import { gsap, reducedMotion } from "@/lib/motion";
import { projects } from "@/lib/projects";

const ROWS = [
  { projects: [...projects, ...projects], direction: -1 },
  {
    projects: [
      ...projects.slice(2),
      ...projects.slice(0, 2),
      ...projects.slice(2),
      ...projects.slice(0, 2),
    ],
    direction: 1,
  },
  {
    projects: [
      ...projects.slice(4),
      ...projects.slice(0, 4),
      ...projects.slice(4),
      ...projects.slice(0, 4),
    ],
    direction: -1,
  },
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
        return;
      }

      tracks.forEach((track, index) => {
        const distance = track.scrollWidth / 2;
        const direction = ROWS[index].direction;

        gsap.set(track, { x: direction > 0 ? -distance : 0 });
        gsap.to(track, {
          x: direction > 0 ? 0 : -distance,
          duration: distance / 68,
          ease: "none",
          repeat: -1,
          repeatDelay: 0,
        });
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
          scrub: true,
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
      <ScrollHandoff>
      <section ref={rowsRef} className="overflow-hidden bg-secondary py-12 md:py-16">
        <Reveal className="container-editorial mb-8 flex flex-wrap items-end justify-between gap-5" y={24}>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Concept work</p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,3.2rem)] font-light leading-none tracking-[-0.05em]">
              Good ideas in motion.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A moving selection of identity, packaging, editorial and campaign studies.
          </p>
        </Reveal>
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
      </ScrollHandoff>

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

        <div className="project-motion-cards pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-label="Concept projects moving diagonally">
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
