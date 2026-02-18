import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const stats = [
  { label: 'Status', value: 'Fresher' },
  { label: 'Projects Built', value: '10+' },
  { label: 'Technologies', value: '15+' },
];

const AboutSection = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      data-testid="about-section"
      className={`py-24 md:py-32 ${isDark ? 'bg-dark-surface' : 'bg-light-surface'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className={`font-mono text-sm ${isDark ? 'text-primary' : 'text-primary'}`}>
            {'// 01. ABOUT ME'}
          </span>
          <h2 className={`font-display text-4xl md:text-6xl font-semibold mt-4 ${
            isDark ? 'text-dark-text' : 'text-light-text'
          }`}>
            Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`relative rounded-2xl overflow-hidden ${
              isDark ? 'bg-dark-bg' : 'bg-light-bg'
            }`}>
              {/* Terminal-like card */}
              <div className={`p-6 border rounded-2xl ${
                isDark ? 'border-dark-border bg-dark-bg' : 'border-light-border bg-white'
              }`}>
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className={`ml-2 font-mono text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                    sriram@portfolio:~
                  </span>
                </div>
                {/* Terminal Content */}
                <div className={`font-mono text-sm space-y-3 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                  <p><span className="text-primary">const</span> developer = {'{'}</p>
                  <p className="pl-4"><span className="text-secondary">name</span>: <span className="text-green-400">"Sriram Divi"</span>,</p>
                  <p className="pl-4"><span className="text-secondary">role</span>: <span className="text-green-400">"Computer Science Graduate · Fresher"</span>,</p>
                  <p className="pl-4"><span className="text-secondary">location</span>: <span className="text-green-400">"Bangalore, India"</span>,</p>
                  <p className="pl-4"><span className="text-secondary">passion</span>: <span className="text-green-400">"Building scalable web apps"</span>,</p>
                  <p className="pl-4"><span className="text-secondary">focus</span>: [</p>
                  <p className="pl-8"><span className="text-green-400">"Clean Code"</span>,</p>
                  <p className="pl-8"><span className="text-green-400">"API Security"</span>,</p>
                  <p className="pl-8"><span className="text-green-400">"Software Architecture"</span></p>
                  <p className="pl-4">]</p>
                  <p>{'}'}</p>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-primary rounded-2xl -z-10" />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className={`text-lg leading-relaxed mb-6 ${
              isDark ? 'text-dark-muted' : 'text-light-muted'
            }`}>
              Recent Computer Science graduate from SRM University AP, eager to start my career in software development. I build modern web applications with React and Node.js, and I'm passionate about full stack development, clean code, and learning industry best practices.
            </p>
            <p className={`text-lg leading-relaxed mb-8 ${
              isDark ? 'text-dark-muted' : 'text-light-muted'
            }`}>
              My focus includes React frontends, REST APIs, authentication, and responsive design. I'm looking for opportunities where I can contribute, grow, and deliver value from day one.
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
                  whileHover={{ y: -2 }}
                  className={`p-4 rounded-xl ${
                    isDark ? 'bg-dark-bg border border-dark-border' : 'bg-light-bg border border-light-border'
                  }`}
                >
                  <Icon size={20} className="text-primary mb-2" />
                  <p className={`font-mono text-xs ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>{label}</p>
                  <p className={`font-semibold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>{value}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map(({ label, value }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-display text-4xl font-semibold text-primary">{value}</p>
                  <p className={`font-mono text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>{label}</p>
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
