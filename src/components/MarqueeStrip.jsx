import { useLayoutEffect, useRef } from "react";
import { Image } from "@/components/ui/image";
import { gsap, reducedMotion } from "@/lib/motion";
import { projects } from "@/lib/projects";

const STRIP = [projects[1], projects[4], projects[0], projects[3], projects[2], projects[5]];

/**
 * A slow, paused-on-hover strip of artwork that separates the sections.
 */
export default function MarqueeStrip() {
  const stripRef = useRef(null);

  useLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;

    const cards = Array.from(strip.querySelectorAll("[data-marquee-card]"));
    if (reducedMotion()) {
      strip.classList.add("is-expanded");
      return () => strip.classList.remove("is-expanded");
    }

    const center = strip.getBoundingClientRect().left + strip.clientWidth / 2;
    const offsets = cards.map((card) => {
      const bounds = card.getBoundingClientRect();
      return center - (bounds.left + bounds.width / 2);
    });

    cards.forEach((card, index) => {
      card.style.transform = `translate3d(${offsets[index]}px, 0, 0) rotate(${index % 2 === 0 ? -5 : 5}deg) scale(0.72)`;
      card.style.transformOrigin = "center center";
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          x: (index) => offsets[index],
          scale: 0.72,
          rotation: (index) => (index % 2 === 0 ? -5 : 5),
        },
        {
          x: 0,
          scale: 1,
          rotation: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: { each: 0.045, from: "center" },
          clearProps: "transform",
          onComplete: () => strip.classList.add("is-expanded"),
          scrollTrigger: {
            trigger: strip,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, strip);

    return () => {
      ctx.revert();
      cards.forEach((card) => {
        card.style.removeProperty("transform");
        card.style.removeProperty("transform-origin");
      });
      strip.classList.remove("is-expanded");
    };
  }, []);

  return (
    <div ref={stripRef} className="marquee relative overflow-hidden border-y border-border py-8 md:py-12">
      <div className="animate-marquee flex w-max gap-4 md:gap-6">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 gap-4 md:gap-6" aria-hidden={pass === 1}>
            {STRIP.map((project, i) => (
              <div
                key={`${pass}-${project.slug}-${i}`}
                data-marquee-card
                className="h-28 w-36 shrink-0 overflow-hidden rounded-2xl bg-secondary md:h-40 md:w-52"
              >
                <Image
                  src={project.image}
                  alt={pass === 0 ? project.imageAlt : ""}
                  className="h-full w-full object-cover"
                  fittingType="fill"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}