import { useLayoutEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import ProjectCard from "@/components/Home/ProjectCard";
import { projects } from "@/lib/projects";
import { gsap, reducedMotion } from "@/lib/motion";

const FILTERS = [
  { label: "All work", matches: () => true },
  { label: "Identity", matches: (project) => project.services.some((service) => service.toLowerCase().includes("identity")) },
  { label: "Packaging", matches: (project) => project.services.includes("Packaging") },
  { label: "Editorial", matches: (project) => project.services.some((service) => service.toLowerCase().includes("editorial")) },
  { label: "Campaign", matches: (project) => project.services.some((service) => service.toLowerCase().includes("campaign")) },
];

export default function SelectedWorks() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("All work");
  const currentFilter = FILTERS.find((filter) => filter.label === activeFilter) ?? FILTERS[0];
  const visibleProjects = projects.filter(currentFilter.matches);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery || reducedMotion()) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        gallery,
        { xPercent: 8, autoAlpha: 0 },
        {
          xPercent: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 35%",
            scrub: true,
          },
        }
      );

      const panel = section.closest(".stack-panel");
      if (panel) {
        gsap.fromTo(
          panel,
          { scale: 1, borderRadius: 0 },
          {
            scale: 0.9,
            borderRadius: 28,
            ease: "none",
            transformOrigin: "center top",
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="overflow-x-clip py-20 md:py-28">
      <div className="container-editorial">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="02">Selected Works</SectionLabel>
            <TextReveal
              as="h2"
              lines={["Selected works."]}
              className="mt-6 text-[clamp(1.9rem,3.8vw,3.1rem)] font-light tracking-[-0.03em]"
            />
          </div>
          <Reveal className="max-w-sm" delay={0.1}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Independent concept studies exploring how visual identities can work across
              packaging, print and digital. Open a project to see its brief and visual direction.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2 border-y border-border py-4" aria-label="Filter selected work">
          <span className="mr-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">Explore by</span>
          {FILTERS.map((filter) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => setActiveFilter(filter.label)}
              aria-pressed={activeFilter === filter.label}
              className={`rounded-full border px-4 py-2 text-xs transition-colors duration-300 ${
                activeFilter === filter.label
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground" aria-live="polite">
            {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        <div ref={galleryRef} className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-12">
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}