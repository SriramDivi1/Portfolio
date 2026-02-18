import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, Folder, FileText } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SectionHeader } from '../ui/SectionHeader';
import { Tag } from '../ui/Tag';
import { cn } from '../../lib/cn';
import { projects, categories } from '../../data/projects';
import CaseStudyModal from '../CaseStudyModal';

const ProjectsSection = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const motionTransition = shouldReduceMotion ? { duration: 0 } : { delay: 0, duration: 0.3 };

  const filteredProjects = useMemo(
    () => (activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className={cn('py-24 md:py-32', isDark ? 'bg-dark-bg' : 'bg-light-bg')}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionHeader label="// 02. PROJECTS" title="What I've Built" className="mb-12" />

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={motionTransition}
          className="flex flex-wrap gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              data-testid={`filter-${category.toLowerCase()}`}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-6 py-2 rounded-full font-mono text-sm transition-all border',
                activeCategory === category
                  ? 'bg-primary text-white border-primary'
                  : isDark
                    ? 'bg-dark-surface text-dark-muted hover:text-dark-text border-dark-border'
                    : 'bg-light-surface text-light-muted hover:text-light-text border-light-border'
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - Bento Style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={motionTransition}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.1, duration: shouldReduceMotion ? 0 : 0.3 }}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                data-testid={`project-card-${project.id}`}
                className={cn(
                  'group relative p-6 rounded-2xl transition-all hover:border-primary/50',
                  isDark ? 'bg-dark-surface border border-dark-border' : 'bg-light-surface border border-light-border',
                  project.featured && 'md:col-span-2 lg:col-span-2'
                )}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn('p-3 rounded-xl', isDark ? 'bg-dark-bg' : 'bg-light-bg')}>
                    <Folder size={24} className="text-primary" />
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-github-${project.id}`}
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          isDark ? 'hover:bg-dark-bg text-dark-muted hover:text-dark-text' : 'hover:bg-light-bg text-light-muted hover:text-light-text'
                        )}
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          isDark ? 'hover:bg-dark-bg text-dark-muted hover:text-dark-text' : 'hover:bg-light-bg text-light-muted hover:text-light-text'
                        )}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-mono bg-primary/20 text-primary rounded-full">
                    Featured Project
                  </span>
                )}

                {/* Project Info */}
                <h3 className={cn('font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors', isDark ? 'text-dark-text' : 'text-light-text')}>
                  {project.title}
                </h3>
                <p className={cn('text-sm leading-relaxed mb-4', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                  {project.description}
                </p>

                {/* Highlights */}
                {project.featured && (
                  <ul className={cn('mb-4 space-y-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>

                {/* View case study CTA */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className={cn(
                    'mt-4 w-full py-2 rounded-xl font-mono text-sm flex items-center justify-center gap-2 transition-colors',
                    isDark ? 'bg-dark-bg text-dark-muted hover:text-primary hover:border-primary/50 border border-dark-border' : 'bg-light-bg text-light-muted hover:text-primary hover:border-primary/50 border border-light-border'
                  )}
                  data-testid={`project-case-study-${project.id}`}
                >
                  <FileText size={16} />
                  View case study
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>
  );
};

export default ProjectsSection;
