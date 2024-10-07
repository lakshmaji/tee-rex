import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Layout from '.';

jest.mock('./header/Header', () => {
  const MockHeader = () => <div data-testid='mock-header'>Header</div>;
  MockHeader.displayName = 'Header';
  return MockHeader;
});

jest.mock('./footer/Footer', () => {
  const MockFooter = () => <div data-testid='mock-footer'>Footer</div>;
  MockFooter.displayName = 'Footer';
  return MockFooter;
});

jest.mock('./../components/common/alert/Alert', () => {
  const MockAlert = () => <div data-testid='mock-alert'>Alert</div>;
  MockAlert.displayName = 'Alert';
  return MockAlert;
});

jest.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid='mock-outlet'>Outlet Content</div>,
  ScrollRestoration: () => <div data-testid='mock-scroll-restoration'>ScrollRestoration</div>,
}));

describe('Layout', () => {
  it('should render ScrollRestoration', () => {
    render(<Layout />);
    const scrollRestorationElement = screen.getByTestId('mock-scroll-restoration');
    expect(scrollRestorationElement).toBeInTheDocument();
  });

  it('should render Header component', () => {
    render(<Layout />);
    const headerElement = screen.getByTestId('mock-header');
    expect(headerElement).toBeInTheDocument();
  });

  it('should render Alert component', () => {
    render(<Layout />);
    const alertElement = screen.getByTestId('mock-alert');
    expect(alertElement).toBeInTheDocument();
  });

  it('should render Outlet component', () => {
    render(<Layout />);
    const outletElement = screen.getByTestId('mock-outlet');
    expect(outletElement).toBeInTheDocument();
  });

  it('should render Footer component', () => {
    render(<Layout />);
    const footerElement = screen.getByTestId('mock-footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('should apply correct styles to the container div', () => {
    render(<Layout />);
    const containerDiv = screen.getByTestId('mock-outlet').parentElement;
    expect(containerDiv).toHaveStyle('padding-top: 60px');
    expect(containerDiv).toHaveClass('bg-white');
  });
});
