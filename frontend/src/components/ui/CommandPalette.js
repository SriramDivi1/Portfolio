import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, User, FolderGit2, Cpu, Briefcase, Mail, Download, Copy, Moon, Github, ArrowRight, X, Code } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'sonner';
import { cn } from '../../lib/cn';
import { projects } from '../../data/projects';

const resumeUrl = 'https://drive.google.com/file/d/1wjSlvJXTGWO67cNrRhENUyV2OQscH0PW/view?usp=sharing';

const navigationItems = [
  { id: 'nav-about', label: 'Go to About', href: '#about', icon: User },
  { id: 'nav-projects', label: 'Go to Projects', href: '#projects', icon: FolderGit2 },
  { id: 'nav-skills', label: 'Go to Skills', href: '#skills', icon: Cpu },
  { id: 'nav-experience', label: 'Go to Experience', href: '#experience', icon: Briefcase },
  { id: 'nav-contact', label: 'Go to Contact', href: '#contact', icon: Mail },
];

const actionItems = [
  { id: 'action-resume', label: 'Download Resume', action: 'resume', icon: Download },
  { id: 'action-copy-email', label: 'Copy Email Address', action: 'copy-email', icon: Copy },
  { id: 'action-theme', label: 'Toggle Dark / Light Theme', action: 'theme', icon: Moon },
  { id: 'action-github', label: 'Open GitHub Profile', action: 'github', icon: Github },
];

export function CommandPalette({ isOpen, onClose }) {
  const { isDark, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeItemRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Auto-scroll selected item into view inside modal container
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const filteredGroups = useMemo(() => {
    const q = query.toLowerCase().trim();

    const navMatches = navigationItems.filter(
      (item) => !q || item.label.toLowerCase().includes(q)
    );

    const actionMatches = actionItems.filter(
      (item) => !q || item.label.toLowerCase().includes(q)
    );

    // Projects search matching
    const projectMatches = projects
      .filter((project) => {
        if (!q) return false;
        return (
          project.title.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.category?.toLowerCase().includes(q) ||
          project.tech.some((t) => t.toLowerCase().includes(q)) ||
          project.highlights?.some((h) => h.toLowerCase().includes(q))
        );
      })
      .map((project) => ({
        id: `project-${project.id}`,
        label: project.title,
        subtitle: project.tech.join(', '),
        type: 'project',
        projectTitle: project.title,
        href: '#projects',
        icon: FolderGit2,
      }));

    // Extract unique skills from projects
    const allSkillsSet = new Set();
    projects.forEach((p) => p.tech.forEach((t) => allSkillsSet.add(t)));
    const skillMatches = Array.from(allSkillsSet)
      .filter((skill) => q && skill.toLowerCase().includes(q))
      .map((skill) => ({
        id: `skill-${skill}`,
        label: `Skill: ${skill}`,
        type: 'skill',
        skillName: skill,
        href: '#skills',
        icon: Code,
      }));

    const groups = [];

    if (navMatches.length > 0) {
      groups.push({ heading: 'Navigation', items: navMatches });
    }
    if (projectMatches.length > 0) {
      groups.push({ heading: 'Projects', items: projectMatches });
    }
    if (skillMatches.length > 0) {
      groups.push({ heading: 'Skills', items: skillMatches });
    }
    if (actionMatches.length > 0) {
      groups.push({ heading: 'Actions', items: actionMatches });
    }

    return groups;
  }, [query]);

  const allItems = useMemo(() => filteredGroups.flatMap((group) => group.items), [filteredGroups]);

  const scrollToTarget = (href) => {
    const el = document.querySelector(href);
    if (!el) return;

    if (window.lenis) {
      window.lenis.scrollTo(el, { offset: -85, duration: 1.2 });
    } else {
      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    window.history.pushState(null, '', href);
  };

  const handleSelect = (item) => {
    onClose();
    if (item.type === 'project') {
      window.dispatchEvent(new CustomEvent('select-portfolio-project', { detail: item.projectTitle }));
      scrollToTarget('#projects');
    } else if (item.type === 'skill') {
      window.dispatchEvent(new CustomEvent('select-portfolio-project', { detail: item.skillName }));
      scrollToTarget('#projects');
    } else if (item.href) {
      scrollToTarget(item.href);
    } else if (item.action === 'resume') {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
      toast.success('Opening resume in new tab');
    } else if (item.action === 'copy-email') {
      navigator.clipboard.writeText('sriramdivi1@gmail.com');
      toast.success('Email copied to clipboard!');
    } else if (item.action === 'theme') {
      toggleTheme();
      toast.info(`Switched to ${isDark ? 'light' : 'dark'} mode`);
    } else if (item.action === 'github') {
      window.open('https://github.com/SriramDivi1', '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDownModal = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (allItems.length > 0 ? (prev + 1) % allItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (allItems.length > 0 ? (prev - 1 + allItems.length) % allItems.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        handleSelect(allItems[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            onKeyDown={handleKeyDownModal}
            className={cn(
              'relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border z-10',
              isDark
                ? 'bg-dark-surface border-dark-border text-dark-text'
                : 'bg-light-surface border-light-border text-light-text'
            )}
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3 border-b border-inherit">
              <Search className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, skills, or sections..."
                className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground font-mono"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground transition-colors ml-2"
                aria-label="Close command palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredGroups.length === 0 ? (
                <div className="py-8 text-center text-sm font-mono text-muted-foreground">
                  No results found matching "{query}"
                </div>
              ) : (
                filteredGroups.map((group) => (
                  <div key={group.heading} className="mb-2">
                    <div className="px-3 py-1 text-xs font-mono font-semibold uppercase text-primary tracking-wider">
                      {group.heading}
                    </div>
                    {group.items.map((item) => {
                      const globalIndex = allItems.findIndex((i) => i.id === item.id);
                      const isSelected = globalIndex === selectedIndex;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          ref={isSelected ? activeItemRef : null}
                          type="button"
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left',
                            isSelected
                              ? 'bg-primary text-white'
                              : isDark
                              ? 'hover:bg-dark-bg text-dark-text'
                              : 'hover:bg-light-bg text-light-text'
                          )}
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <Icon className={cn('w-4 h-4 flex-shrink-0', isSelected ? 'text-white' : 'text-primary')} />
                            <div className="truncate">
                              <div className="truncate font-medium">{item.label}</div>
                              {item.subtitle && (
                                <div className={cn('text-xs truncate font-mono', isSelected ? 'text-white/80' : 'text-muted-foreground')}>
                                  {item.subtitle}
                                </div>
                              )}
                            </div>
                          </div>
                          {isSelected && <ArrowRight className="w-4 h-4 text-white flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer shortcuts */}
            <div className="px-4 py-2 border-t border-inherit flex items-center justify-between text-xs font-mono text-muted-foreground bg-black/5 dark:bg-white/5">
              <span>Use ↑ ↓ to navigate, Enter to select</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
