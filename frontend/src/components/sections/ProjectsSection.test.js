import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import ProjectsSection from './ProjectsSection';

const renderProjects = () =>
  render(
    <ThemeProvider>
      <ProjectsSection />
    </ThemeProvider>
  );

test('projects section renders with filters and cards', () => {
  renderProjects();
  expect(screen.getByTestId('projects-section')).toBeInTheDocument();
  expect(screen.getByTestId('filter-all')).toBeInTheDocument();
  expect(screen.getByTestId('filter-frontend')).toBeInTheDocument();
  expect(screen.getByTestId('filter-backend')).toBeInTheDocument();
  expect(screen.getByTestId('filter-full-stack')).toBeInTheDocument();
});

test('filtering by category updates active filter', () => {
  renderProjects();
  const filterBackend = screen.getByTestId('filter-backend');
  const filterAll = screen.getByTestId('filter-all');
  fireEvent.click(filterBackend);
  expect(filterBackend).toHaveClass('bg-primary');
  fireEvent.click(filterAll);
  expect(filterAll).toHaveClass('bg-primary');
});
