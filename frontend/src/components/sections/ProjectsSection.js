import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const projects = [
  {
    id: 1,
    title: 'Mini CRM Backend',
    description: 'Production-ready Mini CRM Backend API with JWT authentication, role-based authorization (RBAC), and comprehensive Swagger documentation.',
    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker', 'JWT'],
    github: 'https://github.com/SriramDivi1/Mini-CRM-Backend-Developer-Task',
    category: 'Backend',
    featured: true,
    highlights: [
      '15+ REST API endpoints',
      'JWT Auth & RBAC (Admin/Employee)',
      'Dockerized deployment',
      'Swagger documentation'
    ]
  },
  {
    id: 2,
    title: 'Responsive React Frontends',
    description: 'Collection of responsive frontend applications built with React and modern UI libraries, focusing on user experience and performance.',
    tech: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
    category: 'Frontend',
    featured: true,
    highlights: [
      'Dynamic user interfaces',
      'Modern UI/UX patterns',
      'Mobile-first approach',
      'Performance optimized'
    ]
  },
  {
    id: 3,
    title: 'Type-Safe Database Layer',
    description: 'Implementation of type-safe database queries using Prisma ORM, ensuring data integrity and developer productivity.',
    tech: ['Prisma', 'TypeScript', 'PostgreSQL', 'Node.js'],
    category: 'Backend',
    featured: false,
    highlights: [
      'Type-safe queries',
      'Database migrations',
      'Schema management',
      'Query optimization'
    ]
  },
  {
    id: 4,
    title: 'Docker Containerization',
    description: 'Containerized applications using Docker for consistent development and production deployments.',
    tech: ['Docker', 'Docker Compose', 'CI/CD', 'DevOps'],
    category: 'DevOps',
    featured: false,
    highlights: [
      'Multi-stage builds',
      'Container orchestration',
      'Environment parity',
      'Deployment automation'
    ]
  },
  {
    id: 5,
    title: 'Interactive API Documentation',
    description: 'Created interactive API documentation with Swagger/OpenAPI for better developer experience and API consumption.',
    tech: ['Swagger', 'OpenAPI', 'REST API', 'Documentation'],
    category: 'Backend',
    featured: false,
    highlights: [
      'Auto-generated docs',
      'Interactive testing',
      'Schema validation',
      'API versioning'
    ]
  },
];

const categories = ['All', 'Frontend', 'Backend', 'DevOps'];

const ProjectsSection = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className={`py-24 md:py-32 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className={`font-mono text-sm ${isDark ? 'text-primary' : 'text-primary'}`}>
            {'// 02. PROJECTS'}
          </span>
          <h2 className={`font-display text-4xl md:text-6xl font-semibold mt-4 ${
            isDark ? 'text-dark-text' : 'text-light-text'
          }`}>
            What I've Built
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              data-testid={`filter-${category.toLowerCase()}`}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-mono text-sm transition-all ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : isDark
                    ? 'bg-dark-surface text-dark-muted hover:text-dark-text border border-dark-border'
                    : 'bg-light-surface text-light-muted hover:text-light-text border border-light-border'
              }`}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                data-testid={`project-card-${project.id}`}
                className={`group relative p-6 rounded-2xl transition-all ${
                  project.featured ? 'md:col-span-2 lg:col-span-2' : ''
                } ${
                  isDark
                    ? 'bg-dark-surface border border-dark-border hover:border-primary/50'
                    : 'bg-light-surface border border-light-border hover:border-primary/50'
                }`}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
                    <Folder size={24} className="text-primary" />
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`project-github-${project.id}`}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? 'hover:bg-dark-bg text-dark-muted hover:text-dark-text'
                            : 'hover:bg-light-bg text-light-muted hover:text-light-text'
                        }`}
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg transition-colors ${
                          isDark
                            ? 'hover:bg-dark-bg text-dark-muted hover:text-dark-text'
                            : 'hover:bg-light-bg text-light-muted hover:text-light-text'
                        }`}
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
                <h3 className={`font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors ${
                  isDark ? 'text-dark-text' : 'text-light-text'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed mb-4 ${
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                }`}>
                  {project.description}
                </p>

                {/* Highlights */}
                {project.featured && (
                  <ul className={`mb-4 space-y-2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
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
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-mono rounded-lg ${
                        isDark
                          ? 'bg-dark-bg text-dark-muted'
                          : 'bg-light-bg text-light-muted'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
