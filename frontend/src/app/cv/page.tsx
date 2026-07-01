import type { Metadata } from 'next';
import CVPrintButton from '@/components/ui/CVPrintButton';

// SSG: pure static page, build time pe ek baar banti hai
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Muhammad Umar — CV',
};

const skills = {
  Frontend: ['Next.js 14+', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  Backend: ['NestJS', 'Node.js', 'Express.js', 'REST API', 'JWT Auth', 'WebSockets'],
  Database: ['MongoDB', 'Mongoose ODM'],
  Tools: ['Git & GitHub', 'Docker', 'Vercel', 'VS Code'],
};

const projects = [
  {
    name: 'Personal Portfolio Website',
    tech: 'Next.js · NestJS · MongoDB · TypeScript · Tailwind CSS · Three.js',
    desc: 'Full-stack portfolio with admin panel, project management system, meeting booking, JWT authentication, and 3D particle animations.',
    year: '2024',
  },
  {
    name: 'E-Commerce Platform',
    tech: 'React.js · Node.js · Express · MongoDB · JWT',
    desc: 'Complete e-commerce solution with product management, cart system, user authentication, and admin dashboard.',
    year: '2024',
  },
  {
    name: 'REST API Backend Systems',
    tech: 'NestJS · MongoDB · Mongoose · JWT · TypeScript',
    desc: 'Scalable RESTful APIs with role-based access control, data validation, and modular NestJS architecture.',
    year: '2023–2024',
  },
];

export default function CVPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#111' }}>
      {/* Toolbar — hidden on print */}
      <div className="print:hidden flex items-center justify-between max-w-4xl mx-auto px-6 py-4">
        <a
          href="/"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Back to Portfolio
        </a>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">Tip: Save as PDF from print dialog</span>
          <CVPrintButton />
        </div>
      </div>

      {/* CV Document */}
      <div
        className="max-w-4xl mx-auto bg-white shadow-xl print:shadow-none print:max-w-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {/* Header */}
        <div style={{ background: '#0f172a', color: 'white', padding: '40px 48px 32px' }}>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'Arial, sans-serif' }}>
                Muhammad Umar
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#38bdf8', marginTop: '4px', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>
                Full Stack Developer — MERN · Next.js · NestJS
              </p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.8', fontFamily: 'Arial, sans-serif' }}>
              <p>mrumar4722@gmail.com</p>
              <p>Pakistan — Open to Remote</p>
              <p>https://github.com/MuhammadUmar2132</p>
              <p>https://www.linkedin.com/in/muhammad-umar-727907256</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', padding: '0' }}>

          {/* Left column */}
          <div style={{ background: '#f8fafc', padding: '32px 28px', borderRight: '1px solid #e2e8f0' }}>

            {/* Skills */}
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '14px', fontFamily: 'Arial, sans-serif' }}>
                Technical Skills
              </h2>
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} style={{ marginBottom: '14px' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px', fontFamily: 'Arial, sans-serif' }}>
                    {category}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {items.map((skill) => (
                      <span
                        key={skill}
                        style={{ fontSize: '0.7rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Education */}
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '14px', fontFamily: 'Arial, sans-serif' }}>
                Education
              </h2>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b', fontFamily: 'Arial, sans-serif' }}>
                  Software Engineering
                </p>
                <p style={{ fontSize: '0.8rem', color: '#2563eb', fontFamily: 'Arial, sans-serif', marginTop: '2px' }}>
                  Superior University
                </p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'Arial, sans-serif' }}>
                  Lahore, Pakistan
                </p>
                <p style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'Arial, sans-serif', marginTop: '4px' }}>
                  2022 – 2026 · Completed
                </p>
              </div>
            </section>

            {/* Languages */}
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '14px', fontFamily: 'Arial, sans-serif' }}>
                Languages
              </h2>
              <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: '2', fontFamily: 'Arial, sans-serif' }}>
                <p>English — Professional</p>
                <p>Urdu — Native</p>
              </div>
            </section>

            {/* Stats */}
            <section>
              <h2 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '14px', fontFamily: 'Arial, sans-serif' }}>
                At a Glance
              </h2>
              {[
                { label: 'Projects Built', value: '10+' },
                { label: 'Years Coding', value: '2+' },
                { label: 'Technologies', value: '15+' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.78rem', color: '#475569', fontFamily: 'Arial, sans-serif' }}>{label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', fontFamily: 'Arial, sans-serif' }}>{value}</span>
                </div>
              ))}
            </section>
          </div>

          {/* Right column */}
          <div style={{ padding: '32px 36px' }}>

            {/* Summary */}
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>
                Professional Summary
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.75', fontFamily: 'Arial, sans-serif' }}>
                Passionate Full Stack Developer with 2+ years of experience building high-performance web
                applications using the MERN stack. Specialized in <strong>Next.js</strong> for SSR/SSG and{' '}
                <strong>NestJS</strong> for scalable backend APIs. I write clean, typed TypeScript code across
                the entire stack — from MongoDB schemas to pixel-perfect UIs. Graduated with a Bachelor's in Software
                Engineering from Superior University while actively shipping production-grade projects.
              </p>
            </section>

            {/* Projects */}
            <section style={{ marginBottom: '28px' }}>
              <h2 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '16px', fontFamily: 'Arial, sans-serif' }}>
                Projects
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {projects.map((project) => (
                  <div key={project.name} style={{ borderLeft: '3px solid #38bdf8', paddingLeft: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', fontFamily: 'Arial, sans-serif' }}>
                        {project.name}
                      </p>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'Arial, sans-serif', flexShrink: 0, marginLeft: '8px' }}>
                        {project.year}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: '#0284c7', marginTop: '2px', fontFamily: 'Arial, sans-serif' }}>
                      {project.tech}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px', lineHeight: '1.6', fontFamily: 'Arial, sans-serif' }}>
                      {project.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Core Competencies */}
            <section>
              <h2 style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', marginBottom: '12px', fontFamily: 'Arial, sans-serif' }}>
                Core Competencies
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {[
                  'Full Stack Architecture',
                  'RESTful API Design',
                  'JWT Authentication & Auth',
                  'MongoDB Schema Design',
                  'Component-Based UI (React)',
                  'Server-Side Rendering (Next.js)',
                  'NestJS Modular Backend',
                  'Git Workflow & Version Control',
                ].map((item) => (
                  <div
                    key={item}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#334155', fontFamily: 'Arial, sans-serif' }}
                  >
                    <span style={{ color: '#38bdf8', fontWeight: 900 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: '#f1f5f9', borderTop: '1px solid #e2e8f0', padding: '12px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'Arial, sans-serif' }}>
            Muhammad Umar · Full Stack Developer
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'Arial, sans-serif' }}>
            bakkahtransport@gmail.com · Pakistan
          </span>
        </div>
      </div>

      <div className="print:hidden h-10" />
    </div>
  );
}
