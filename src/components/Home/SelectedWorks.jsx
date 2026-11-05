import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import ProjectCard from "@/components/Home/ProjectCard";
import { projects } from "@/lib/projects";

export default function SelectedWorks() {
  return (
    <section id="work" className="py-20 md:py-28">
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

        <div className="mt-12 grid gap-x-8 gap-y-14 md:mt-16 md:grid-cols-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}