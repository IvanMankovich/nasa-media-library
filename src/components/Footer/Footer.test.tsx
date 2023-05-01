import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

test('renders', () => {
  render(<Footer />);
  const footer = screen.getByText(/reponsible/i);
  expect(footer).toBeInTheDocument();
});
