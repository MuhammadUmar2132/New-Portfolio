'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Layers, Cpu, Rocket, MapPin, Calendar, Coffee, Star } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Projects Completed', icon: Layers, color: 'text-cyan-500 dark:text-cyan-400', bg: 'bg-cyan-500/10 dark:bg-cyan-400/10' },
  { value: '2+', label: 'Years Experience', icon: Calendar, color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10 dark:bg-purple-400/10' },
  { value: '15+', label: 'Technologies', icon: Code2, color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10 dark:bg-emerald-400/10' },
  { value: '∞', label: 'Cups of Coffee', icon: Coffee, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10 dark:bg-amber-400/10' },
];

const traits = [
  { icon: Code2, title: 'Clean Code Advocate', desc: 'I write readable, maintainable TypeScript across the entire stack — no spaghetti, ever.', color: 'cyan' },
  { icon: Layers, title: 'Full Stack Architect', desc: 'From MongoDB schemas to Next.js pages, I own the entire application lifecycle.', color: 'purple' },
  { icon: Cpu, title: 'Performance Driven', desc: 'Server-side rendering, lazy loading, DB indexing — every millisecond counts.', color: 'emerald' },
  { icon: Rocket, title: 'Rapid Learner', desc: 'New framework? New tool? Give me a weekend and I\'ll ship production-ready code.', color: 'amber' },
];

const colorStyles: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan:   { border: 'border-cyan-500/20 hover:border-cyan-500/40',   bg: 'bg-cyan-500/10',   text: 'text-cyan-600 dark:text-cyan-400',   glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]' },
  purple: { border: 'border-purple-500/20 hover:border-purple-500/40', bg: 'bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400', glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]' },
  emerald:{ border: 'border-emerald-500/20 hover:border-emerald-500/40', bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]' },
  amber:  { border: 'border-amber-500/20 hover:border-amber-500/40', bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]' },
};

const techStack = ['Next.js', 'React', 'TypeScript', 'NestJS', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion', 'REST API', 'Docker'];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="relative py-24 sm:py-32 xl:py-40 bg-secondary/30 overflow-hidden" ref={ref}>
      {/* Dot background */}
      <div className="absolute inset-0 bg-dots opacity-40 dark:opacity-60 pointer-events-none" />

      {/* Section watermark */}
      <div className="absolute top-10 right-10 text-[10rem] md:text-[15rem] font-black text-foreground/5 leading-none select-none pointer-events-none">
        01
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-cyan-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-16 h-1 bg-cyan-500 rounded-full" />
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase font-bold">About Me</span>
          </div>
          <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
            Developer who thinks
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              like an architect
            </span>
          </h2>
        </motion.div>

        {/* Top: Bio + Stats */}
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start mb-24">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
              <MapPin size={16} className="text-cyan-600 dark:text-cyan-400" />
              <span>Pakistan — Open to Remote Worldwide</span>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              I&apos;m <span className="text-foreground font-bold">Muhammad Umar</span>, a passionate Full Stack Developer
              specializing in the <span className="text-cyan-600 dark:text-cyan-400 font-semibold">MERN stack</span> with modern
              frameworks like <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Next.js</span> and{' '}
              <span className="text-purple-600 dark:text-purple-400 font-semibold">NestJS</span>.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I build complete web solutions — from designing pixel-perfect interfaces to architecting
              robust backend APIs. Currently studying{' '}
              <span className="text-foreground font-semibold">Software Engineering at Superior University</span>{' '}
              while actively building real-world projects.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My approach: write clean, typed code. Build scalable systems. Ship fast. Whether it&apos;s
              an e-commerce platform, an admin dashboard, or a REST API — I care deeply about quality,
              performance, and developer experience.
            </p>

            {/* Tech stack tags */}
            <div className="pt-6">
              <p className="text-sm text-foreground font-mono uppercase tracking-[0.2em] font-bold mb-4">Core Tech Stack</p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.04 }}
                    className="px-4 py-2 text-sm font-mono font-medium rounded-xl border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all cursor-default shadow-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <s.icon size={26} className={s.color} />
                  </div>
                  <div className={`text-4xl md:text-5xl font-black mb-2 ${s.color}`}>{s.value}</div>
                  <div className="text-muted-foreground text-sm md:text-base font-medium leading-snug">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Profile visual code block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xl font-mono text-xs md:text-sm"
            >
              <div className="flex items-center gap-3 mb-5 border-b border-border pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-muted-foreground font-semibold">developer.profile.ts</span>
              </div>
              <div className="space-y-1 md:space-y-2 leading-relaxed">
                <p><span className="text-purple-600 dark:text-purple-400">interface</span> <span className="text-cyan-600 dark:text-cyan-400">Developer</span> {'{'}</p>
                <p className="pl-6"><span className="text-amber-600 dark:text-amber-300">name</span>: <span className="text-emerald-600 dark:text-emerald-400">&apos;Muhammad Umar&apos;</span>;</p>
                <p className="pl-6"><span className="text-amber-600 dark:text-amber-300">role</span>: <span className="text-emerald-600 dark:text-emerald-400">&apos;Full Stack Dev&apos;</span>;</p>
                <p className="pl-6"><span className="text-amber-600 dark:text-amber-300">stack</span>: [<span className="text-emerald-600 dark:text-emerald-400">&apos;Next&apos;</span>, <span className="text-emerald-600 dark:text-emerald-400">&apos;Nest&apos;</span>, <span className="text-emerald-600 dark:text-emerald-400">&apos;Mongo&apos;</span>];</p>
                <p className="pl-6"><span className="text-amber-600 dark:text-amber-300">available</span>: <span className="text-purple-600 dark:text-purple-400">true</span>;</p>
                <p>{'}'}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Traits cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {traits.map((t, i) => {
            const c = colorStyles[t.color];
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.12 }}
                className={`group relative p-8 rounded-3xl bg-card border ${c.border} transition-all duration-300 shadow-lg ${c.glow}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <t.icon size={26} className={c.text} />
                </div>
                <h3 className={`font-black text-lg mb-3 ${c.text}`}>{t.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">{t.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
