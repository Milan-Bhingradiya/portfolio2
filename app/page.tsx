import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();

  return (
    <main className="mx-auto max-w-3xl px-6">
      <Hero profile={content.profile} stats={content.stats} />
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        <Experience experience={content.experience} />
        <Projects projects={content.projects} github={content.profile.github} />
        <Skills skillGroups={content.skillGroups} />
      </div>
      <Footer
        profile={content.profile}
        achievements={content.achievements}
        education={content.education}
      />
    </main>
  );
}
