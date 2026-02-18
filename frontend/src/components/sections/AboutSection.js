import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SectionHeader } from '../ui/SectionHeader';
import { CardInner } from '../ui/Card';
import { cn } from '../../lib/cn';

const stats = [
  { label: 'Status', value: 'Fresher' },
  { label: 'Projects Built', value: '13+' },
  { label: 'Technologies', value: '15+' },
];

const AboutSection = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const motionTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.5 };
  const motionInitial = (x) => (shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x });

  return (
    <section
      id="about"
      data-testid="about-section"
      className={cn('py-24 md:py-32', isDark ? 'bg-dark-bg' : 'bg-light-surface')}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionHeader
          label="// 01. ABOUT ME"
          title="Who I Am"
          subtitle="I turn ideas into production-ready software — full-stack development with a focus on clean architecture and user experience."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={motionInitial(-50)}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={motionTransition}
            className="relative"
          >
            <div className={cn('relative rounded-2xl overflow-hidden', isDark ? 'bg-dark-surface' : 'bg-light-bg')}>
              <CardInner as="div" className="p-6 border">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className={cn('ml-2 font-mono text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                    sriram@portfolio:~
                  </span>
                </div>
                {/* Terminal Content */}
                <div className={cn('font-mono text-sm space-y-3', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                  <p><span className="text-primary">const</span> developer = {'{'}</p>
                  <p className="pl-4"><span className="text-secondary">name</span>: <span className="text-green-400">"Sriram Divi"</span>,</p>
                  <p className="pl-4"><span className="text-secondary">role</span>: <span className="text-green-400">"Computer Science Graduate · Fresher"</span>,</p>
                  <p className="pl-4"><span className="text-secondary">location</span>: <span className="text-green-400">"Bangalore, India"</span>,</p>
                  <p className="pl-4"><span className="text-secondary">passion</span>: <span className="text-green-400">"Building scalable web apps"</span>,</p>
                  <p className="pl-4"><span className="text-secondary">availableForHire</span>: <span className="text-green-400">true</span>,</p>
                  <p className="pl-4"><span className="text-secondary">focus</span>: [</p>
                  <p className="pl-8"><span className="text-green-400">"Clean Code"</span>,</p>
                  <p className="pl-8"><span className="text-green-400">"API Security"</span>,</p>
                  <p className="pl-8"><span className="text-green-400">"Software Architecture"</span></p>
                  <p className="pl-4">]</p>
                  <p>{'}'}</p>
                </div>
              </CardInner>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={motionInitial(50)}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={motionTransition}
          >
            <p className={cn('text-lg leading-relaxed mb-6', isDark ? 'text-dark-muted' : 'text-light-muted')}>
              Recent Computer Science graduate from SRM University AP with hands-on experience across full-stack projects. I ship modern web apps with React, Node.js, and TypeScript — from REST APIs and auth to responsive UIs and deployment.
            </p>
            <p className={cn('text-lg leading-relaxed mb-8', isDark ? 'text-dark-muted' : 'text-light-muted')}>
              I'm focused on clean code, API design, and user experience. Open to roles where I can contribute from day one, learn from the team, and grow into a strong engineer.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: MapPin, label: 'Location', value: 'Bangalore, India' },
                { icon: Briefcase, label: 'Status', value: 'Fresher' },
                { icon: GraduationCap, label: 'Education', value: 'SRM University AP · CSE' },
                { icon: Code2, label: 'Specialty', value: 'Full Stack' },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  className={cn('p-4 rounded-xl', isDark ? 'bg-dark-bg border border-dark-border' : 'bg-light-bg border border-light-border')}
                >
                  <Icon size={20} className="text-primary mb-2" />
                  <p className={cn('font-mono text-xs', isDark ? 'text-dark-muted' : 'text-light-muted')}>{label}</p>
                  <p className={cn('font-semibold', isDark ? 'text-dark-text' : 'text-light-text')}>{value}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map(({ label, value }, index) => (
                <motion.div
                  key={label}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: shouldReduceMotion ? 0 : index * 0.1, duration: shouldReduceMotion ? 0 : 0.3 }}
                >
                  <p className="font-display text-4xl font-semibold text-primary">{value}</p>
                  <p className={cn('font-mono text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
