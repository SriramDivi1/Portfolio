import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { useTheme } from '../../context/ThemeContext';

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Responsive Design', level: 85 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Java', level: 85 },
      { name: 'Python', level: 85 },
      { name: 'NestJS', level: 85 },
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 75 },
      { name: 'REST APIs', level: 90 },
      { name: 'JWT/Auth', level: 85 },
    ],
  },
  {
    name: 'Database & DevOps',
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'Prisma ORM', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'Git/GitHub', level: 90 },
    ],
  },
];

const marqueeSkills = [
  'React', 'NestJS', 'TypeScript', 'PostgreSQL', 'Docker', 'Node.js',
  'JavaScript', 'Java', 'Python', 'Prisma', 'JWT', 'REST APIs', 'MongoDB', 'Git',
  'Swagger', 'Express', 'HTML', 'CSS', 'Postman', 'VS Code',
];

const SkillsSection = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className={`py-24 md:py-32 ${isDark ? 'bg-dark-surface' : 'bg-light-surface'}`}
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
            {'// 03. SKILLS'}
          </span>
          <h2 className={`font-display text-4xl md:text-6xl font-semibold mt-4 ${isDark ? 'text-dark-text' : 'text-light-text'
            }`}>
            Tech Stack
          </h2>
        </motion.div>

        {/* Marquee */}
        <motion.div
          data-testid="skills-marquee"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 overflow-hidden"
        >
          <Marquee
            gradient={true}
            gradientColor={isDark ? '#0A0A0A' : '#FAFAFA'}
            speed={40}
            className="py-4"
          >
            {marqueeSkills.map((skill, index) => (
              <span
                key={index}
                className={`mx-6 font-mono text-2xl md:text-4xl font-semibold ${index % 2 === 0 ? 'text-primary' : isDark ? 'text-dark-muted' : 'text-light-muted'
                  }`}
              >
                {skill}
              </span>
            ))}
          </Marquee>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              data-testid={`skill-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`p-6 rounded-2xl ${isDark
                  ? 'bg-dark-bg border border-dark-border'
                  : 'bg-light-bg border border-light-border'
                }`}
            >
              <h3 className={`font-display text-xl font-semibold mb-6 ${isDark ? 'text-dark-text' : 'text-light-text'
                }`}>
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className={`font-mono text-sm ${isDark ? 'text-dark-text' : 'text-light-text'
                        }`}>
                        {skill.name}
                      </span>
                      <span className={`font-mono text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'
                        }`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-dark-border' : 'bg-light-border'
                      }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className={`font-display text-2xl font-semibold mb-6 ${isDark ? 'text-dark-text' : 'text-light-text'
            }`}>
            Certifications
          </h3>
          <div className="flex flex-wrap gap-4">
            {[
              'Foundations of Cybersecurity',
              'Deloitte Data Analytics',
              'Linux and SQL Security',
              'Data Analytics Essentials',
            ].map((cert, index) => (
              <motion.span
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-full font-mono text-sm ${isDark
                    ? 'bg-dark-bg border border-dark-border text-dark-muted hover:border-primary'
                    : 'bg-light-bg border border-light-border text-light-muted hover:border-primary'
                  } transition-colors`}
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
