import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import PillButton from "@/components/PillButton";
import SectionLabel from "@/components/SectionLabel";
import { projects } from "@/lib/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) return <Navigate to="/#work" replace />;

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const sections = [
    { title: "The brief", content: project.challenge },
    { title: "Visual direction", content: project.approach },
    { title: "In application", content: project.outcome },
  ];

  return (
    <article className="container-editorial pb-20 pt-32 md:pb-28 md:pt-40">
      <Link
        to="/#work"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <SectionLabel>{project.industry} · {project.type}</SectionLabel>
          <h1 className="mt-6 text-[clamp(2.5rem,7vw,6rem)] font-light leading-[1.05] tracking-[-0.04em]">
            {project.title}
            <span className="text-accent">.</span>
          </h1>
        </div>
        <ul className="flex flex-wrap gap-2 md:col-span-4 md:justify-end">
          {project.services.map((service) => (
            <li
              key={service}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
            >
              {service}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 aspect-[4/3] overflow-hidden rounded-3xl bg-secondary md:mt-16">
        <Image
          key={project.slug}
          src={project.image}
          alt={project.imageAlt}
          className="h-full w-full object-cover"
          fittingType="fill"
          loading="eager"
        />
      </div>

      <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
        <h2 className="text-sm text-muted-foreground md:col-span-2">Overview</h2>
        <p className="text-xl font-light leading-relaxed tracking-[-0.01em] md:col-span-8 md:col-start-4 md:text-2xl">
          {project.overview}
        </p>
      </div>

      <div className="mt-14 border-t border-border md:mt-20">
        {sections.map((section, index) => (
          <section
            key={section.title}
            className="grid gap-4 border-b border-border py-7 md:grid-cols-12 md:gap-8 md:py-9"
          >
            <h2 className="text-sm text-muted-foreground md:col-span-2">
              ( 0{index + 1} ) {section.title}
            </h2>
            <p className="max-w-2xl leading-relaxed text-foreground/80 md:col-span-7 md:col-start-4">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-16 flex flex-col gap-8 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-24">
        <PillButton href="mailto:hello@example.com?subject=Project%20enquiry">Have a project in mind?</PillButton>
        <Link
          to={`/work/${nextProject.slug}`}
          className="group inline-flex items-center gap-4 text-right"
        >
          <span>
            <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Next project
            </span>
            <span className="mt-1 block text-lg">{nextProject.title}</span>
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </article>
  );
}