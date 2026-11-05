import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { Image } from "@/components/ui/image";
import useSectionNav from "@/Hooks/useSectionNav";
import { gsap, reducedMotion } from "@/lib/motion";
import { projects } from "@/lib/projects";

const SERVICES = [
  {
    n: "01",
    title: "Brand Identity",
    text: "Complete visual systems — marks, colour, type, tone and the guidelines that keep it all consistent.",
  },
  {
    n: "02",
    title: "Logo Design",
    text: "Marks built to survive scale, print and time, from a single curve to a full family of lock-ups.",
  },
  {
    n: "03",
    title: "Art Direction",
    text: "Photography, styling and visual language for launches, campaigns and product ranges.",
  },
  {
    n: "04",
    title: "Typography",
    text: "Custom lettering, type pairing and the hierarchy that makes a layout feel inevitable.",
  },
  {
    n: "05",
    title: "Editorial Design",
    text: "Books, magazines and long-form layouts designed for pace, rhythm and comfortable reading.",
  },
  {
    n: "06",
    title: "Digital Campaigns",
    text: "Launch assets and campaign systems built for screens without losing their print discipline.",
  },
];

const PREVIEW_POSITIONS = [
  { left: "3%", top: "21%", rotation: "-7deg" },
  { left: "24%", top: "40%", rotation: "5deg" },
  { right: "4%", top: "18%", rotation: "6deg" },
  { left: "7%", top: "62%", rotation: "4deg" },
  { right: "23%", top: "48%", rotation: "-5deg" },
  { right: "5%", top: "72%", rotation: "7deg" },
];

export default function Services() {
  const go = useSectionNav();
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const [activeService, setActiveService] = useState(null);
  const previewProjects =
    activeService === null
      ? projects
      : projects.map((_, index) => projects[(index + activeService) % projects.length]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list || reducedMotion()) return undefined;

    const rows = Array.from(list.querySelectorAll("[data-service-row]"));
    const context = gsap.context(() => {
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { xPercent: 5 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 94%",
              end: "top 58%",
              scrub: 0.6,
            },
          }
        );
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services-panel relative overflow-hidden py-20 text-background md:py-28 ${
        activeService !== null ? "services-panel--active" : ""
      }`}
      onMouseLeave={() => setActiveService(null)}
    >
      <div className="services-previews" aria-hidden="true">
        {previewProjects.map((project, index) => (
          <div
            key={`${activeService ?? "idle"}-${index}-${project.slug}`}
            className="services-preview"
            style={{
              left: PREVIEW_POSITIONS[index].left,
              right: PREVIEW_POSITIONS[index].right,
              top: PREVIEW_POSITIONS[index].top,
              "--preview-rotation": PREVIEW_POSITIONS[index].rotation,
              "--preview-delay": `${index * 90}ms`,
            }}
          >
            <Image
              src={project.image}
              alt=""
              className="h-full w-full object-cover"
              fittingType="fill"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="container-editorial relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-background/20 pb-8">
          <div>
            <SectionLabel index="03" className="[&>span:last-child]:text-background/60">
              Services
            </SectionLabel>
            <h2 className="mt-8 max-w-2xl text-2xl font-light leading-snug tracking-[-0.02em] text-background/80 md:text-3xl">
              Clear thinking, made visible.
              <span className="text-accent"> What can we make together?</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-background/55">
            Choose a starting point. Each service can stand alone or become part of a larger system.
          </p>
        </div>

        <div ref={listRef} className="mt-8">
          {SERVICES.map((service) => (
            <button
              key={service.n}
              type="button"
              onClick={() => go("contact")}
              onMouseEnter={() => setActiveService(Number(service.n) - 1)}
              onFocus={() => setActiveService(Number(service.n) - 1)}
              onBlur={(event) => {
                if (!event.currentTarget.parentElement.contains(event.relatedTarget)) {
                  setActiveService(null);
                }
              }}
              data-service-row
              data-cursor="link"
              className={`group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-background/20 py-5 text-left transition-colors hover:text-accent sm:grid-cols-[4rem_1fr_minmax(12rem,0.7fr)_auto] md:gap-6 md:py-7 ${
                activeService === Number(service.n) - 1 ? "service-row--active" : ""
              }`}
            >
              <span className="text-xs text-background/45 md:text-sm">{service.n}</span>
              <span className="service-title text-[clamp(1.45rem,5.2vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.055em]">
                {service.title}
              </span>
              <span className="hidden max-w-sm text-sm leading-relaxed text-background/50 sm:block">
                {service.text}
              </span>
              <ArrowUpRight
                className="h-5 w-5 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}