import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Tam Tam/i)).toBeInTheDocument();
  });

  it('shows auth screen when not logged in', () => {
    render(<App />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});