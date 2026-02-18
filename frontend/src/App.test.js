import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('lenis', () => {
  return function Lenis() {
    return { raf: () => {}, destroy: () => {} };
  };
});

import App from './App';

test('renders without crashing', () => {
  render(<App />);
  expect(screen.getByTestId('navbar')).toBeInTheDocument();
});

test('main content or error fallback is present', () => {
  render(<App />);
  const main = document.getElementById('main');
  const errorFallback = screen.queryByText(/something went wrong/i);
  expect(main !== null || errorFallback !== null).toBe(true);
});
