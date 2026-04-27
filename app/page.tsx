import ContactCard from "./components/ContactCard";
import CvCard from "./components/CvCard";

import EducationCard from "./components/EducationCard";
import ExperienceCard from "./components/ExperienceCard";
import Hero from "./components/Hero";
// import NowPlayingCard from "./components/NowPlayingCard";
import ProjectsCard from "./components/ProjectsCard";
import StackCard from "./components/StackCard";

export default function Home() {
  return (
    <main id="top" className="relative mx-auto w-full max-w-[920px] px-5 sm:px-6 pt-24 pb-16">
      <div id="about" />
      <Hero />

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div id="experience" className="sm:col-span-1">
          <ExperienceCard />
        </div>
        <div className="sm:col-span-1 grid grid-cols-1 gap-4">
          <EducationCard />
          <CvCard />
        </div>

        <div id="projects" className="sm:col-span-2">
          <ProjectsCard />
        </div>

        {/* <div className="sm:col-span-1">
          <NowPlayingCard />
        </div> */}
        <div id="contact" className="sm:col-span-2">
          <ContactCard />
        </div>

        <div id="stack" className="sm:col-span-2">
          <StackCard />
        </div>
      </section>


    </main>
  );
}
