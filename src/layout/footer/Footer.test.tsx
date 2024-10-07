import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('Footer Component', () => {
  it('should render the links', () => {
    render(<Footer />);
    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(3);
  });
});
