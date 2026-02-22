import HeroExperience from "@/components/site/HeroExperience";
import AboutSection from "@/components/site/sections/AboutSection";
import SkillsSection from "@/components/site/sections/SkillsSection";
import CertificationsSection from "@/components/site/sections/CertificationsSection";
import ProjectsSection from "@/components/site/sections/ProjectsSection";
import ResumeSection from "@/components/site/sections/ResumeSection";
import ContactSection from "@/components/site/sections/ContactSection";

const Index = () => {
  return (
    <main id="top" className="bg-background text-foreground">
      <h1 className="sr-only">Pranadeep Devasani — AI/ML Engineer</h1>
      <HeroExperience />

      <div className="mx-auto max-w-6xl px-6">
        <AboutSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
        <div className="pb-20" />
      </div>
    </main>
  );
};

export default Index;

