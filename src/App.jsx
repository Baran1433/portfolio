import { AnimatedParticlesBackground } from "./components/AnimatedParticlesBackground";

import { SectionReveal } from "./components/ui/SectionReveal";

import { PageLoader } from "./components/ui/PageLoader";

import { MobileSideLinks } from "./components/layout/MobileSideLinks";

import { Navbar } from "./components/layout/Navbar";

import { ScrollProgress } from "./components/layout/ScrollProgress";

import { SideEmail } from "./components/layout/SideEmail";

import { SideSocial } from "./components/layout/SideSocial";

import { About } from "./components/sections/About";

import { Certificates } from "./components/sections/Certificates";

import { Contact } from "./components/sections/Contact";

import { Education } from "./components/sections/Education";

import { Experience } from "./components/sections/Experience";

import { Footer } from "./components/sections/Footer";

import { Hero } from "./components/sections/Hero";

import { Projects } from "./components/sections/Projects";

import { Skills } from "./components/sections/Skills";



export default function App() {

  return (

    <>


      <AnimatedParticlesBackground />



      <div className="app-content">

        <PageLoader />

        <ScrollProgress />

        <Navbar />

        <SideSocial />

        <SideEmail />

        <main>

          <SectionReveal><Hero /></SectionReveal>

          <SectionReveal><About /></SectionReveal>

          <SectionReveal><Skills /></SectionReveal>

          <SectionReveal><Projects /></SectionReveal>

          <SectionReveal><Experience /></SectionReveal>

          <SectionReveal><Education /></SectionReveal>

          <SectionReveal><Certificates /></SectionReveal>

          <SectionReveal><Contact /></SectionReveal>

        </main>

        <MobileSideLinks />

        <Footer />

      </div>

    </>

  );

}

