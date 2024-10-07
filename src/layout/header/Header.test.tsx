import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

jest.mock('../../components/common/Logo', () => {
  const MockLogo = () => <div data-testid='mock-logo'>Logo</div>;
  MockLogo.displayName = 'Logo';
  return MockLogo;
});

jest.mock('../../components/common/CartCounter', () => {
  const MockCounter = () => <div data-testid='mock-cart-counter'>Cart Counter</div>;
  MockCounter.displayName = 'CartCounter';
  return MockCounter;
});

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>,
    );
  });

  it('should render the Logo components', () => {
    const logoElements = screen.getAllByTestId('mock-logo');
    expect(logoElements).toHaveLength(2);
    expect(logoElements[1]).toBeVisible();
  });

  it('should render the CartCounter components', () => {
    const cartCounterElement = screen.getAllByTestId('mock-cart-counter');
    expect(cartCounterElement).toHaveLength(2);
    expect(cartCounterElement[1]).toBeVisible();
  });

  it('should contain the correct navigation links', () => {
    const productsLink = screen.getByRole('link', { name: /Products/i });
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute('href', '/');
  });

  it('should render the navigation bar with correct classes', () => {
    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass(
      'navbar',
      'fixed-top',
      'navbar-expand-lg',
      'navbar-light',
      'bg-light',
    );
  });

  it('should toggle collapse on smaller screens', () => {
    const toggleButton = screen.getByLabelText(/Toggle navigation/i);
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('data-toggle', 'collapse');
    expect(toggleButton).toHaveAttribute('data-target', '#navbarToggler');
  });

  it('should render the active link for Products', () => {
    const productsLink = screen.getByRole('link', { name: /Products/i });

    expect(productsLink).toBeInTheDocument();

    expect(productsLink).toHaveClass('btn-dark');
  });
});

it('should not have active class when not on the Products page', () => {
  render(
    <MemoryRouter initialEntries={['/cart']}>
      <Header />
    </MemoryRouter>,
  );

  const productsLink = screen.getByRole('link', { name: /Products/i });
  expect(productsLink).toHaveClass('btn-light');
  expect(productsLink).toHaveClass('btn-outline-dark');
});
