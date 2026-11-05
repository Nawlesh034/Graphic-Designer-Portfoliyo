import { ArrowUp } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import useSectionNav from "@/Hooks/useSectionNav";
import { scrollToTop } from "@/lib/motion";

const LINKS = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

export default function SiteFooter() {
  const go = useSectionNav();

  return (
    <footer className="border-t border-border/70">
      <div className="container-editorial grid gap-10 py-14 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <p className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[11px] font-medium text-accent-foreground">
              A
            </span>
            <span className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">Aman</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Independent graphic designer
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-5 md:col-start-7">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              data-cursor="link"
              className="text-[10px] uppercase tracking-[0.26em] text-muted-foreground transition-colors duration-500 hover:text-foreground md:text-[11px]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="md:col-span-1 md:justify-self-end">
          <MagneticButton
            as="button"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border transition-colors duration-500 hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowUp className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>

      <div className="container-editorial flex flex-col gap-3 border-t border-border/70 py-6 text-[10px] uppercase tracking-[0.26em] text-muted-foreground md:flex-row md:items-center md:justify-between md:text-[11px]">
        <span>© {new Date().getFullYear()} Aman</span>
        <span>Brand identity · Editorial · Visual design</span>
      </div>
    </footer>
  );
}