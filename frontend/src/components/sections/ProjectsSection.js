import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const projects = [
  {
    id: 1,
    title: 'Flow',
    description: 'A scalable full-stack productivity dashboard built with React 19, TailwindCSS, and FastAPI. Features secure JWT authentication, real-time updates, and a modern UI.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/SriramDivi1/Flow',
    live: 'https://flow-app-zeta.vercel.app/',
    category: 'Full-Stack',
    featured: true,
    highlights: [
      'JWT auth & real-time updates',
      'React 19 + FastAPI backend',
      'Responsive dashboard UI',
      'PostgreSQL + SQLAlchemy'
    ]
  },
  {
    id: 2,
    title: 'ItsMyScreen',
    description: 'A real-time, futuristic polling application built with Next.js 16, Supabase, and Tailwind CSS. Create instant polls, vote anonymously, and watch live results.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Optimistic UI'],
    github: 'https://github.com/SriramDivi1/ItsMyScreen',
    live: 'https://itsmyscreen-by-sriram.vercel.app',
    category: 'Full-Stack',
    featured: true,
    highlights: [
      'Real-time polling & live results',
      'Next.js 16 + Supabase',
      'Anonymous voting',
      'Optimistic UI updates'
    ]
  },
  {
    id: 3,
    title: 'Mini CRM Backend',
    description: 'Production-quality REST API with NestJS, PostgreSQL, and Prisma — Authentication, RBAC, and Clean Architecture.',
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
    id: 4,
    title: 'TaskFlow',
    description: 'A modern task management app built with React, TypeScript, and Tailwind CSS featuring intuitive UI, calendar integration, and comprehensive accessibility.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'PWA'],
    github: 'https://github.com/SriramDivi1/TaskFlow',
    live: 'https://taskflow-app-iota.vercel.app',
    category: 'Frontend',
    featured: false,
    highlights: [
      'Calendar integration',
      'Mobile-first PWA',
      'Accessibility-focused',
      'Shadcn UI components'
    ]
  },
  {
    id: 5,
    title: 'Health Pay',
    description: 'Healthcare payment and management application with a modern frontend and seamless user flows.',
    tech: ['JavaScript', 'React', 'Vercel'],
    github: 'https://github.com/SriramDivi1/Health_Pay',
    live: 'https://health-pay-six.vercel.app',
    category: 'Frontend',
    featured: false,
    highlights: []
  },
  {
    id: 6,
    title: 'BMW M Series Landing Page',
    description: 'Premium BMW M Series landing page with interactive 3D models, dark/light mode, smooth animations & responsive design. Built with React, Three.js & Framer Motion.',
    tech: ['React', 'Three.js', 'TypeScript', 'Framer Motion'],
    github: 'https://github.com/SriramDivi1/BMW-Landing-Page',
    live: 'https://bmwgallery.vercel.app/',
    category: 'Frontend',
    featured: false,
    highlights: []
  },
  {
    id: 7,
    title: 'Expense Tracker',
    description: 'A premium expense tracking application with advanced analytics, budget management, and glassmorphism UI. Features dark mode, interactive charts, and comprehensive financial reports.',
    tech: ['React', 'Vite', 'Vanilla CSS', 'Charts'],
    github: 'https://github.com/SriramDivi1/expense-tracker-portfolio',
    live: 'https://expense-tracker-portfolio-omega.vercel.app',
    category: 'Frontend',
    featured: false,
    highlights: []
  },
  {
    id: 8,
    title: 'SyncPlay',
    description: 'One-stop streaming solution for movies, series, and live streams. Watch together with friends in real-time with synchronized playback and chat.',
    tech: ['TypeScript', 'React', 'Real-time'],
    github: 'https://github.com/SriramDivi1/SyncPlay',
    category: 'Full-Stack',
    featured: false,
    highlights: []
  },
  {
    id: 9,
    title: 'Aira Client OS',
    description: 'Aira frontend monorepo — Next.js web dashboard + React Native mobile app (Frontend hiring assignment).',
    tech: ['Next.js', 'React Native', 'TypeScript'],
    github: 'https://github.com/SriramDivi1/aira-client-os',
    category: 'Full-Stack',
    featured: false,
    highlights: []
  },
  {
    id: 10,
    title: 'Real-Time Chat App',
    description: 'Real-time messaging application with live updates and modern chat UX.',
    tech: ['JavaScript', 'React', 'Real-time'],
    github: 'https://github.com/SriramDivi1/real-time-chat-app',
    category: 'Full-Stack',
    featured: false,
    highlights: []
  },
  {
    id: 11,
    title: 'ATS Resume System',
    description: 'Applicant tracking and resume parsing system for streamlined hiring workflows.',
    tech: ['JavaScript', 'Node.js'],
    github: 'https://github.com/SriramDivi1/ats-resume-system',
    category: 'Backend',
    featured: false,
    highlights: []
  },
  {
    id: 12,
    title: 'Fixapp',
    description: 'Application for tracking and managing fixes and tasks.',
    tech: ['TypeScript', 'React'],
    github: 'https://github.com/SriramDivi1/Fixapp',
    category: 'Frontend',
    featured: false,
    highlights: []
  },
  {
    id: 13,
    title: 'This Portfolio',
    description: 'Personal portfolio site with dark/light theme, smooth scroll, and bento-style project gallery. Built with React, Tailwind, and Framer Motion.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    github: 'https://github.com/SriramDivi1/Portfolio',
    live: 'https://sriram-blush.vercel.app',
    category: 'Frontend',
    featured: false,
    highlights: []
  },
];

const categories = ['All', 'Frontend', 'Backend', 'Full-Stack'];

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
