import { useLayoutEffect, useRef } from "react";
import ParallaxImage from "@/components/ParallaxImage";
import PillButton from "@/components/PillButton";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import useSectionNav from "@/Hooks/useSectionNav";
import { gsap, reducedMotion } from "@/lib/motion";

const STUDIO_IMAGE =
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85";

const CAPABILITIES = [
  "Brand systems & identity",
  "Art direction",
  "Editorial & print",
  "Typography",
  "Packaging",
  "Campaign design",
];

export default function About() {
  const sectionRef = useRef(null);
  const go = useSectionNav();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = section?.closest(".stack-panel");
    if (!section || !panel || reducedMotion()) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        panel,
        { xPercent: 12, yPercent: 10, scale: 0.96, autoAlpha: 0 },
        {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 98%",
            end: "top 45%",
            scrub: true,
          },
        }
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="overflow-x-clip py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabel index="01">About</SectionLabel>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            <TextReveal
              as="h2"
              mode="words"
              text="Good design makes the right things easier to see. I build clear, distinctive visual identities that help ideas connect with the people they’re for."
              stagger={0.018}
              duration={1}
              start="top 85%"
              className="text-[clamp(1.35rem,2.7vw,2.4rem)] font-light leading-[1.35] tracking-[-0.02em]"
            />
            <Reveal className="mt-10" delay={0.1}>
              <PillButton as="button" onClick={() => go("contact")}>
                Work with me
              </PillButton>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <ParallaxImage
              src={STUDIO_IMAGE}
              alt="A bright, minimal creative workspace"
              aspect="aspect-[4/5]"
              className="rounded-3xl"
              strength={6}
            />
            <Reveal
              className="mt-4 flex items-center justify-between text-sm text-muted-foreground"
              delay={0.2}
            >
              <span>Working practice</span>
              <span>Independent · Worldwide</span>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                I’m Aman, an independent graphic designer focused on brand identity, typography
                and visual storytelling. I help turn a business or product’s point of view into a
                visual language people can recognise and use.
              </p>
              <p>
                I start by getting clear on the audience, the goal and what makes the idea different.
                From there, I create a considered design system that works across the places your
                customers meet it — from a screen to a printed page.
              </p>
            </Reveal>

            <Reveal className="mt-8 rounded-2xl bg-secondary p-6 md:p-8" delay={0.1}>
              <p className="text-lg leading-snug tracking-[-0.01em] md:text-xl">
                Thoughtful design doesn’t just make a business look better. It helps people understand what makes it matter.
              </p>
            </Reveal>

            <Reveal className="mt-10" delay={0.15}>
              <p className="text-sm text-muted-foreground">Capabilities</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {CAPABILITIES.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-4 py-2 text-sm text-foreground/80 transition-colors duration-500 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}