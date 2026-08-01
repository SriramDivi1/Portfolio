import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { useTheme } from '../../context/ThemeContext';
import { SectionHeader } from '../ui/SectionHeader';
import { Card } from '../ui/Card';
import { Tag, TagPill } from '../ui/Tag';
import { cn } from '../../lib/cn';

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

const stackSnapshot = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'NestJS', 'FastAPI', 'Java', 'Python', 'REST APIs', 'JWT'],
  'Data & DevOps': ['PostgreSQL', 'Prisma', 'MongoDB', 'Docker', 'Git'],
};

const toolsList = ['VS Code', 'Postman', 'Figma', 'Docker', 'Git', 'Vercel'];

const SkillsSection = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className={cn('py-24 md:py-32 scroll-mt-20', isDark ? 'bg-dark-bg' : 'bg-light-surface')}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionHeader
          label="// 03. SKILLS"
          title="Tech Stack"
          subtitle="Technologies and tools I use to ship production-ready applications."
        />

        {/* Marquee */}
        <motion.div
          data-testid="skills-marquee"
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="mb-16 overflow-hidden"
        >
          <Marquee
            speed={shouldReduceMotion ? 0 : 40}
            gradient={true}
            gradientColor={isDark ? '#0A0A0A' : '#FAFAFA'}
            className="py-4"
          >
            {marqueeSkills.map((skill, index) => (
              <span
                key={index}
                className={cn(
                  'mx-6 font-mono text-2xl md:text-4xl font-semibold',
                  index % 2 === 0 ? 'text-primary' : isDark ? 'text-dark-muted' : 'text-light-muted'
                )}
              >
                {skill}
              </span>
            ))}
          </Marquee>
        </motion.div>

        {/* Stack snapshot */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="mb-12"
        >
          <h3 className={cn('font-display text-lg font-semibold mb-4', isDark ? 'text-dark-text' : 'text-light-text')}>
            Core stack
          </h3>
          <Card className="p-6">
            <div className="flex flex-wrap gap-6">
              {Object.entries(stackSnapshot).map(([group, skills]) => (
                <div key={group}>
                  <p className={cn('font-mono text-xs uppercase tracking-wider mb-2', 'text-primary')}>{group}</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <TagPill key={s}>{s}</TagPill>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={cn('mt-4 pt-4 border-t', isDark ? 'border-dark-border/50' : 'border-light-border/50')}>
              <p className={cn('font-mono text-xs uppercase tracking-wider mb-2', 'text-primary')}>Tools</p>
              <div className="flex flex-wrap gap-2">
                {toolsList.map((t) => (
                  <Tag key={t} className="rounded-full">{t}</Tag>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={category.name} as={motion.div} initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: shouldReduceMotion ? 0 : categoryIndex * 0.1, duration: shouldReduceMotion ? 0 : 0.3 }} data-testid={`skill-category-${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="p-6">
              <h3 className={cn('font-display text-xl font-semibold mb-6', isDark ? 'text-dark-text' : 'text-light-text')}>
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: shouldReduceMotion ? 0 : skillIndex * 0.05, duration: shouldReduceMotion ? 0 : 0.3 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className={cn('font-mono text-sm', isDark ? 'text-dark-text' : 'text-light-text')}>
                        {skill.name}
                      </span>
                      <span className={cn('font-mono text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={cn('h-2 rounded-full overflow-hidden', isDark ? 'bg-dark-border' : 'bg-light-border')}>
                      <motion.div
                        initial={{ width: shouldReduceMotion ? `${skill.level}%` : 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduceMotion ? 0 : 1, delay: shouldReduceMotion ? 0 : skillIndex * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="mt-16"
        >
          <h3 className={cn('font-display text-2xl font-semibold mb-6', isDark ? 'text-dark-text' : 'text-light-text')}>
            Certifications
          </h3>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'Foundations of Cybersecurity', issuer: 'Google' },
              { name: 'Data Analytics', issuer: 'Deloitte' },
              { name: 'Linux and SQL Security', issuer: 'Google' },
              { name: 'Data Analytics Essentials', issuer: 'IBM' },
            ].map(({ name, issuer }, index) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
              >
                <TagPill className="cursor-default">
                  {name}
                  <span className={cn('ml-1 font-mono text-xs opacity-80', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                    · {issuer}
                  </span>
                </TagPill>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
