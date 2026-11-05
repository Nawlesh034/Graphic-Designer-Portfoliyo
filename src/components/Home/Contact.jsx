import PillButton from "@/components/PillButton";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";

const CONTACT_EMAIL = "hello@example.com";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container-editorial">
        <SectionLabel index="06">Contact</SectionLabel>

        <TextReveal
          as="h2"
          lines={["Let's make", "something meaningful."]}
          className="mt-8 text-[clamp(2.1rem,6vw,4.6rem)] font-light leading-[1.08] tracking-[-0.03em]"
        />

        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="text-sm text-muted-foreground">Start a conversation</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Project%20enquiry`}
              data-cursor="link"
              className="mt-4 inline-block text-2xl tracking-[-0.02em] transition-colors duration-500 hover:text-accent md:text-3xl"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="mt-8">
              <PillButton variant="solid" href={`mailto:${CONTACT_EMAIL}?subject=Project%20enquiry`}>
                Send a project enquiry
              </PillButton>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="text-sm text-muted-foreground">A good place to start</p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/80">
              Tell me what you’re building, who it’s for and what you’d like design to help you
              achieve. If you have a timeline or budget in mind, include those too.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              No polished brief needed — a few lines is enough to get the conversation started.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}