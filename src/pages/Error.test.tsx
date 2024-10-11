import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error Component', () => {
  it('should render the link', () => {
    render(<Error />);
    expect(screen.getByRole('heading')).toHaveTextContent(/Oops/);
  });
});
