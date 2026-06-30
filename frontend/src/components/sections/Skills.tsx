'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillGroups = [
  {
    category: 'Frontend',
    emoji: '🎨',
    color: 'cyan',
    skills: [
      { name: 'Next.js 14+', level: 90, icon: '▲' },
      { name: 'React.js', level: 93, icon: '⚛' },
      { name: 'TypeScript', level: 88, icon: 'TS' },
      { name: 'Tailwind CSS', level: 95, icon: '🌊' },
      { name: 'Framer Motion', level: 82, icon: '◈' },
    ],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    color: 'purple',
    skills: [
      { name: 'NestJS', level: 87, icon: '🦅' },
      { name: 'Node.js', level: 88, icon: '🟢' },
      { name: 'REST APIs', level: 92, icon: '🔗' },
      { name: 'JWT Auth', level: 86, icon: '🔐' },
      { name: 'WebSockets', level: 72, icon: '⚡' },
    ],
  },
  {
    category: 'Database & Tools',
    emoji: '🗄️',
    color: 'emerald',
    skills: [
      { name: 'MongoDB', level: 89, icon: '🍃' },
      { name: 'Mongoose ODM', level: 87, icon: '🐾' },
      { name: 'Git & GitHub', level: 93, icon: '🐙' },
      { name: 'Docker', level: 68, icon: '🐳' },
      { name: 'Vercel Deploy', level: 88, icon: '▲' },
    ],
  },
];

const colorMap = {
  cyan: {
    bar: 'from-cyan-600 to-cyan-500 dark:from-cyan-500 dark:to-cyan-400',
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    text: 'text-cyan-700 dark:text-cyan-400',
    bg: 'bg-cyan-500/10',
    glow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]',
    track: 'bg-cyan-500/5',
  },
  purple: {
    bar: 'from-purple-600 to-purple-500 dark:from-purple-500 dark:to-purple-400',
    border: 'border-purple-500/20 hover:border-purple-500/40',
    text: 'text-purple-700 dark:text-purple-400',
    bg: 'bg-purple-500/10',
    glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_40px_rgba(192,132,252,0.15)]',
    track: 'bg-purple-500/5',
  },
  emerald: {
    bar: 'from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
    glow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_0_40px_rgba(52,211,153,0.15)]',
    track: 'bg-emerald-500/5',
  },
};

const techIcons = [
  { name: 'React', icon: '⚛', color: '#61DAFB', bg: 'rgba(97,218,251,0.1)' },
  { name: 'Next.js', icon: '▲', color: 'var(--foreground)', bg: 'rgba(120,120,120,0.1)' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', bg: 'rgba(49,120,198,0.15)' },
  { name: 'NestJS', icon: '🦅', color: '#E0234E', bg: 'rgba(224,35,78,0.1)' },
  { name: 'Node.js', icon: '🟢', color: '#68A063', bg: 'rgba(104,160,99,0.1)' },
  { name: 'MongoDB', icon: '🍃', color: '#4DB33D', bg: 'rgba(77,179,61,0.1)' },
  { name: 'Tailwind', icon: '🌊', color: '#38BDF8', bg: 'rgba(56,189,248,0.1)' },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E', bg: 'rgba(247,223,30,0.15)' },
  { name: 'Git', icon: '🐙', color: '#F05032', bg: 'rgba(240,80,50,0.1)' },
  { name: 'Docker', icon: '🐳', color: '#2496ED', bg: 'rgba(36,150,237,0.1)' },
  { name: 'Mongoose', icon: '🐾', color: '#880000', bg: 'rgba(136,0,0,0.15)' },
  { name: 'Vercel', icon: '▲', color: 'var(--foreground)', bg: 'rgba(120,120,120,0.1)' },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="relative py-24 sm:py-32 xl:py-40 bg-secondary/30 overflow-hidden" ref={ref}>
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-40 pointer-events-none" />
      <div className="absolute top-10 right-10 text-[10rem] md:text-[15rem] font-black text-foreground/5 leading-none select-none pointer-events-none">03</div>

      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[40rem] h-[30rem] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-16 h-1 bg-purple-500 rounded-full" />
            <span className="text-purple-600 dark:text-purple-400 font-mono text-sm tracking-[0.2em] uppercase font-bold">Tech Stack</span>
          </div>
          <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
            Skills &{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
              Technologies
            </span>
          </h2>
          <p className="text-muted-foreground mt-6 text-lg max-w-xl font-medium">
            Technologies I work with daily — from crafting pixel-perfect UIs to building robust backend systems.
          </p>
        </motion.div>

        {/* Tech icon grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 mb-24"
        >
          {techIcons.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.05, type: 'spring', stiffness: 200 }}
              className="group flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-card border border-border shadow-md hover:shadow-xl hover:border-cyan-500/40 hover:-translate-y-2 transition-all duration-300 cursor-default"
            >
              <div 
                className="w-12 h-12 flex items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: tech.bg }}
              >
                <span className="text-2xl leading-none font-bold" style={{ color: tech.color === 'var(--foreground)' ? undefined : tech.color }}>
                  {tech.icon}
                </span>
              </div>
              <span className="text-[10px] md:text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Proficiency bars */}
        <div className="grid md:grid-cols-3 gap-8 xl:gap-10">
          {skillGroups.map((group, gi) => {
            const c = colorMap[group.color as keyof typeof colorMap];
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + gi * 0.15 }}
                className={`group relative p-8 rounded-3xl bg-card border ${c.border} transition-all duration-300 shadow-lg hover:shadow-2xl ${c.glow}`}
              >
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-br-none rounded-tl-none rounded-2xl ${c.bg} opacity-20 blur-2xl pointer-events-none transition-opacity duration-300 group-hover:opacity-40`} />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {group.emoji}
                  </div>
                  <div>
                    <h3 className={`font-black text-xl ${c.text}`}>{group.category}</h3>
                    <p className="text-muted-foreground text-xs font-semibold">{group.skills.length} technologies</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-6">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-mono ${c.text} opacity-80`}>{skill.icon}</span>
                          <span className="text-sm text-foreground font-bold">{skill.name}</span>
                        </div>
                        <span className={`text-xs font-black font-mono ${c.text}`}>{skill.level}%</span>
                      </div>
                      <div className={`h-2.5 rounded-full ${c.track} overflow-hidden`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.3 + gi * 0.15 + si * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                          className={`h-full rounded-full bg-linear-to-r ${c.bar} relative`}
                        >
                          <div className="absolute inset-0 rounded-full opacity-50 bg-linear-to-r from-transparent via-white/30 to-transparent" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Average */}
                <div className={`mt-8 pt-6 border-t ${c.border.split(' ')[0]} flex items-center justify-between`}>
                  <span className="text-xs font-semibold text-muted-foreground">Avg Proficiency</span>
                  <span className={`text-lg font-black ${c.text}`}>
                    {Math.round(group.skills.reduce((a, s) => a + s.level, 0) / group.skills.length)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground text-sm font-bold mb-6 uppercase tracking-widest">Always learning, always growing</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {['Express.js', 'Redis', 'GraphQL', 'AWS', 'PostgreSQL'].map((tech) => (
              <span key={tech} className="px-5 py-2 text-xs font-semibold text-muted-foreground bg-card border border-border rounded-full hover:bg-secondary hover:text-foreground transition-colors cursor-default shadow-sm">
                {tech} — Learning Next
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
