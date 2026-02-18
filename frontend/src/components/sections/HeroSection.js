import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/cn';

const roles = ['Front-End Developer', 'Back-End Developer', 'Full Stack Developer', 'Fresh Graduate'];

// Tech stack icons for orbit (Simple Icons CDN)
const ORBIT_RADIUS = 150;
const TECH_ICONS = [
  { name: 'Java', src: 'https://cdn.simpleicons.org/java/ED8B00' },
  { name: 'Python', src: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'React', src: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', srcLight: 'https://cdn.simpleicons.org/nextdotjs/000000', srcDark: 'https://cdn.simpleicons.org/nextdotjs/E5E5E5' },
  { name: 'Node.js', src: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Git', src: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'Docker', src: 'https://cdn.simpleicons.org/docker/2496ED' },
];

const HeroSection = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, roleIndex]);

  useEffect(() => {
    const handleVisibility = () => setIsTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const resumeUrl = 'https://drive.google.com/file/d/1fl0jcF1Y4j4QupJW7pIrLGMtBD_wAIuk/view?usp=sharing';
  const orbitPaused = shouldReduceMotion || !isTabVisible;
  const motionDuration = shouldReduceMotion ? 0 : 0.8;
  const motionDelay = (d) => (shouldReduceMotion ? 0 : d);

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className={cn('min-h-screen flex items-center relative overflow-hidden', isDark ? 'bg-dark-bg' : 'bg-light-bg')}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#2A2A2A' : '#E4E4E7'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Glow Effect */}
      <div
        className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'linear-gradient(135deg, #007AFF, #FF3B30)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: motionDuration }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: motionDelay(0.2), duration: motionDuration }}
              className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6', isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border')}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className={cn('font-mono text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: motionDelay(0.3), duration: motionDuration }}
              className={cn('font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-4', isDark ? 'text-dark-text' : 'text-light-text')}
            >
              Sriram
              <br />
              <span className="gradient-text">Divi</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: motionDelay(0.4), duration: motionDuration }}
              className="mb-8"
            >
              <span className={cn('font-mono text-xl md:text-2xl', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                {'> '}{displayText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: motionDelay(0.5), duration: motionDuration }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="download-resume-btn"
                aria-label="Download resume (opens in new tab)"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:glow-secondary transition-all"
              >
                <Download size={20} />
                Download Resume
              </a>
              <a
                href="#contact"
                data-testid="hire-me-btn"
                aria-label="Go to contact section"
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all',
                  isDark ? 'bg-dark-surface border border-dark-border text-dark-text hover:border-primary' : 'bg-light-surface border border-light-border text-light-text hover:border-primary'
                )}
              >
                Hire Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: motionDelay(0.6), duration: motionDuration }}
              className="flex gap-4"
            >
              {[
                { icon: Github, href: 'https://github.com/SriramDivi1', label: 'GitHub', ariaLabel: 'GitHub profile' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/sriram-divi-dev', label: 'LinkedIn', ariaLabel: 'LinkedIn profile' },
                { icon: Mail, href: 'mailto:sriramdivi716@gmail.com', label: 'Email', ariaLabel: 'Email me' },
              ].map(({ icon: Icon, href, label, ariaLabel }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  data-testid={`social-${label.toLowerCase()}`}
                  className={cn(
                    'p-3 rounded-full transition-all',
                    isDark ? 'bg-dark-surface text-dark-muted hover:text-primary hover:bg-dark-border' : 'bg-light-surface text-light-muted hover:text-primary hover:bg-light-border'
                  )}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.1, y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Tech strip for md (tablet): horizontal row when orbit is hidden */}
          <div className="flex lg:hidden md:flex hidden justify-center items-center gap-4 py-8 flex-wrap">
            {TECH_ICONS.map((icon) => (
              <div
                key={icon.name}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden transition-transform hover:scale-110',
                  isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
                )}
              >
                <img
                  src={icon.src ?? (isDark ? icon.srcDark : icon.srcLight)}
                  alt={icon.name}
                  className="w-6 h-6 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Right Content - Abstract Shape + Orbiting Tech Icons (lg only) */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: motionDuration, delay: motionDelay(0.3) }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-[420px] h-[420px]">
              {/* Orbiting tech icons - revolve around center (paused when reduced motion or tab hidden) */}
              <motion.div
                animate={{ rotate: orbitPaused ? 0 : 360 }}
                transition={{ duration: orbitPaused ? 0 : 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                {TECH_ICONS.map((icon, i) => {
                  const angle = (360 / TECH_ICONS.length) * i;
                  return (
                    <div
                      key={icon.name}
                      className="absolute left-1/2 top-1/2 w-10 h-10 -ml-5 -mt-5 flex items-center justify-center rounded-xl overflow-hidden transition-transform hover:scale-125"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px) rotate(${-angle}deg)`,
                        boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.3)' : '0 4px 14px rgba(0,0,0,0.08)',
                        background: isDark ? 'rgba(18,18,18,0.9)' : 'rgba(255,255,255,0.95)',
                        border: isDark ? '1px solid rgba(42,42,42,0.8)' : '1px solid rgba(228,228,231,0.8)',
                      }}
                    >
                      <img
                        src={icon.src ?? (isDark ? icon.srcDark : icon.srcLight)}
                        alt={icon.name}
                        className="w-6 h-6 object-contain"
                        title={icon.name}
                      />
                    </div>
                  );
                })}
              </motion.div>

              {/* Center object - rings and glow */}
              <div className="absolute inset-[70px]">
                <div className="relative w-full h-full">
                  {/* Rotating rings (paused when reduced motion or tab hidden) */}
                  <motion.div
                    animate={{ rotate: orbitPaused ? 0 : 360 }}
                    transition={{ duration: orbitPaused ? 0 : 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-2 border-primary/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: orbitPaused ? 0 : -360 }}
                    transition={{ duration: orbitPaused ? 0 : 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-4 border-2 border-secondary/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: orbitPaused ? 0 : 360 }}
                    transition={{ duration: orbitPaused ? 0 : 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-8 border-2 border-primary/50 rounded-full"
                  />
                  {/* Center glow */}
                  <div className={cn('absolute inset-16 rounded-full bg-gradient-to-br from-primary to-secondary opacity-60 blur-xl', !orbitPaused && 'animate-pulse')} />
                  <div className={cn('absolute inset-20 rounded-full bg-gradient-to-br from-primary to-secondary', !isDark && 'ring-2 ring-white/20')} />
                  {/* Code symbols (no bounce when reduced motion) */}
                  <motion.span
                    animate={orbitPaused ? { y: 0 } : { y: [0, -10, 0] }}
                    transition={{ duration: orbitPaused ? 0 : 2, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-2xl text-primary"
                  >
                    {'</>'}
                  </motion.span>
                  <motion.span
                    animate={orbitPaused ? { y: 0 } : { y: [0, 10, 0] }}
                    transition={{ duration: orbitPaused ? 0 : 2.5, repeat: Infinity }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-2xl text-secondary"
                  >
                    {'{ }'}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: motionDelay(1), duration: motionDuration }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            data-testid="scroll-indicator"
            aria-label="Scroll to about section"
            animate={orbitPaused ? { y: 0 } : { y: [0, 10, 0] }}
            transition={{ duration: orbitPaused ? 0 : 1.5, repeat: Infinity }}
            className={cn(isDark ? 'text-dark-muted' : 'text-light-muted')}
          >
            <ChevronDown size={32} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
