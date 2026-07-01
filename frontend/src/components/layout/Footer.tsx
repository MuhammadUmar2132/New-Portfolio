import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';

export default function Footer() {
  return (
    <footer className="relative bg-secondary/50 border-t border-border py-12 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 dark:opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <span className="text-xl font-bold">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono">{'<'}</span>
            <span className="text-foreground">MU</span>
            <span className="text-purple-600 dark:text-purple-400 font-mono">{'/>'}</span>
          </span>
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Muhammad Umar — Full Stack Dev</p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {[
            { icon: GithubIcon, href: 'https://github.com/MuhammadUmar2132', label: 'GitHub' },
            { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/muhammad-umar-727907256/', label: 'LinkedIn' },
            { icon: Mail, href: 'mrumar4722@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="p-3 rounded-2xl border border-border bg-card text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/40 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-muted-foreground text-xs text-center md:text-right font-medium leading-relaxed max-w/[250px] md:max-w-none">
          © {new Date().getFullYear()} Muhammad Umar · Built with{' '}
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">Next.js</span> ·{' '}
          <span className="text-purple-600 dark:text-purple-400 font-bold">NestJS</span> ·{' '}
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">MongoDB</span>
        </p>
      </div>
    </footer>
  );
}
