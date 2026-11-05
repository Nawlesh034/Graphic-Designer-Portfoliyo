import About from "@/components/Home/About";
import Achievement from "@/components/Home/Achievement";
import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import ProjectCave from "@/components/ProjectCave";
import Process from "@/components/Home/Process";
import ProjectMotion from "@/components/Home/ProjectMotion";
import SelectedWorks from "@/components/Home/SelectedWorks";
import Services from "@/components/Home/Services";
import StackedSections from "@/components/StackedSections";
import Testimonials from "@/components/Home/Testimonials";
import Values from "@/components/Home/Values";

export default function Home() {
  return (
    <>
      <StackedSections>
        <Hero />
        <About />
        <SelectedWorks />
      </StackedSections>
      <Services />
      <ProjectCave />
      <Achievement />
      <Testimonials />
      <ProjectMotion />
      <Values />
      <Process />
      <Contact />
    </>
  );
}