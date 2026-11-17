import { useLayoutEffect, useRef } from "react";
import { BookOpen, Coffee, Flower2, Leaf, Music2, Sparkles } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap, reducedMotion } from "@/lib/motion";

const IDENTITIES = [
  { name: "Aurelia", category: "Botanical care", icon: Flower2, style: "serif" },
  { name: "Terra Firma", category: "Coffee roasters", icon: Coffee, style: "wide" },
  { name: "Long Form", category: "Independent journal", icon: BookOpen, style: "editorial" },
  { name: "Nocturne", category: "Sound & culture", icon: Music2, style: "bold" },
  { name: "Field Notes", category: "Outdoor journal", icon: Leaf, style: "serif" },
  { name: "Marlé", category: "Fashion studio", icon: Sparkles, style: "wide" },
];

const ROWS = [
  { order: [0, 1, 2, 3, 4, 5], direction: -1 },
  { order: [3, 4, 5, 0, 1, 2], direction: 1 },
  { order: [1, 2, 3, 4, 5, 0], direction: -1 },
];

function IdentitySet({ order, duplicate = false }) {
  return (
    <div className="identity-wall-set" aria-hidden={duplicate}>
      {order.map((identityIndex) => {
        const identity = IDENTITIES[identityIndex];
        const Mark = identity.icon;

        return (
          <div
            key={identity.name}
            className={`identity-wall-tile identity-wall-tile--${identity.style}`}
          >
            <Mark className="identity-wall-mark" aria-hidden="true" />
            <span className="identity-wall-name">{identity.name}</span>
            <span className="identity-wall-category">{identity.category}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function IdentityWall() {
  const sectionRef = useRef(null);
  const tracksRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const tracks = tracksRef.current.filter(Boolean);
    if (!section || !tracks.length || reducedMotion()) return undefined;

    const context = gsap.context(() => {
      const speedSetters = tracks.map((track, index) => {
        const direction = ROWS[index].direction;
        const loop = gsap.fromTo(
          track,
          { xPercent: direction < 0 ? 0 : -50 },
          {
            xPercent: direction < 0 ? -50 : 0,
            duration: 48,
            ease: "none",
            repeat: -1,
          }
        );

        return gsap.quickTo(loop, "timeScale", {
          duration: 0.35,
          ease: "power2.out",
        });
      });

      const resetSpeed = () => speedSetters.forEach((setSpeed) => setSpeed(1));

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (trigger) => {
          const speed = gsap.utils.clamp(0.75, 2.2, 1 + Math.abs(trigger.getVelocity()) / 1400);
          speedSetters.forEach((setSpeed) => setSpeed(speed));
        },
        onLeave: resetSpeed,
        onLeaveBack: resetSpeed,
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="identity-wall overflow-hidden py-16 md:py-24"
      aria-labelledby="identity-wall-title"
    >
      <div className="container-editorial">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Identity explorations
            </p>
            <h2
              id="identity-wall-title"
              className="max-w-3xl text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.92] tracking-[-0.065em]"
            >
              Small worlds.
              <span className="text-accent"> Distinct marks.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
            A moving collection of original identity concepts from the portfolio—not commissioned
            client logos or endorsements.
          </p>
        </div>
      </div>

      <div className="identity-wall-rows mt-10 space-y-3 md:mt-14 md:space-y-4" aria-hidden="true">
        {ROWS.map((row, index) => (
          <div className="identity-wall-row" key={index}>
            <div
              ref={(element) => {
                tracksRef.current[index] = element;
              }}
              className="identity-wall-track"
            >
              <IdentitySet order={row.order} />
              <IdentitySet order={row.order} duplicate />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
