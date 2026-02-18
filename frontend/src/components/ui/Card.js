import React from 'react';
import { cn } from '../../lib/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Themed panel/card with surface and border. Use for content blocks.
 */
export function Card({ children, className, as: Component = 'div', ...props }) {
  const { isDark } = useTheme();
  return (
    <Component
      className={cn(
        'rounded-2xl transition-colors',
        isDark
          ? 'bg-dark-surface border border-dark-border'
          : 'bg-light-surface border border-light-border',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Inner card (nested) - uses bg tokens for “one level down”.
 */
export function CardInner({ children, className, as: Component = 'div', ...props }) {
  const { isDark } = useTheme();
  return (
    <Component
      className={cn(
        'rounded-xl transition-colors',
        isDark ? 'bg-dark-bg border border-dark-border' : 'bg-light-bg border border-light-border',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
