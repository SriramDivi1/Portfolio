import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const roles = ['Front-End Developer', 'Back-End Developer', 'Full Stack Developer', 'Fresh Graduate'];

const HeroSection = () => {
  const { isDark } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

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

  const resumeUrl = 'https://drive.google.com/file/d/1fl0jcF1Y4j4QupJW7pIrLGMtBD_wAIuk/view?usp=sharing';

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className={`min-h-screen flex items-center relative overflow-hidden ${isDark ? 'bg-dark-bg' : 'bg-light-bg'
        }`}
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
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
                }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className={`font-mono text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-4 ${isDark ? 'text-dark-text' : 'text-light-text'
                }`}
            >
              Sriram
              <br />
              <span className="gradient-text">Divi</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <span className={`font-mono text-xl md:text-2xl ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                {'> '}{displayText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="download-resume-btn"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:glow-secondary transition-all"
              >
                <Download size={20} />
                Download Resume
              </a>
              <a
                href="#contact"
                data-testid="hire-me-btn"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${isDark
                  ? 'bg-dark-surface border border-dark-border text-dark-text hover:border-primary'
                  : 'bg-light-surface border border-light-border text-light-text hover:border-primary'
                  }`}
              >
                Hire Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              {[
                { icon: Github, href: 'https://github.com/SriramDivi1', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/sriram-divi-dev', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:sriramdivi716@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-${label.toLowerCase()}`}
                  className={`p-3 rounded-full transition-all ${isDark
                    ? 'bg-dark-surface text-dark-muted hover:text-primary hover:bg-dark-border'
                    : 'bg-light-surface text-light-muted hover:text-primary hover:bg-light-border'
                    }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Abstract Shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative w-80 h-80">
              {/* Rotating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 border-2 border-secondary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 border-2 border-primary/50 rounded-full"
              />
              {/* Center glow */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse opacity-60 blur-xl" />
              <div className="absolute inset-20 rounded-full bg-gradient-to-br from-primary to-secondary" />
              {/* Code symbols */}
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-2xl text-primary"
              >
                {'</>'}
              </motion.span>
              <motion.span
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-2xl text-secondary"
              >
                {'{ }'}
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            data-testid="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={isDark ? 'text-dark-muted' : 'text-light-muted'}
          >
            <ChevronDown size={32} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
