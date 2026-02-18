import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className={`py-12 ${isDark ? 'bg-dark-bg border-t border-dark-border' : 'bg-light-bg border-t border-light-border'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a
            href="#"
            className={`font-display text-xl font-semibold ${
              isDark ? 'text-dark-text' : 'text-light-text'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-primary">{'<'}</span>
            SD
            <span className="text-primary">{'/>'}</span>
          </motion.a>

          {/* Social Links */}
          <div className="flex gap-4">
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
                data-testid={`footer-social-${label.toLowerCase()}`}
                className={`p-2 rounded-full transition-all ${
                  isDark
                    ? 'text-dark-muted hover:text-primary hover:bg-dark-surface'
                    : 'text-light-muted hover:text-primary hover:bg-light-surface'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className={`font-mono text-sm flex items-center gap-1 ${
            isDark ? 'text-dark-muted' : 'text-light-muted'
          }`}>
            Built with <Heart size={14} className="text-secondary" /> by Sriram Divi © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
