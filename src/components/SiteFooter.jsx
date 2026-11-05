import { useLayoutEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import useSectionNav from "@/Hooks/useSectionNav";
import { gsap, reducedMotion, scrollToTop } from "@/lib/motion";

const LINKS = [
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];

const CONTACT_EMAIL = "hello@example.com";

export default function SiteFooter() {
  const footerRef = useRef(null);
  const panelRef = useRef(null);
  const go = useSectionNav();

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const panel = panelRef.current;
    if (!footer || !panel || reducedMotion()) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        panel,
        {
          yPercent: 100,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          boxShadow: "0 -24px 80px rgb(0 0 0 / 0.3)",
        },
        {
          yPercent: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          boxShadow: "0 0 0 rgb(0 0 0 / 0)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "top top",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        }
      );
    }, footer);

    return () => context.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-50 -mt-[100svh] min-h-[100svh]"
    >
      <div
        ref={panelRef}
        className="min-h-[100svh] overflow-hidden border-t border-white/10 bg-[#0b0c0e] text-background will-change-transform"
      >
        <div className="container-editorial">
          <div className="flex items-center justify-between gap-6 border-b border-white/15 py-6">
            <p className="text-xs text-white/55">Independent graphic designer</p>
            <p className="text-xs text-white/55">Brand identity · Editorial · Visual design</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-5 py-10 md:gap-x-6 md:py-12">
            <span className="font-[Impact,'Arial_Narrow',sans-serif] text-[clamp(2rem,7.4vw,7.5rem)] font-black uppercase leading-[0.85] tracking-[-0.055em]">
              Product
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent text-accent-foreground md:h-16 md:w-16">
              <ArrowUpRight className="h-7 w-7 md:h-9 md:w-9" aria-hidden="true" />
            </span>
            <span className="font-[Impact,'Arial_Narrow',sans-serif] text-[clamp(2rem,7.4vw,7.5rem)] font-black uppercase leading-[0.85] tracking-[-0.055em]">
              Design
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent text-accent-foreground md:h-16 md:w-16">
              <ArrowUpRight className="h-7 w-7 md:h-9 md:w-9" aria-hidden="true" />
            </span>
            <span className="font-[Impact,'Arial_Narrow',sans-serif] text-[clamp(2rem,7.4vw,7.5rem)] font-black uppercase leading-[0.85] tracking-[-0.055em]">
              Partner
            </span>
          </div>

          <div className="grid gap-12 border-t border-white/15 py-10 md:grid-cols-12 md:gap-8 md:py-14">
            <div className="md:col-span-6">
              <p className="text-xs text-white/55">Have a project in mind?</p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Project%20enquiry`}
                className="mt-4 inline-flex items-center gap-3 text-[clamp(1.7rem,4vw,3.8rem)] font-light tracking-[-0.045em] transition-colors hover:text-accent"
              >
                {CONTACT_EMAIL}
                <ArrowUpRight className="h-6 w-6 shrink-0 md:h-8 md:w-8" aria-hidden="true" />
              </a>
            </div>

            <nav aria-label="Footer navigation" className="md:col-span-4 md:col-start-8">
              <p className="mb-5 text-xs text-white/55">Explore</p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => go(link.id)}
                      className="text-sm text-white/75 transition-colors hover:text-background"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/15 py-5 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()}</span>
            <span>Brand identity · Editorial · Visual design</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 self-start transition-colors hover:text-background sm:self-auto"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
