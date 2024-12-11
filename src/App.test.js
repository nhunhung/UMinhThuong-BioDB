import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Trang chủ link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Trang chủ/i);
  expect(linkElement).toBeInTheDocument();
});

