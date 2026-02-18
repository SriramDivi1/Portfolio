import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
    degree: 'M.Tech, Computer Science',
    institution: 'SRM University AP',
    period: 'Pursuing',
    cgpa: '7.29',
  },
  {
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'R.V.R & J.C. College of Engineering',
    period: 'Aug 2019 - Jun 2023',
  },
];

const ExperienceSection = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className={`py-24 md:py-32 ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className={`font-mono text-sm ${isDark ? 'text-primary' : 'text-primary'}`}>
            {'// 04. EXPERIENCE'}
          </span>
          <h2 className={`font-display text-4xl md:text-6xl font-semibold mt-4 ${
            isDark ? 'text-dark-text' : 'text-light-text'
          }`}>
            Where I've Worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-px ${
            isDark ? 'bg-dark-border' : 'bg-light-border'
          } transform -translate-x-1/2 hidden md:block`} />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              data-testid={`experience-card-${exp.id}`}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:ml-auto'
              }`}
            >
              {/* Timeline Node */}
              <div className={`absolute left-0 md:left-1/2 top-8 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 hidden md:block`}>
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
              </div>

              {/* Content Card */}
              <div className={`p-6 rounded-2xl ${
                index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
              } ${
                isDark
                  ? 'bg-dark-surface border border-dark-border'
                  : 'bg-light-surface border border-light-border'
              }`}>
                {/* Header */}
                <div className={`flex flex-wrap items-start gap-4 mb-4 ${
                  index % 2 === 0 ? 'md:justify-end' : ''
                }`}>
                  <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                    <h3 className={`font-display text-xl font-semibold ${
                      isDark ? 'text-dark-text' : 'text-light-text'
                    }`}>
                      {exp.role}
                    </h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className={`flex flex-wrap gap-4 mb-4 text-sm ${
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                } ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
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
                <p className={`mb-4 text-sm ${
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                }`}>
                  {exp.description}
                </p>

                {/* Achievements */}
                <ul className={`mb-4 space-y-2 ${
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                }`}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${
                      index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                    }`}>
                      <span className="w-1.5 h-1.5 mt-2 bg-primary rounded-full flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className={`flex flex-wrap gap-2 ${
                  index % 2 === 0 ? 'md:justify-end' : ''
                }`}>
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs font-mono rounded-full ${
                        isDark
                          ? 'bg-dark-bg text-dark-muted'
                          : 'bg-light-bg text-light-muted'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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
          <h3 className={`font-display text-2xl font-semibold mb-8 ${
            isDark ? 'text-dark-text' : 'text-light-text'
          }`}>
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`education-card-${index}`}
                className={`p-6 rounded-2xl ${
                  isDark
                    ? 'bg-dark-surface border border-dark-border'
                    : 'bg-light-surface border border-light-border'
                }`}
              >
                <h4 className={`font-semibold mb-2 ${
                  isDark ? 'text-dark-text' : 'text-light-text'
                }`}>
                  {edu.degree}
                </h4>
                <p className="text-primary mb-1">{edu.institution}</p>
                {edu.cgpa && (
                  <p className={`font-mono text-sm mb-1 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                    CGPA: {edu.cgpa}
                  </p>
                )}
                <p className={`font-mono text-sm ${
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                }`}>
                  {edu.period}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
