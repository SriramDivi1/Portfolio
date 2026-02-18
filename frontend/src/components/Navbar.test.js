import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from './Navbar';

const renderNavbar = () =>
  render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  );

test('navbar renders with logo and nav links', () => {
  renderNavbar();
  expect(screen.getByTestId('navbar')).toBeInTheDocument();
  expect(screen.getByTestId('logo')).toBeInTheDocument();
  expect(screen.getByTestId('nav-about')).toBeInTheDocument();
  expect(screen.getByTestId('nav-projects')).toBeInTheDocument();
  expect(screen.getByTestId('nav-contact')).toBeInTheDocument();
});

test('theme toggle button is present and clickable', () => {
  renderNavbar();
  const themeToggle = screen.getByTestId('theme-toggle');
  expect(themeToggle).toBeInTheDocument();
  fireEvent.click(themeToggle);
  expect(themeToggle).toBeInTheDocument();
});

test('mobile menu toggle opens and closes menu', () => {
  renderNavbar();
  const menuToggle = screen.getByTestId('mobile-menu-toggle');
  expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(menuToggle);
  expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(menuToggle);
  expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
});
