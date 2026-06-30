'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, Download } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setActive(href.replace('#', ''));
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => handleNav('#home')}
          className="flex items-center gap-1 group"
        >
          <span className="text-cyan-500 dark:text-cyan-400 font-mono text-xl font-bold">{'<'}</span>
          <span className="text-foreground font-bold text-xl tracking-tight">MU</span>
          <span className="text-purple-500 dark:text-purple-400 font-mono text-xl font-bold">{'/>'}</span>
        </motion.button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace('#', '');
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-lg border border-cyan-500/20 dark:border-cyan-400/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Hire Me + CV + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="/cv"
            target="_blank"
            rel="noreferrer"
            className="btn-shine flex items-center gap-2 px-4 py-2 text-sm text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-all duration-200"
          >
            <Download size={14} />
            CV
          </a>
          <button
            onClick={() => handleNav('#contact')}
            className="btn-shine px-5 py-2 text-sm font-semibold text-white dark:text-black bg-linear-to-r from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-500 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-white rounded-lg border border-white/10 hover:border-cyan-400/40 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#050508]/95 backdrop-blur-xl border-t border-white/5 px-6 py-5 space-y-1"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === link.href.replace('#', '')
                    ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 pt-3 border-t border-white/5">
              <a
                href="/cv"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-400/10 transition-colors"
              >
                <Download size={14} /> Download CV
              </a>
              <button
                onClick={() => handleNav('#contact')}
                className="flex-1 py-2.5 text-sm font-semibold text-black bg-cyan-400 rounded-lg"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
