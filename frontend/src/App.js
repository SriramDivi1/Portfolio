import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { cn } from './lib/cn';
import './App.css';

const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

const AppContent = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, [shouldReduceMotion]);

  return (
    <div
      className={cn('min-h-screen theme-transition', isDark ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text')}
    >
      {/* Skip link - visible on focus for keyboard/screen reader */}
      <a
        href="#main"
        className="absolute left-4 top-4 -translate-y-[150%] z-[100] px-4 py-2 bg-primary text-white rounded-lg font-mono text-sm outline-none focus:outline-none focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg"
      >
        Skip to main content
      </a>
      {/* Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main id="main">
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ExperienceSection />
          <ContactSection />
        </Suspense>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
