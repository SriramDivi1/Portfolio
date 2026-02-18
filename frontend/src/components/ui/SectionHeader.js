import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Section header with mono label (e.g. // 01. ABOUT) and display heading.
 */
export function SectionHeader({ label, title, className, align = 'left' }) {
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
    </motion.div>
  );
}
