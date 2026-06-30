'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Calendar, Clock, Send, CheckCircle, User, Phone, MessageSquare, MapPin, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { createMeeting } from '@/lib/api';
import type { CreateMeetingDto } from '@/types/meeting';

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
const initialForm: CreateMeetingDto = { name: '', email: '', phone: '', date: '', time: '', message: '' };

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'bakkahtransport@gmail.com',
    href: 'mailto:bakkahtransport@gmail.com',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Lahore, Pakistan',
    href: null,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Calendar,
    label: 'Availability',
    value: 'Mon – Fri, 9 AM – 6 PM',
    href: null,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com', color: 'hover:text-foreground hover:border-foreground/40' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-500 hover:border-blue-500/40' },
  { icon: Mail, label: 'Email', href: 'mrumar4722@gmail.com', color: 'hover:text-cyan-500 hover:border-cyan-500/40' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState<CreateMeetingDto>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createMeeting(form);
      setSuccess(true);
      setForm(initialForm);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section id="contact" className="relative py-24 sm:py-32 xl:py-40 bg-background overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-20 dark:opacity-40 pointer-events-none" />
      <div className="absolute top-10 right-10 text-[10rem] md:text-[15rem] font-black text-foreground/5 leading-none select-none pointer-events-none">04</div>
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-16 h-1 bg-cyan-500 rounded-full" />
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase font-bold">Get In Touch</span>
          </div>
          <h2 className="text-5xl md:text-6xl xl:text-7xl font-black text-foreground leading-[1.1]">
            Let&apos;s build something{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
              remarkable
            </span>
          </h2>
          <p className="text-muted-foreground mt-6 text-lg max-w-xl font-medium">
            Have a project in mind? Book a meeting or send a message — I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 xl:gap-16">

          {/* Left: Info panel (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((c) => (
                <div
                  key={c.label}
                  className={`flex items-center gap-5 p-5 rounded-3xl bg-card border ${c.border} shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 group`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <c.icon size={24} className={c.color} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className={`text-base font-bold text-foreground hover:${c.color} transition-colors truncate block`}>
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-base font-bold text-foreground truncate">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-sm">
              <p className="text-xs font-bold text-muted-foreground font-mono uppercase tracking-[0.2em] mb-5">Connect With Me</p>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary border border-border text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-card hover:shadow-md ${s.color}`}
                  >
                    <s.icon size={22} />
                    <span className="text-[10px] font-mono font-bold uppercase">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div className="p-8 rounded-3xl bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-foreground font-black text-xl mb-3">Ready to collaborate?</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
                  Whether you need a landing page, a full-stack app, or a backend API —
                  I deliver quality code on time.
                </p>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 font-bold hover:gap-4 transition-all duration-300"
                >
                  Book a meeting <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right: Meeting form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-3"
          >
            {success ? (
              <div className="h-full flex flex-col items-center justify-center py-24 text-center bg-card rounded-3xl border border-emerald-500/30 p-10 shadow-2xl">
                <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-8 shadow-inner">
                  <CheckCircle className="text-emerald-500 dark:text-emerald-400" size={48} />
                </div>
                <h3 className="text-foreground text-4xl font-black mb-4">Meeting Booked!</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-10 text-lg">I&apos;ll confirm your meeting soon. Check your email for details and updates.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-8 py-4 border-2 border-cyan-500/40 text-cyan-700 dark:text-cyan-400 rounded-xl hover:bg-cyan-500/10 transition-colors font-bold shadow-sm"
                >
                  Book Another Meeting
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl border border-border p-8 md:p-10 space-y-6 shadow-2xl"
              >
                <div className="mb-4">
                  <h3 className="text-foreground font-black text-3xl mb-2">Book a Meeting</h3>
                  <p className="text-muted-foreground text-base font-medium">Fill out the form and I&apos;ll confirm within 24h</p>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-bold flex items-center gap-3">
                    <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    {error}
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-muted-foreground" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name *"
                      className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-xl text-foreground text-sm font-medium placeholder-muted-foreground focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all shadow-sm"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-muted-foreground" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-xl text-foreground text-sm font-medium placeholder-muted-foreground focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all shadow-sm"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-muted-foreground" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (optional)"
                    className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-xl text-foreground text-sm font-medium placeholder-muted-foreground focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all shadow-sm"
                  />
                </div>

                {/* Date */}
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-muted-foreground" size={18} />
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={minDate}
                    className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-xl text-foreground text-sm font-medium focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all shadow-sm [color-scheme:light] dark:[color-scheme:dark]"
                    required
                  />
                </div>

                {/* Time slots */}
                <div>
                  <p className="text-xs text-muted-foreground font-mono font-bold mb-4 uppercase tracking-[0.1em]">Select Time Slot *</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, time: t }))}
                        className={`py-3 text-xs md:text-sm rounded-xl border font-bold transition-all duration-300 ${
                          form.time === t
                            ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black border-transparent shadow-lg shadow-cyan-500/25'
                            : 'border-border text-muted-foreground hover:border-cyan-500/40 hover:text-foreground bg-secondary hover:bg-card shadow-sm'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-muted-foreground" size={18} />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project (optional)..."
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-xl text-foreground text-sm font-medium placeholder-muted-foreground focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all resize-none shadow-sm"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-foreground text-background font-black rounded-xl hover:bg-cyan-600 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed shadow-xl hover:shadow-cyan-500/25 text-base"
                >
                  {loading ? (
                    <span className="w-6 h-6 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} /> Book Meeting Now
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
