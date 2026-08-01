import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle, Copy } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useTheme } from '../../context/ThemeContext';
import { SectionHeader } from '../ui/SectionHeader';
import { cn } from '../../lib/cn';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const MIN_SUBMIT_SECONDS = 3; // Spam: reject if form submitted too quickly

const ContactSection = () => {
  const { isDark } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const formMountTime = useRef(Date.now());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot: leave empty; bots often fill it
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    toast.success('Email address copied to clipboard!');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (formData.website) {
      toast.success('Message received. I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      return;
    }
    const elapsed = (Date.now() - formMountTime.current) / 1000;
    if (elapsed < MIN_SUBMIT_SECONDS) {
      toast.error('Please take a moment to complete the form, then try again.');
      return;
    }

    if (!BACKEND_URL.trim()) {
      setSubmitError('Contact form is not configured. Please email me directly using the address below.');
      toast.error('Form not configured. Use the email link below.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { name: formData.name, email: formData.email, subject: formData.subject, message: formData.message };
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        setSubmitError(null);
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        const msg = 'Failed to send. Please try again or email me directly.';
        setSubmitError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = 'Connection error. Check your network and try again, or email me directly.';
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className={cn('py-24 md:py-32 scroll-mt-20', isDark ? 'bg-dark-bg' : 'bg-light-surface')}
    >
      <Toaster
        position="top-center"
        theme={isDark ? 'dark' : 'light'}
        richColors
        toastOptions={{
          duration: 6000,
          style: {
            fontSize: '16px',
            padding: '16px 24px',
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <SectionHeader
          label="// 05. CONTACT"
          title="Get in Touch"
          subtitle="Open to full-time roles, internships, and freelance projects."
          align="center"
          className="mb-6"
        />
        <motion.p
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className={cn('mt-2 mb-4 max-w-xl mx-auto text-center', isDark ? 'text-dark-muted' : 'text-light-muted')}
        >
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll get back to you within 24 hours.
        </motion.p>
        <motion.p
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn('mb-16 text-sm mx-auto text-center', isDark ? 'text-dark-muted/80' : 'text-light-muted/80')}
        >
          Recruiters: resume and project links are one click away in the hero and footer.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'sriramdivi716@gmail.com', href: 'mailto:sriramdivi716@gmail.com', copyable: true },
                { icon: Phone, label: 'Phone', value: '+91 93985 42488', href: 'tel:+919398542488', copyable: true },
                { icon: MapPin, label: 'Location', value: 'Bangalore, India', href: null, copyable: false },
              ].map(({ icon: Icon, label, value, href, copyable }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 5 }}
                  className={cn(
                    'flex items-center justify-between p-4 rounded-xl',
                    isDark ? 'bg-dark-bg border border-dark-border' : 'bg-light-bg border border-light-border'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn('p-3 rounded-xl', isDark ? 'bg-dark-surface' : 'bg-light-surface')}>
                      <Icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className={cn('font-mono text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          data-testid={`contact-${label.toLowerCase()}`}
                          className={cn('font-semibold hover:text-primary transition-colors', isDark ? 'text-dark-text' : 'text-light-text')}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className={cn('font-semibold', isDark ? 'text-dark-text' : 'text-light-text')}>
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                  {copyable && (
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(value)}
                      aria-label={`Copy ${label} to clipboard`}
                      className={cn(
                        'p-2 rounded-lg transition-colors border',
                        isDark
                          ? 'bg-dark-surface hover:bg-dark-border text-dark-muted hover:text-dark-text border-dark-border'
                          : 'bg-light-surface hover:bg-light-border text-light-muted hover:text-light-text border-light-border'
                      )}
                    >
                      <Copy size={16} className="text-primary" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Map or illustration placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={cn(
                'mt-8 p-8 rounded-2xl text-center',
                isDark ? 'bg-dark-bg border border-dark-border' : 'bg-light-bg border border-light-border'
              )}
            >
              <p className={cn('font-mono text-sm mb-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                Let's build something amazing together!
              </p>
              <p className="text-4xl">🚀</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSubmitted && (
              <motion.div
                data-testid="contact-success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 flex items-center gap-3"
              >
                <CheckCircle size={24} className="text-green-500 shrink-0" />
                <p className={cn('font-medium', isDark ? 'text-green-300' : 'text-green-700')}>
                  Message sent successfully! I'll get back to you soon.
                </p>
              </motion.div>
            )}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center gap-3"
              >
                <p className={cn('text-sm font-medium', isDark ? 'text-secondary' : 'text-red-600')}>
                  {submitError}
                </p>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className={cn('block font-mono text-sm mb-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    data-testid="contact-name-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border-b-2 outline-none transition-all',
                      isDark ? 'bg-dark-bg border-dark-border text-dark-text focus:border-primary' : 'bg-light-bg border-light-border text-light-text focus:border-primary'
                    )}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={cn('block font-mono text-sm mb-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    data-testid="contact-email-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-xl border-b-2 outline-none transition-all',
                      isDark ? 'bg-dark-bg border-dark-border text-dark-text focus:border-primary' : 'bg-light-bg border-light-border text-light-text focus:border-primary'
                    )}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className={cn('block font-mono text-sm mb-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  data-testid="contact-subject-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border-b-2 outline-none transition-all',
                    isDark ? 'bg-dark-bg border-dark-border text-dark-text focus:border-primary' : 'bg-light-bg border-light-border text-light-text focus:border-primary'
                  )}
                  placeholder="e.g. project inquiry"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={cn('block font-mono text-sm mb-2', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  data-testid="contact-message-input"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={cn(
                    'w-full px-4 py-3 rounded-xl border-b-2 outline-none transition-all resize-none',
                    isDark ? 'bg-dark-bg border-dark-border text-dark-text focus:border-primary' : 'bg-light-bg border-light-border text-light-text focus:border-primary'
                  )}
                  placeholder="Tell me about your project…"
                />
              </div>

              {/* Honeypot: hidden from users; leave empty */}
              <div className="absolute -left-[9999px] top-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <motion.button
                type="submit"
                data-testid="contact-submit-btn"
                disabled={isSubmitting || isSubmitted}
                aria-busy={isSubmitting}
                aria-label={isSubmitting ? 'Sending message' : isSubmitted ? 'Message sent' : 'Send message'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all',
                  isSubmitted ? 'bg-green-500 text-white' : 'bg-primary text-white hover:glow-primary'
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
