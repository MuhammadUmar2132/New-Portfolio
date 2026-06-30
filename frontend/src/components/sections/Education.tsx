'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, BookOpen, Award, CheckCircle } from 'lucide-react';

const timeline = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Software Engineering',
    place: 'Superior University, Lahore',
    year: '2023 – 2027',
    badge: 'In Progress',
    badgeColor: 'text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    desc: 'Studying software engineering fundamentals — data structures, algorithms, OOP, databases, and modern web technologies.',
    highlights: ['Data Structures & Algorithms', 'Software Design Patterns', 'Database Systems', 'Web Technologies'],
    color: 'cyan',
  },
  {
    icon: BookOpen,
    title: 'Full Stack Web Development',
    place: 'Self-taught + Online Platforms',
    year: '2022 – Present',
    badge: 'Ongoing',
    badgeColor: 'text-purple-700 dark:text-purple-400 bg-purple-500/10 border-purple-500/30',
    desc: 'Mastered the MERN stack + Next.js + NestJS through hands-on project building, documentation, and structured learning paths.',
    highlights: ['Next.js & React Mastery', 'NestJS Backend Architecture', 'TypeScript Across Stack', 'MongoDB & Mongoose'],
    color: 'purple',
  },
  {
    icon: Award,
    title: 'Intermediate — Pre-Engineering',
    place: 'Government College',
    year: '2021 – 2023',
    badge: 'Completed',
    badgeColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    desc: 'Completed FSc Pre-Engineering with a strong foundation in mathematics, physics, and analytical thinking.',
    highlights: ['Mathematics', 'Physics', 'Analytical Thinking', 'Problem Solving'],
    color: 'emerald',
  },
];

const colorMap = {
  cyan:    { dot: 'bg-cyan-500 dark:bg-cyan-400',    border: 'border-cyan-500/30',    text: 'text-cyan-700 dark:text-cyan-400',    bg: 'bg-cyan-500/10',    line: 'bg-cyan-500', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)] dark:shadow-[0_0_20px_rgba(34,211,238,0.15)]' },
  purple:  { dot: 'bg-purple-500 dark:bg-purple-400',  border: 'border-purple-500/30',  text: 'text-purple-700 dark:text-purple-400',  bg: 'bg-purple-500/10',  line: 'bg-purple-500', glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)] dark:shadow-[0_0_20px_rgba(192,132,252,0.15)]' },
  emerald: { dot: 'bg-emerald-500 dark:bg-emerald-400', border: 'border-emerald-500/30', text: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-500/10', line: 'bg-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)] dark:shadow-[0_0_20px_rgba(52,211,153,0.15)]' },
};

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="relative py-24 sm:py-32 xl:py-40 bg-background overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-30 pointer-events-none" />
      <div className="absolute top-10 right-10 text-[10rem] md:text-[15rem] font-black text-foreground/5 leading-none select-none pointer-events-none">05</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[30rem] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-16 h-1 bg-purple-500 rounded-full" />
            <span className="text-purple-600 dark:text-purple-400 font-mono text-sm tracking-[0.2em] uppercase font-bold">Learning Journey</span>
          </div>
          <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
            Education &{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
              Milestones
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[3.25rem] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-30" />

          <div className="space-y-16">
            {timeline.map((item, i) => {
              const c = colorMap[item.color as keyof typeof colorMap];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.18 }}
                  className={`relative flex gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="shrink-0 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-4">
                    <div className={`w-16 h-16 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center shadow-lg ${c.glow} bg-card backdrop-blur-md`}>
                      <item.icon className={c.text} size={28} />
                    </div>
                    {/* Connecting dot */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${c.dot} rounded-full ${c.glow} ${isEven ? 'md:-right-12' : 'md:-left-12'} hidden md:block border-4 border-background`} />
                  </div>

                  {/* Card */}
                  <div className={`flex-1 ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24'} md:w-[47%]`}>
                    <div className={`group p-8 rounded-3xl bg-card border ${c.border} hover:border-cyan-500/50 shadow-md hover:shadow-xl transition-all duration-300`}>
                      {/* Year + badge */}
                      <div className={`flex items-center gap-4 mb-4 flex-wrap ${isEven ? 'md:justify-end' : ''}`}>
                        <span className={`text-sm font-mono font-black ${c.text}`}>{item.year}</span>
                        <span className={`text-xs px-3 py-1.5 rounded-full border font-mono font-bold ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>

                      {/* Title + place */}
                      <h3 className="text-foreground font-black text-xl mb-2">{item.title}</h3>
                      <p className={`text-sm font-bold mb-5 ${c.text}`}>{item.place}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">{item.desc}</p>

                      {/* Highlights */}
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                        {item.highlights.map((h) => (
                          <span
                            key={h}
                            className={`flex items-center gap-2 text-xs font-mono font-semibold px-3 py-1.5 rounded-xl ${c.bg} border ${c.border} ${c.text} shadow-sm`}
                          >
                            <CheckCircle size={12} /> {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block md:w-[47%]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Currently learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-24 p-8 md:p-10 rounded-3xl bg-card border border-cyan-500/20 shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h4 className="text-foreground font-black text-2xl mb-2">Currently Exploring</h4>
              <p className="text-muted-foreground text-base font-medium">Expanding my stack with cutting-edge technologies</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Redis', 'GraphQL', 'AWS S3', 'Prisma ORM', 'React Native'].map((t) => (
                <span key={t} className="px-5 py-2.5 text-xs font-mono font-bold rounded-xl border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 shadow-sm cursor-default">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
