import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EmptyCart from './EmptyCart';
import { MemoryRouter } from 'react-router-dom';

describe('EmptyCart Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/cart']}>
        <EmptyCart />
      </MemoryRouter>,
    );
  });
  it('should render the title', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Your cart is empty');
  });
  it('should redirect to / path', () => {
    const linkElement = screen.getByRole('link', { name: /shopping/i });
    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe('/');
  });
});
