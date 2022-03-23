import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Management header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Management/i);
  expect(linkElement).toBeInTheDocument();
});
