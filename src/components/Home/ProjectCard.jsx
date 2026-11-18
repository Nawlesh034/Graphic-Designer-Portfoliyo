import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { finePointer, gsap, reducedMotion } from "@/lib/motion";
import { Image } from "@/components/ui/image";

function attachTilt(card, frame, image) {
  gsap.set(frame, { transformPerspective: 1200, transformOrigin: "center center" });

  const rotateX = gsap.quickTo(frame, "rotationX", { duration: 0.8, ease: "power3.out" });
  const rotateY = gsap.quickTo(frame, "rotationY", { duration: 0.8, ease: "power3.out" });
  const shiftX = gsap.quickTo(image, "xPercent", { duration: 1, ease: "power3.out" });
  const shiftY = gsap.quickTo(image, "yPercent", { duration: 1, ease: "power3.out" });

  const onMove = (event) => {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY(px * 3.5);
    rotateX(-py * 3.5);
    shiftX(-px * 3);
    shiftY(-py * 3);
  };

  const onLeave = () => {
    rotateX(0);
    rotateY(0);
    shiftX(0);
    shiftY(0);
  };

  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", onLeave);

  return () => {
    card.removeEventListener("mousemove", onMove);
    card.removeEventListener("mouseleave", onLeave);
  };
}

export default function ProjectCard({ project, index = 0 }) {
  const cardRef = useRef(null);
  const frameRef = useRef(null);
  const shiftRef = useRef(null);
  const imageRef = useRef(null);
  const metaRef = useRef(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const frame = frameRef.current;
    const shift = shiftRef.current;
    const image = imageRef.current;
    const meta = metaRef.current;
    if (!card || !frame || !shift || !image || !meta) return undefined;

    const reduced = reducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(frame, { clipPath: "inset(0% 0% 0% 0%)" });
        return;
      }

      gsap.set(frame, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(image, { scale: 1.12 });

      gsap
        .timeline({ scrollTrigger: { trigger: card, start: "top 85%", once: true } })
        .to(frame, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" }, 0)
        .to(image, { scale: 1, duration: 1.6, ease: "power4.out" }, 0)
        .from(
          Array.from(meta.children),
          { opacity: 0, y: 16, duration: 0.8, stagger: 0.08, ease: "power3.out" },
          0.3
        );

      gsap.fromTo(
        shift,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, card);

    const detach = finePointer() && !reduced ? attachTilt(card, frame, image) : null;

    return () => {
      ctx.revert();
      if (detach) detach();
    };
  }, []);

  const layout = [
    "md:col-span-12",
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-12",
  ];
  const wide = index === 0 || index === 5;

  return (
    <article ref={cardRef} className={`group ${layout[index % layout.length]}`}>
      <Link
        to={`/work/${project.slug}`}
        aria-label={`View ${project.title} concept project`}
        data-cursor="view"
        className="block"
      >
        <div
          ref={frameRef}
          className={`relative overflow-hidden rounded-3xl bg-secondary ${
            wide ? "aspect-[16/8]" : "aspect-[4/3]"
          }`}
        >
          <div ref={shiftRef} className="absolute inset-x-0 -top-[6%] h-[112%]">
            <div ref={imageRef} className="h-full w-full">
              <Image
                src={project.image}
                alt={project.imageAlt}
                className="h-full w-full object-cover"
                fittingType="fill"
                loading={index < 2 ? "eager" : "lazy"}
              />
            </div>
          </div>

          <span className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="absolute bottom-5 left-5 translate-y-2 rounded-full bg-background/90 px-4 py-2 text-[10px] uppercase tracking-[0.18em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            View project
          </span>
        </div>

        <div ref={metaRef} className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="text-2xl font-normal tracking-[-0.01em]">{project.title}</h3>
            <p className="mt-1 text-base text-muted-foreground">
              {project.industry} · {project.type}
            </p>
          </div>
          <ul className="flex flex-wrap justify-end gap-2 pt-1">
            {project.services.slice(0, 2).map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}