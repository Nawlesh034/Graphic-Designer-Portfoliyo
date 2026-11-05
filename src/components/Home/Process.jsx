import { ArrowDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";

const STEPS = [
  {
    number: "01",
    title: "Listen",
    description: "We start with a focused conversation about your goals, audience and what success should look like.",
  },
  {
    number: "02",
    title: "Explore",
    description: "Research and a clear creative direction give the project a strong point of view before design begins.",
  },
  {
    number: "03",
    title: "Make",
    description: "We build, refine and test the work together, keeping the important decisions visible at every step.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "You receive polished final assets and practical guidelines that make the system easy to use.",
  },
];

export default function Process() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabel index="04">The Process</SectionLabel>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            <TextReveal
              as="h2"
              mode="words"
              text="Good work comes from a clear process, honest conversations and room to explore."
              stagger={0.035}
              className="text-[clamp(1.35rem,2.7vw,2.4rem)] font-light leading-[1.35] tracking-[-0.02em]"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06} y={24}>
              <article className="h-full border-t border-border pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">( {step.number} )</span>
                  {index < STEPS.length - 1 ? (
                    <ArrowDown className="h-4 w-4 text-accent" aria-hidden="true" />
                  ) : null}
                </div>
                <h3 className="mt-8 text-xl font-normal tracking-[-0.01em] md:text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}