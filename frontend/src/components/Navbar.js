import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon, Menu, X, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useScrollPosition } from '../hooks/useScroll';
import { cn } from '../lib/cn';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ onOpenCommandPalette }) => {
  const { isDark, toggleTheme } = useTheme();
  const { scrollPosition, scrollDirection } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isScrolled = scrollPosition > 50;

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (e) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        data-testid="navbar"
        initial={{ y: -100 }}
        animate={{ y: scrollDirection === 'down' && scrollPosition > 300 ? -100 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 duration-300',
          isDark ? 'transition-[opacity,transform,border-color]' : 'transition-all',
          !isScrolled && 'bg-transparent',
          isScrolled && !isDark && 'bg-light-bg/90 backdrop-blur-xl border-b border-light-border',
          isScrolled && isDark && 'bg-dark-bg border-b border-dark-border'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              data-testid="logo"
              className={cn('font-display text-xl font-semibold', isDark ? 'text-dark-text' : 'text-light-text')}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-primary">{'<'}</span>
              SD
              <span className="text-primary">{'/>'}</span>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={cn(
                    'font-mono text-sm transition-colors',
                    isDark ? 'text-dark-muted hover:text-dark-text' : 'text-light-muted hover:text-light-text'
                  )}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Search, Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-3 md:gap-4">
              <motion.button
                type="button"
                data-testid="command-palette-toggle"
                onClick={onOpenCommandPalette}
                aria-label="Open command palette"
                className={cn(
                  'hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-colors',
                  isDark
                    ? 'bg-dark-surface border-dark-border text-dark-muted hover:text-dark-text hover:border-primary/50'
                    : 'bg-light-surface border-light-border text-light-muted hover:text-light-text hover:border-primary/50'
                )}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              >
                <Search size={14} className="text-primary" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px]">⌘K</kbd>
              </motion.button>
              <motion.button
                type="button"
                data-testid="theme-toggle"
                onClick={toggleTheme}
                aria-label={isDark ? 'Toggle light mode' : 'Toggle dark mode'}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  isDark ? 'bg-dark-surface text-dark-text' : 'bg-light-surface text-light-text'
                )}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={shouldReduceMotion ? false : { rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={shouldReduceMotion ? false : { rotate: 90, opacity: 0 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={shouldReduceMotion ? false : { rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={shouldReduceMotion ? false : { rotate: -90, opacity: 0 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                type="button"
                data-testid="mobile-menu-toggle"
                className={cn(
                  'md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  isDark ? 'hover:bg-dark-surface/50' : 'hover:bg-light-surface/50'
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X size={24} className={isDark ? 'text-dark-text' : 'text-light-text'} />
                ) : (
                  <Menu size={24} className={isDark ? 'text-dark-text' : 'text-light-text'} />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -20 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className={cn('fixed inset-0 z-40 pt-20', isDark ? 'bg-dark-bg' : 'bg-light-bg')}
          >
            <div className="flex flex-col items-center gap-8 pt-12">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  data-testid={`mobile-nav-${link.name.toLowerCase()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn('font-display text-2xl', isDark ? 'text-dark-text' : 'text-light-text')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
