import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useTheme } from '../../context/ThemeContext';

const ContactSection = () => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className={`py-24 md:py-32 ${isDark ? 'bg-dark-surface' : 'bg-light-surface'}`}
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className={`font-mono text-sm ${isDark ? 'text-primary' : 'text-primary'}`}>
            {'// 05. CONTACT'}
          </span>
          <h2 className={`font-display text-4xl md:text-6xl font-semibold mt-4 ${
            isDark ? 'text-dark-text' : 'text-light-text'
          }`}>
            Get In Touch
          </h2>
          <p className={`mt-4 max-w-xl mx-auto ${
            isDark ? 'text-dark-muted' : 'text-light-muted'
          }`}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'sriramdivi716@gmail.com', href: 'mailto:sriramdivi716@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 9398542488', href: 'tel:+919398542488' },
                { icon: MapPin, label: 'Location', value: 'Bangalore, Karnataka, India', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    isDark
                      ? 'bg-dark-bg border border-dark-border'
                      : 'bg-light-bg border border-light-border'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-dark-surface' : 'bg-light-surface'}`}>
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className={`font-mono text-sm ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        data-testid={`contact-${label.toLowerCase()}`}
                        className={`font-semibold hover:text-primary transition-colors ${
                          isDark ? 'text-dark-text' : 'text-light-text'
                        }`}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className={`font-semibold ${isDark ? 'text-dark-text' : 'text-light-text'}`}>
                        {value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map or illustration placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`mt-8 p-8 rounded-2xl text-center ${
                isDark
                  ? 'bg-dark-bg border border-dark-border'
                  : 'bg-light-bg border border-light-border'
              }`}
            >
              <p className={`font-mono text-sm mb-2 ${isDark ? 'text-dark-muted' : 'text-light-muted'}`}>
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
                <p className="text-green-700 dark:text-green-300 font-medium">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </motion.div>
            )}
            <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block font-mono text-sm mb-2 ${
                    isDark ? 'text-dark-muted' : 'text-light-muted'
                  }`}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    data-testid="contact-name-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-b-2 outline-none transition-all ${
                      isDark
                        ? 'bg-dark-bg border-dark-border text-dark-text focus:border-primary'
                        : 'bg-light-bg border-light-border text-light-text focus:border-primary'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className={`block font-mono text-sm mb-2 ${
                    isDark ? 'text-dark-muted' : 'text-light-muted'
                  }`}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    data-testid="contact-email-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-b-2 outline-none transition-all ${
                      isDark
                        ? 'bg-dark-bg border-dark-border text-dark-text focus:border-primary'
                        : 'bg-light-bg border-light-border text-light-text focus:border-primary'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                }`}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  data-testid="contact-subject-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border-b-2 outline-none transition-all ${
                    isDark
                      ? 'bg-dark-bg border-dark-border text-dark-text focus:border-primary'
                      : 'bg-light-bg border-light-border text-light-text focus:border-primary'
                  }`}
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label className={`block font-mono text-sm mb-2 ${
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                }`}>
                  Message
                </label>
                <textarea
                  name="message"
                  data-testid="contact-message-input"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border-b-2 outline-none transition-all resize-none ${
                    isDark
                      ? 'bg-dark-bg border-dark-border text-dark-text focus:border-primary'
                      : 'bg-light-bg border-light-border text-light-text focus:border-primary'
                  }`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                data-testid="contact-submit-btn"
                disabled={isSubmitting || isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white hover:glow-primary'
                }`}
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
