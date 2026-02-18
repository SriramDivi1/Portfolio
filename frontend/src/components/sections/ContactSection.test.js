import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import ContactSection from './ContactSection';

const renderContact = () =>
  render(
    <ThemeProvider>
      <ContactSection />
    </ThemeProvider>
  );

test('contact section renders with form and inputs', () => {
  renderContact();
  expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  expect(screen.getByTestId('contact-form')).toBeInTheDocument();
  expect(screen.getByTestId('contact-name-input')).toBeInTheDocument();
  expect(screen.getByTestId('contact-email-input')).toBeInTheDocument();
  expect(screen.getByTestId('contact-subject-input')).toBeInTheDocument();
  expect(screen.getByTestId('contact-message-input')).toBeInTheDocument();
  expect(screen.getByTestId('contact-submit-btn')).toBeInTheDocument();
});
