import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Section header with mono label (e.g. // 01. ABOUT), display heading, and optional subtitle.
 */
export function SectionHeader({ label, title, subtitle, className, align = 'left' }) {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      className={cn('mb-16', align === 'center' && 'text-center', className)}
    >
      <span className={cn('font-mono text-sm', 'text-primary')}>
        {label}
      </span>
      <h2 className={cn(
        'font-display text-4xl md:text-6xl font-semibold mt-4 tracking-tight',
        isDark ? 'text-dark-text' : 'text-light-text'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-3 text-lg md:text-xl max-w-2xl', isDark ? 'text-dark-muted' : 'text-light-muted', align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
