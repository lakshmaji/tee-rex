import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App component', async () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
