'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, Layers, Code2, Database, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { getProjects } from '@/lib/api';
import type { Project } from '@/types/project';

const CATEGORIES = ['all', 'fullstack', 'frontend', 'backend', 'mobile', 'other'] as const;

const categoryIcons: Record<string, React.ReactNode> = {
  all: <Layers size={14} />,
  fullstack: <Globe size={14} />,
  frontend: <Code2 size={14} />,
  backend: <Database size={14} />,
  mobile: <Star size={14} />,
  other: <Star size={14} />,
};

const DEMO_PROJECTS: Project[] = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application with product management, shopping cart, order tracking, and Stripe payment integration. Admin dashboard with analytics.',
    techStack: ['Next.js', 'NestJS', 'MongoDB', 'Stripe', 'TypeScript', 'Tailwind CSS'],
    category: 'fullstack',
    featured: true,
    order: 1,
    githubUrl: 'https://github.com',
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: '2',
    title: 'Admin Analytics Dashboard',
    description: 'Real-time analytics dashboard with interactive charts, user management, role-based access control, and data export functionality.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Framer Motion'],
    category: 'frontend',
    featured: true,
    order: 2,
    githubUrl: 'https://github.com',
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: '3',
    title: 'REST API Microservice',
    description: 'Scalable RESTful API with JWT authentication, rate limiting, role-based guards, Swagger documentation, and MongoDB integration.',
    techStack: ['NestJS', 'MongoDB', 'TypeScript', 'Swagger', 'JWT'],
    category: 'backend',
    featured: false,
    order: 3,
    githubUrl: 'https://github.com',
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: '4',
    title: 'Portfolio CMS',
    description: 'A headless CMS for portfolio management with an admin panel to manage projects, meetings, and site content dynamically.',
    techStack: ['Next.js', 'NestJS', 'MongoDB', 'TypeScript'],
    category: 'fullstack',
    featured: false,
    order: 4,
    githubUrl: 'https://github.com',
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: '5',
    title: 'Real-time Chat App',
    description: 'WebSocket-powered chat application with rooms, typing indicators, message history, and user authentication.',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    category: 'fullstack',
    featured: false,
    order: 5,
    githubUrl: 'https://github.com',
    createdAt: '',
    updatedAt: '',
  },
  {
    _id: '6',
    title: 'Task Management API',
    description: 'CRUD API for task management with teams, priorities, deadlines, and real-time notifications via WebSocket.',
    techStack: ['NestJS', 'MongoDB', 'TypeScript', 'WebSocket'],
    category: 'backend',
    featured: false,
    order: 6,
    githubUrl: 'https://github.com',
    createdAt: '',
    updatedAt: '',
  },
];

const categoryGradients: Record<string, string> = {
  fullstack: 'from-cyan-600/20 to-purple-600/15 dark:from-cyan-500/20 dark:to-purple-500/15',
  frontend:  'from-blue-600/20 to-cyan-600/15 dark:from-blue-500/20 dark:to-cyan-500/15',
  backend:   'from-purple-600/20 to-pink-600/15 dark:from-purple-500/20 dark:to-pink-500/15',
  mobile:    'from-emerald-600/20 to-cyan-600/15 dark:from-emerald-500/20 dark:to-cyan-500/15',
  other:     'from-gray-400/15 to-gray-600/15 dark:from-gray-500/15 dark:to-gray-700/15',
};

// Extracted tilt card logic for performance
function TiltCard({ children, className, onMouseEnter, onMouseLeave }: any) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 10;
    setRotateX(((y - centerY) / centerY) * -maxTilt);
    setRotateY(((x - centerX) / centerX) * maxTilt);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setRotateX(0);
    setRotateY(0);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      className={className}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ initialProjects }: { initialProjects?: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [projects, setProjects] = useState<Project[]>(initialProjects?.length ? initialProjects : DEMO_PROJECTS);
  const [filter, setFilter] = useState<string>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (initialProjects?.length) return; // server ne diye hain, client fetch skip
    getProjects()
      .then((data) => { if (data.length > 0) setProjects(data); })
      .catch(() => {});
  }, [initialProjects]);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const featured = projects.filter((p) => p.featured)[0];

  return (
    <section id="projects" className="relative py-24 sm:py-32 xl:py-40 bg-background overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-40 pointer-events-none" />
      <div className="absolute top-10 right-10 text-[10rem] md:text-[15rem] font-black text-foreground/5 leading-none select-none pointer-events-none">02</div>
      <div className="absolute bottom-0 right-0 w-[40rem] h-[30rem] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-16 h-1 bg-cyan-500 rounded-full" />
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase font-bold">My Work</span>
          </div>
          <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
            Things I have{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              built
            </span>
          </h2>
          <p className="text-muted-foreground mt-6 text-lg max-w-xl font-medium">
            Real projects. Real code. From full-stack platforms to robust backend APIs.
          </p>
        </motion.div>

        {/* Featured project */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-16"
          >
            <TiltCard
              onMouseEnter={() => setHovered('featured')}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-3xl bg-card border border-border shadow-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-cyan-500/20 transition-all duration-500"
            >
              <div className="grid lg:grid-cols-2">
                <div className={`h-64 lg:h-full bg-linear-to-br ${categoryGradients[featured.category] || categoryGradients.other} relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  {featured.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="text-center transform group-hover:scale-105 transition-transform duration-700">
                      <div className="text-8xl font-black text-foreground/10 font-mono select-none">{featured.title.slice(0, 2).toUpperCase()}</div>
                    </div>
                  )}
                  <span className="absolute top-6 left-6 px-4 py-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center gap-2 backdrop-blur-md">
                    <Star size={12} className="fill-amber-500 dark:fill-amber-400" /> Featured Project
                  </span>
                  <span className="absolute top-6 right-6 px-4 py-1.5 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full capitalize backdrop-blur-md">
                    {featured.category}
                  </span>
                </div>

                <div className="p-8 lg:p-12 bg-card">
                  <h3 className="text-foreground font-black text-3xl mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">{featured.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">{featured.description}</p>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {featured.techStack.map((t) => (
                      <span key={t} className="px-4 py-1.5 text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {featured.githubUrl && (
                      <a href={featured.githubUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 text-sm font-bold border-2 border-border text-foreground rounded-xl hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300">
                        <GithubIcon size={18} /> View Code
                      </a>
                    )}
                    {featured.liveUrl && (
                      <a href={featured.liveUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 text-sm font-bold bg-foreground text-background rounded-xl hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-all duration-300 shadow-xl">
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                filter === cat
                  ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black shadow-lg shadow-cyan-500/20 border-transparent'
                  : 'bg-card border border-border text-muted-foreground hover:border-cyan-500/40 hover:text-foreground hover:shadow-sm'
              }`}
            >
              {categoryIcons[cat]} {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <TiltCard
                  className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:border-cyan-500/40 hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                  onMouseEnter={() => setHovered(project._id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Image / placeholder */}
                  <div className={`relative h-56 bg-linear-to-br ${categoryGradients[project.category] || categoryGradients.other} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    {project.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <span className="text-6xl font-black text-foreground/10 font-mono select-none transform group-hover:scale-110 transition-transform duration-700">{project.title.slice(0, 2).toUpperCase()}</span>
                    )}

                    {/* Hover overlay */}
                    <AnimatePresence>
                      {hovered === project._id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center gap-4"
                        >
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer"
                              className="p-4 rounded-full bg-foreground text-background hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300 shadow-xl">
                              <GithubIcon size={20} />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer"
                              className="p-4 rounded-full bg-foreground text-background hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300 shadow-xl">
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {project.featured && (
                      <span className="absolute top-4 right-4 text-[10px] px-3 py-1 font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                        <Star size={10} className="fill-amber-500 dark:fill-amber-400" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-mono font-bold uppercase tracking-widest">{project.category}</span>
                      <div className="flex gap-3">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <GithubIcon size={16} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-foreground font-black text-xl mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1 font-medium">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] px-2.5 py-1 font-mono font-semibold bg-secondary text-secondary-foreground rounded-md border border-border">
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] px-2.5 py-1 font-mono font-semibold bg-card text-muted-foreground border border-border rounded-md">+{project.techStack.length - 4}</span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-card border-2 border-border text-foreground font-bold rounded-2xl hover:border-cyan-500/40 hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <GithubIcon size={22} />
            View All Projects on GitHub
            <ExternalLink size={16} className="text-muted-foreground" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
