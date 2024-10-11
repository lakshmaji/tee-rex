import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from './Logo';
import { MemoryRouter } from 'react-router-dom';

describe('Logo Component', () => {
  it('should render the link', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
  it('should render the title', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );
    expect(screen.getByRole('link')).toHaveTextContent('T-Rex');
  });
});
