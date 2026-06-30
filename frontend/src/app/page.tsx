import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import type { Project } from '@/types/project';

// ISR: page har 60 second baad background me rebuild hogi
export const revalidate = 60;

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API}/projects`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects initialProjects={projects} />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
