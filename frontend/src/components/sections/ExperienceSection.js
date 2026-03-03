import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { cn } from '../../lib/cn';

const experiences = [
  {
    id: 1,
    role: 'Backend Developer',
    company: 'Independent Project',
    type: 'Personal Project',
    location: 'Bangalore, Karnataka',
    period: 'Jan 2026 - Present',
    description: 'Developed a production-ready Mini CRM Backend API demonstrating enterprise-grade development practices.',
    achievements: [
      'Built complete REST API with NestJS and TypeScript serving 15+ endpoints',
      'Implemented JWT authentication and role-based authorization (RBAC)',
      'Designed PostgreSQL database schema with Prisma ORM',
      'Created comprehensive Swagger documentation for API consumption',
      'Containerized application using Docker for consistent deployments',
    ],
    tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker'],
  },
  {
    id: 2,
    role: 'Product Designer',
    company: 'Acadmus Edtech',
    type: 'Full-time',
    location: 'Bengaluru, Karnataka',
    period: 'Nov 2025 - Present',
    description: 'Working on product design for educational technology solutions.',
    achievements: [
      'Designing user-centric interfaces for edtech platforms',
      'Collaborating with development teams on feature implementation',
    ],
    tech: ['Figma', 'UI/UX', 'Product Design'],
  },
  {
    id: 3,
    role: 'Business Development Associate',
    company: 'Raam Group',
    type: 'Full-time',
    location: 'Hyderabad, Telangana',
    period: 'Jan 2023 - Mar 2023',
    description: 'Drove market expansion, built strategic partnerships, and supported revenue growth initiatives.',
    achievements: [
      'Conducted in-depth market research to identify new business opportunities',
      'Assisted in lead generation and outreach, fostering potential partnerships',
      'Developed business strategies to enhance sales and expansion efforts',
    ],
    tech: ['Market Research', 'Strategic Planning', 'Sales'],
  },
  {
    id: 4,
    role: 'Web Application Pentester',
    company: 'Indian Servers',
    type: 'Internship',
    location: 'India',
    period: 'May 2022 - Jul 2022',
    description: 'Gained hands-on experience in automated and manual Web Application VAPT.',
    achievements: [
      'Conducted Vulnerability Assessment & Penetration Testing (VAPT)',
      'Explored Open Source Intelligence (OSINT) for security insights',
      'Worked on Network Security including Sniffing & Scanning',
    ],
    tech: ['VAPT', 'OSINT', 'Network Security', 'Cybersecurity'],
  },
];

const education = [
  {
    degree: 'B.Tech - Computer Science & Engineering',
    institution: 'R.V.R & J.C. College of Engineering',
    period: 'Aug 2019 - Jun 2023',
    cgpa: '6.93',
  },
];

const ExperienceSection = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className={cn('py-24 md:py-32', isDark ? 'bg-dark-bg' : 'bg-light-bg')}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionHeader
          label="// 04. EXPERIENCE"
          title="Where I've Worked"
          subtitle="From internships and product design to full-stack projects and backend development."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className={cn('absolute left-0 md:left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2 hidden md:block', isDark ? 'bg-dark-border' : 'bg-light-border')} />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : index * 0.1, duration: shouldReduceMotion ? 0 : 0.3 }}
              data-testid={`experience-card-${exp.id}`}
              className={cn('relative mb-12 md:mb-16', index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:ml-auto')}
            >
              {/* Timeline Node */}
              <div className="absolute left-0 md:left-1/2 top-8 w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary transform -translate-x-1/2 hidden md:block ring-4 ring-primary/20" aria-hidden="true">
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              </div>

              {/* Content Card */}
              <Card className={cn('p-6', index % 2 === 0 ? 'md:mr-8' : 'md:ml-8')}>
                {/* Header */}
                <div className={cn('flex flex-wrap items-start gap-4 mb-4', index % 2 === 0 && 'md:justify-end')}>
                  <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                    <h3 className={cn('font-display text-xl font-semibold', isDark ? 'text-dark-text' : 'text-light-text')}>
                      {exp.role}
                    </h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className={cn('flex flex-wrap gap-4 mb-4 text-sm', isDark ? 'text-dark-muted' : 'text-light-muted', index % 2 === 0 && 'md:justify-end')}>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 size={14} />
                    {exp.type}
                  </span>
                </div>

                {/* Description */}
                <p className={cn('mb-4 text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                  {exp.description}
                </p>

                {/* Top achievements */}
                <h4 className={cn('font-mono text-xs uppercase tracking-wider mb-2', 'text-primary')}>
                  Top achievements
                </h4>
                <ul className={cn('mb-4 space-y-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className={cn('flex items-start gap-2 text-sm', index % 2 === 0 && 'md:flex-row-reverse md:text-right')}>
                      <span className="w-1.5 h-1.5 mt-2 bg-primary rounded-full flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>

                {/* Tech used */}
                <h4 className={cn('font-mono text-xs uppercase tracking-wider mb-2', 'text-primary', index % 2 === 0 && 'md:text-right')}>
                  Tech used
                </h4>
                <div className={cn('flex flex-wrap gap-2', index % 2 === 0 && 'md:justify-end')}>
                  {exp.tech.map((tech) => (
                    <Tag key={tech} className="rounded-full">{tech}</Tag>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className={cn('font-display text-2xl font-semibold mb-8', isDark ? 'text-dark-text' : 'text-light-text')}>
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <Card
                key={edu.degree}
                as={motion.div}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.1, duration: shouldReduceMotion ? 0 : 0.3 }}
                data-testid={`education-card-${index}`}
                className="p-6"
              >
                <h4 className={cn('font-semibold mb-2', isDark ? 'text-dark-text' : 'text-light-text')}>
                  {edu.degree}
                </h4>
                <p className="text-primary mb-1">{edu.institution}</p>
                {edu.cgpa && (
                  <p className={cn('font-mono text-sm mb-1', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                    CGPA: {edu.cgpa}
                  </p>
                )}
                <p className={cn('font-mono text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                  {edu.period}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
