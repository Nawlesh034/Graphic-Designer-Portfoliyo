import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabel index="05">Testimonials</SectionLabel>
          </div>
          <div className="md:col-span-6 md:col-start-5">
            <h2 className="max-w-2xl text-[clamp(1.7rem,3.2vw,3rem)] font-light leading-[1.14] tracking-[-0.035em]">
              Good collaboration is better when it is shared.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              This space is for honest feedback from people I have worked with. I only share
              testimonials with their permission.
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-11 md:pt-1">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-border bg-background px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Share feedback
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <Reveal y={24}>
          <article className="mt-16 flex min-h-56 flex-col justify-between gap-8 border border-border bg-secondary p-7 md:mt-24 md:min-h-64 md:flex-row md:items-end md:p-10">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                A note for collaborators
              </p>
              <h3 className="mt-5 text-2xl font-light leading-snug tracking-[-0.025em] md:text-3xl">
                Have we worked together? I would love to hear about your experience.
              </h3>
            </div>
            <a
              href="#contact"
              className="inline-flex shrink-0 items-center gap-2 text-sm transition-colors hover:text-accent"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
