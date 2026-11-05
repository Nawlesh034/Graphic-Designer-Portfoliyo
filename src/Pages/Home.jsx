import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Process from "@/components/Home/Process";
import SelectedWorks from "@/components/Home/SelectedWorks";
import Services from "@/components/Home/Services";
import StackedSections from "@/components/StackedSections";
import Values from "@/components/Home/Values";

export default function Home() {
  return (
    <>
      <StackedSections>
        <Hero />
        <About />
        <SelectedWorks />
        <Services />
      </StackedSections>
      <MarqueeStrip />
      <Process />
      <Values />
      <Contact />
    </>
  );
}