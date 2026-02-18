import React from 'react';
import { cn } from '../../lib/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Pill/tag for tech stack, certifications, etc. Theme-aware.
 */
export function Tag({ children, className, as: Component = 'span', ...props }) {
  const { isDark } = useTheme();
  return (
    <Component
      className={cn(
        'px-3 py-1 text-xs font-mono rounded-lg transition-colors',
        isDark ? 'bg-dark-bg text-dark-muted' : 'bg-light-bg text-light-muted',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Rounded-full variant for filter buttons and certification chips.
 */
export function TagPill({ children, className, active, ...props }) {
  const { isDark } = useTheme();
  return (
    <span
      className={cn(
        'inline-block px-4 py-2 rounded-full font-mono text-sm transition-all',
        active
          ? 'bg-primary text-white'
          : isDark
            ? 'bg-dark-bg border border-dark-border text-dark-muted hover:text-dark-text hover:border-primary/50'
            : 'bg-light-bg border border-light-border text-light-muted hover:text-light-text hover:border-primary/50',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
