import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Tag } from './ui/Tag';
import { cn } from '../lib/cn';

/**
 * Accessible case-study modal: Escape to close, focus trap, aria-modal.
 */
export default function CaseStudyModal({ project, onClose }) {
  const { isDark } = useTheme();
  const overlayRef = useRef(null);
  const focusRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const timer = requestAnimationFrame(() => focusRef.current?.focus());
    const previouslyFocused = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
      <motion.div
        key="case-study-modal"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === overlayRef.current && onClose()}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />
        <motion.div
          ref={focusRef}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl',
            isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className={cn(
              'absolute top-4 right-4 p-2 rounded-full transition-colors z-10',
              isDark ? 'hover:bg-dark-bg text-dark-muted' : 'hover:bg-light-bg text-light-muted'
            )}
          >
            <X size={24} />
          </button>

          <div className="p-6 md:p-8">
            {project.image && (
              <div className="rounded-xl overflow-hidden mb-6 bg-dark-bg">
                <img
                  src={project.image}
                  alt=""
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <h2 id="case-study-title" className={cn('font-display text-2xl md:text-3xl font-semibold mb-2', isDark ? 'text-dark-text' : 'text-light-text')}>
              {project.title}
            </h2>
            <p className={cn('text-sm mb-4', isDark ? 'text-dark-muted' : 'text-light-muted')}>
              {project.description}
            </p>

            {project.role && (
              <p className={cn('text-sm mb-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                <span className="font-semibold">Role:</span> {project.role}
              </p>
            )}
            {project.problem && (
              <div className="mb-4">
                <h3 className={cn('font-mono text-xs uppercase tracking-wider mb-1', 'text-primary')}>Problem</h3>
                <p className={cn('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="mb-4">
                <h3 className={cn('font-mono text-xs uppercase tracking-wider mb-1', 'text-primary')}>Solution</h3>
                <p className={cn('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>{project.solution}</p>
              </div>
            )}
            {project.impact && (
              <div className="mb-4">
                <h3 className={cn('font-mono text-xs uppercase tracking-wider mb-1', 'text-primary')}>Impact</h3>
                <p className={cn('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>{project.impact}</p>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <ul className={cn('mb-4 space-y-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm transition-colors',
                    isDark ? 'bg-dark-bg text-dark-text hover:border-primary border border-dark-border' : 'bg-light-bg text-light-text hover:border-primary border border-light-border'
                  )}
                >
                  <Github size={18} />
                  Code
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm transition-colors',
                    'bg-primary text-white hover:opacity-90'
                  )}
                >
                  <ExternalLink size={18} />
                  Live demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
