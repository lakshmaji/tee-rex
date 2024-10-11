import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import ROUTES from './routes';

// This isn't really required
describe('ROUTES configuration', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders the Products component on root route', async () => {
    const router = createMemoryRouter(ROUTES, {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText(/Products/i)).toBeInTheDocument();
    });
  });

  it('renders the Cart component on /cart route', async () => {
    const router = createMemoryRouter(ROUTES, {
      initialEntries: ['/cart'],
    });
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
    });
  });
});
