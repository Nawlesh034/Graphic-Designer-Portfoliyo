import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import TextReveal from "@/components/TextReveal";
import useSectionNav from "@/Hooks/useSectionNav";

const SERVICES = [
  {
    n: "01",
    title: "Brand Identity",
    text: "Complete visual systems — marks, colour, type, tone and the guidelines that keep it all consistent.",
  },
  {
    n: "02",
    title: "Logo Design",
    text: "Marks built to survive scale, print and time, from a single curve to a full family of lock-ups.",
  },
  {
    n: "03",
    title: "Art Direction",
    text: "Photography, styling and visual language for launches, campaigns and product ranges.",
  },
  {
    n: "04",
    title: "Typography",
    text: "Custom lettering, type pairing and the hierarchy that makes a layout feel inevitable.",
  },
  {
    n: "05",
    title: "Editorial Design",
    text: "Books, magazines and long-form layouts designed for pace, rhythm and comfortable reading.",
  },
  {
    n: "06",
    title: "Digital Campaigns",
    text: "Launch assets and campaign systems built for screens without losing their print discipline.",
  },
];

export default function Services() {
  const go = useSectionNav();

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-2">
            <SectionLabel index="03">Services</SectionLabel>
          </div>
          <div className="md:col-span-9 md:col-start-4">
            <TextReveal
              as="h2"
              mode="words"
              text="From a first logo to a complete brand world, choose the support your next chapter needs."
              stagger={0.03}
              duration={1}
              start="top 85%"
              className="text-[clamp(1.35rem,2.7vw,2.4rem)] font-light leading-[1.35] tracking-[-0.02em]"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05} y={26}>
              <button
                type="button"
                onClick={() => go("contact")}
                data-cursor="link"
                className="group flex h-full w-full flex-col items-start rounded-3xl border border-border p-6 text-left transition-colors duration-500 hover:border-accent md:p-7"
              >
                <span className="text-sm text-muted-foreground">( {service.n} )</span>
                <h3 className="mt-5 text-xl font-normal tracking-[-0.01em] md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.text}
                </p>
                <span className="mt-6 text-sm text-muted-foreground transition-colors duration-500 group-hover:text-accent">
                  ( Enquire )
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}