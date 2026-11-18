import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const [hoverService, setHoverService] = useState(null);
  const [scrollService, setScrollService] = useState(null);
  const activeService = scrollService ?? hoverService;
  const previewProjects =
    hoverService === null
      ? projects
      : projects.map((_, index) => projects[(index + hoverService) % projects.length]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list || reducedMotion()) return undefined;

    const rows = Array.from(list.querySelectorAll("[data-service-row]"));
    const intro = Array.from(section.querySelectorAll("[data-services-intro]"));
    let scrollActiveService = null;

    const updateScrollActiveService = () => {
      const viewportCenter = window.innerHeight / 2;
      const activeIndex = rows.findIndex((row) => {
        const bounds = row.getBoundingClientRect();
        return bounds.top <= viewportCenter && bounds.bottom >= viewportCenter;
      });

      if (activeIndex !== scrollActiveService) {
        scrollActiveService = activeIndex < 0 ? null : activeIndex;
        setScrollService(scrollActiveService);
        if (scrollActiveService !== null) setHoverService(null);
      }
    };

    const context = gsap.context(() => {
      gsap.fromTo(
        section,
        { yPercent: 24, scale: 0.96, borderTopLeftRadius: 36, borderTopRightRadius: 36 },
        {
          yPercent: 0,
          scale: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 10%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.from(intro, {
        autoAlpha: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });

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

      ScrollTrigger.create({
        trigger: list,
        start: "top bottom",
        end: "bottom top",
        onEnter: updateScrollActiveService,
        onEnterBack: updateScrollActiveService,
        onUpdate: updateScrollActiveService,
        onLeave: () => {
          scrollActiveService = null;
          setScrollService(null);
        },
        onLeaveBack: () => {
          scrollActiveService = null;
          setScrollService(null);
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`services-panel relative py-20 text-background md:py-28 ${
        activeService !== null ? "services-panel--active" : ""
      } ${hoverService !== null ? "services-panel--hovered" : ""}`}
      onMouseLeave={() => setHoverService(null)}
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
            <h2 data-services-intro className="mt-8 max-w-2xl text-2xl font-light leading-snug tracking-[-0.02em] text-background/80 md:text-3xl">
              Clear thinking, made visible.
              <span className="text-accent"> What can we make together?</span>
            </h2>
          </div>
          <p data-services-intro className="max-w-xs text-sm leading-relaxed text-background/55">
            Choose a starting point. Each service can stand alone or become part of a larger system.
          </p>
        </div>

        <div className="services-list-layout relative mt-8 md:pl-28">
          <div className="services-hand-track" aria-hidden="true">
            <svg
              key={activeService ?? "idle"}
              className={`services-scroll-hand ${
                activeService !== null ? "services-scroll-hand--visible" : ""
              }`}
              viewBox="0 0 150 150"
              fill="none"
            >
              <defs>
                <linearGradient id="services-hand-gradient" x1="20" y1="24" x2="118" y2="137" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f4f2ee" />
                  <stop offset="0.5" stopColor="#aeb6bd" />
                  <stop offset="1" stopColor="#525a62" />
                </linearGradient>
              </defs>
              <g transform="translate(150 0) rotate(90)">
                <path
                  d="M30 127c-8-4-13-10-17-18L5 91c-3-6-1-13 4-15s10 1 13 6l9 15-3-63c0-9 6-15 14-15s13 6 13 14l3 49 5-30c2-8 9-11 15-9s9 8 7 15l-5 29 8-20c3-8 10-10 16-7s7 9 4 16l-8 23 5-8c4-6 11-7 16-3s4 10 1 16l-10 18c-7 13-18 19-31 19H54c-10 0-18-5-24-14Z"
                  fill="url(#services-hand-gradient)"
                  stroke="hsl(0 0% 100% / 0.78)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="m58 82 20 3m2 2 17 5m2 8 11 5"
                  stroke="hsl(0 0% 100% / 0.48)"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </div>
          <div ref={listRef}>
            {SERVICES.map((service) => (
              <button
                key={service.n}
                type="button"
                onClick={() => go("contact")}
                onMouseEnter={() => setHoverService(Number(service.n) - 1)}
                onFocus={() => setHoverService(Number(service.n) - 1)}
                onBlur={(event) => {
                  if (!event.currentTarget.parentElement.contains(event.relatedTarget)) {
                    setHoverService(null);
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
      </div>
    </section>
  );
}