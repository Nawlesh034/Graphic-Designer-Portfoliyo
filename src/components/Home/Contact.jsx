import { useLayoutEffect, useRef } from "react";
import PillButton from "@/components/PillButton";
import SectionLabel from "@/components/SectionLabel";
import { gsap, reducedMotion } from "@/lib/motion";

const CONTACT_EMAIL = "hello@example.com";

export default function Contact() {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel || reducedMotion()) return undefined;

    const context = gsap.context(() => {
      const intro = panel.querySelectorAll("[data-contact-intro]");
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 8%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          panel,
          { yPercent: 28, scale: 0.94, borderTopLeftRadius: 36, borderTopRightRadius: 36 },
          {
            yPercent: 0,
            scale: 1,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        .fromTo(
          intro,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, stagger: 0.14, ease: "power3.out", duration: 0.6 },
          0.2
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative z-40 overflow-hidden">
      <div ref={panelRef} className="relative bg-[#14171c] py-20 text-background md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-32 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl"
      />
      <div className="container-editorial relative">
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/15 pb-6">
          <SectionLabel
            index="09"
            className="[&>span:nth-child(2)]:text-background/55 [&>span:last-child]:text-background/70"
          >
            Contact
          </SectionLabel>
          <p className="text-xs uppercase tracking-[0.16em] text-background/50">
            Have a good one in mind?
          </p>
        </div>

        <h2 data-contact-intro className="mt-10 max-w-6xl text-[clamp(3rem,10vw,9rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
          Let&apos;s make
          <br />
          <span className="text-accent">something</span> meaningful.
        </h2>

        <div data-contact-intro className="mt-12 grid gap-10 border-t border-white/15 pt-8 md:mt-16 md:grid-cols-12 md:gap-8 md:pt-10">
          <div className="md:col-span-6">
            <p className="text-sm text-background/55">Start a conversation</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Project%20enquiry`}
              data-cursor="link"
              className="mt-3 inline-block break-all text-[clamp(1.4rem,3.8vw,3rem)] font-light tracking-[-0.045em] transition-colors duration-300 hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="mt-7">
              <PillButton
                variant="accent"
                href={`mailto:${CONTACT_EMAIL}?subject=Project%20enquiry`}
              >
                Send a project enquiry
              </PillButton>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="text-sm text-background/55">A good place to start</p>
            <p className="mt-3 max-w-md text-base leading-relaxed text-background/80">
              Tell me what you&apos;re building, who it&apos;s for and what you&apos;d like design to
              help you achieve. A rough idea is more than enough to get started.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-background/50">
              Share your timeline or budget if you have one. We can work out the rest together.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}