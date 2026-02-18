import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/cn';

const roles = ['Front-End Developer', 'Back-End Developer', 'Full-Stack Developer', 'Software Engineer'];

// Tech stack icons for orbit (Simple Icons CDN)
const ORBIT_RADIUS = 150;
const TECH_ICONS = [
  { name: 'React', src: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Node.js', src: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Next.js', srcLight: 'https://cdn.simpleicons.org/nextdotjs/000000', srcDark: 'https://cdn.simpleicons.org/nextdotjs/E5E5E5' },
  { name: 'Docker', src: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'GitHub', srcLight: 'https://cdn.simpleicons.org/github/181717', srcDark: 'https://cdn.simpleicons.org/github/E5E5E5' },
  { name: 'Figma', src: 'https://cdn.simpleicons.org/figma/F24E1E' },
];

const HeroSection = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const isMouseInsideRef = useRef(false);

  // Canvas particle trail system
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    let lastSpawnTime = 0;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticles = (x, y) => {
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 1.2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 8,
          life: 1,
          decay: 0.004 + Math.random() * 0.008,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
          hue: 200 + Math.random() * 60,
        });
      }
    };

    const handleMove = (e) => {
      if (!isMouseInsideRef.current) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = Date.now();
      if (now - lastSpawnTime > 16) {
        spawnParticles(x, y);
        lastSpawnTime = now;
      }
    };

    const handleEnter = () => { isMouseInsideRef.current = true; };
    const handleLeave = () => { isMouseInsideRef.current = false; };

    section.addEventListener('mousemove', handleMove);
    section.addEventListener('mouseenter', handleEnter);
    section.addEventListener('mouseleave', handleLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particlesRef.current;

      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.rotation += p.rotationSpeed;
        p.life -= p.decay;
        if (!isMouseInsideRef.current) p.life -= 0.02;

        if (p.life <= 0) {
          pts.splice(i, 1);
          continue;
        }

        const alpha = p.life * p.life * 0.5; // easeOutQuad for smooth fade
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, 1)`;
        ctx.beginPath();
        ctx.roundRect(-p.size / 2, -1, p.size, 2.5, 1);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      section.removeEventListener('mousemove', handleMove);
      section.removeEventListener('mouseenter', handleEnter);
      section.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

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
      ref={sectionRef}
      className={cn('min-h-screen flex items-center relative overflow-hidden', isDark ? 'bg-dark-bg' : 'bg-light-bg')}
    >
      {/* Canvas for mouse-trail particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      {/* Background Grid — light: visible; dark: very subtle for texture only */}
      <div className={cn('absolute inset-0', isDark ? 'opacity-[0.04]' : 'opacity-20')}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#262626' : '#E4E4E7'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Bottom fade - only in light mode; dark mode stays solid for consistent #050505 */}
      {!isDark && (
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-light-bg to-transparent pointer-events-none"
        />
      )}

      {/* Glow Effect - hidden in dark mode so hero stays solid #050505 */}
      {!isDark && (
        <div
          className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: 'linear-gradient(135deg, #007AFF, #FF3B30)' }}
        />
      )}

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
              className="mb-3"
            >
              <span className={cn('font-mono text-xl md:text-2xl', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                {'> '}{displayText}
                <span className="animate-pulse text-primary">|</span>
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: motionDelay(0.45), duration: motionDuration }}
              className={cn('text-base md:text-lg mb-8', isDark ? 'text-dark-muted' : 'text-light-muted')}
            >
              I build scalable web apps with clean code and modern stacks - ready to deliver from day one.
            </motion.p>

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
              <a
                href="#projects"
                data-testid="view-work-btn"
                aria-label="Scroll to projects section"
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all border',
                  isDark ? 'bg-transparent border-dark-border text-dark-muted hover:text-dark-text hover:border-primary' : 'bg-transparent border-light-border text-light-muted hover:text-light-text hover:border-primary'
                )}
              >
                View my work
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
              {/* Orbiting tech icons - pop out from center then revolve */}
              <motion.div
                animate={{ rotate: orbitPaused ? 0 : 360 }}
                transition={{ duration: orbitPaused ? 0 : 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
              >
                {TECH_ICONS.map((icon, i) => {
                  const angle = (360 / TECH_ICONS.length) * i;
                  const floatDuration = 2 + (i % 3) * 0.5;
                  const popDelay = 0.8 + i * 0.15;
                  return (
                    /* Outer wrapper handles orbital position only */
                    <div
                      key={icon.name}
                      className="absolute left-1/2 top-1/2 w-11 h-11 -ml-[22px] -mt-[22px]"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px) rotate(${-angle}deg)`,
                      }}
                    >
                      {/* Inner motion.div handles pop-out + float animation */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          y: orbitPaused ? 0 : [0, -8, 0, 8, 0],
                        }}
                        transition={{
                          scale: { duration: 0.6, delay: popDelay, ease: [0.34, 1.56, 0.64, 1] },
                          opacity: { duration: 0.4, delay: popDelay },
                          y: { duration: orbitPaused ? 0 : floatDuration, repeat: Infinity, ease: 'easeInOut', delay: popDelay + 0.6 },
                        }}
                        className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden hover:scale-125 transition-transform"
                        style={{
                          boxShadow: isDark ? '0 4px 18px rgba(0,0,0,0.4)' : '0 4px 18px rgba(0,0,0,0.1)',
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
                      </motion.div>
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
                  {/* Code symbols - revolve in opposite direction on smaller orbit */}
                  <motion.div
                    animate={{ rotate: orbitPaused ? 0 : -360 }}
                    transition={{ duration: orbitPaused ? 0 : 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    {[
                      { text: '</>', angle: 0, color: 'text-primary', delay: 0.4 },
                      { text: '{ }', angle: 180, color: 'text-secondary', delay: 0.6 },
                    ].map((sym) => (
                      <div
                        key={sym.text}
                        className="absolute left-1/2 top-1/2 -ml-6 -mt-5 w-12 h-10"
                        style={{ transform: `rotate(${sym.angle}deg) translateY(-90px) rotate(${-sym.angle}deg)` }}
                      >
                        {/* Counter-rotate to keep text upright */}
                        <motion.div
                          animate={{ rotate: orbitPaused ? 0 : 360 }}
                          transition={{ duration: orbitPaused ? 0 : 18, repeat: Infinity, ease: 'linear' }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              scale: { duration: 0.5, delay: sym.delay, ease: [0.34, 1.56, 0.64, 1] },
                              opacity: { duration: 0.3, delay: sym.delay },
                            }}
                            className={cn('font-mono text-2xl font-bold whitespace-nowrap', sym.color)}
                          >
                            {sym.text}
                          </motion.span>
                        </motion.div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — transparent so it doesn't affect dark background */}
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: motionDelay(1), duration: motionDuration }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-transparent"
      >
        <motion.a
          href="#about"
          data-testid="scroll-indicator"
          aria-label="Scroll to about section"
          animate={orbitPaused ? { y: 0 } : { y: [0, 10, 0] }}
          transition={{ duration: orbitPaused ? 0 : 1.5, repeat: Infinity }}
          className={cn(
            'block bg-transparent border-0 shadow-none no-underline',
            isDark ? 'text-dark-muted hover:text-dark-text' : 'text-light-muted hover:text-light-text',
            'transition-colors'
          )}
        >
          <ChevronDown size={36} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
