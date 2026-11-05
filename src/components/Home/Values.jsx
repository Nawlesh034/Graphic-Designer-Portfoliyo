import { MessageSquare, Receipt, Shuffle, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";

const VALUES = [
  {
    icon: Sparkles,
    title: "Crafted, not copied",
    text: "No two problems are alike, so no two solutions should be. Every project gets its own thinking, not a template with your name on it.",
  },
  {
    icon: Shuffle,
    title: "Stay flexible",
    text: "Briefs change and timelines move. I stay adaptable without losing the thread of what the work is trying to do.",
  },
  {
    icon: MessageSquare,
    title: "Clear collaboration",
    text: "You see progress as it happens, with updates that tell you what changed, what's next and what I need from you.",
  },
  {
    icon: Receipt,
    title: "Transparent pricing",
    text: "A clear breakdown of phases and costs before we start — no hidden line items and no surprise invoices at the end.",
  },
];

export default function Values() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabel index="05">How I Work</SectionLabel>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            <TextReveal
              as="h2"
              mode="words"
              text="Together we make good partners — worry-free collaboration, honest advice and work that turns ambition into something people can actually see."
              stagger={0.025}
              duration={1}
              start="top 85%"
              className="text-[clamp(1.35rem,2.7vw,2.4rem)] font-light leading-[1.35] tracking-[-0.02em]"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.07} y={26}>
              <div className="h-full rounded-3xl bg-secondary p-6 md:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <value.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-lg font-normal tracking-[-0.01em]">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}