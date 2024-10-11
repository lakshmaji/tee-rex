import React, { FC } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, RouterProviderProps } from 'react-router-dom';
import Products, { loader } from './Products'; // Adjust the import path if necessary
import { getCatalog } from '../../services/catalog';
import ProductContainer from '../../components/product/ProductContainer';
import { Gender } from '../../types/common';
import { IProduct } from '../../types/product';

jest.mock('../../services/catalog');

jest.mock('../../components/product/ProductContainer', () => {
  return jest.fn((props) => <div>Mocked ProductContainer {JSON.stringify(props)}</div>);
});

jest.mock('../../components/product/search/SearchProducts', () => {
  const MockSearchProducts: FC<any> = ({ onChange }) => (
    <input type='text' placeholder='Search' onChange={(e) => onChange(e.target.value)} />
  );
  MockSearchProducts.displayName = 'SearchProducts';
  return MockSearchProducts;
});

const mockProducts: IProduct[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    imageURL: 'http://example.com/image1.jpg',
    quantity: 1,
    currency: 'INR',
    type: 'clothing',
    gender: 'Men' as Gender,
    color: 'red',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 150,
    imageURL: 'http://example.com/image2.jpg',
    quantity: 1,
    currency: 'INR',
    type: 'clothing',
    gender: 'Women' as Gender,
    color: 'red',
  },
];

describe('Products Component', () => {
  let router: RouterProviderProps['router'];
  const loaderMock = jest.fn().mockReturnValue({ products: mockProducts });
  beforeAll(() => {
    jest.clearAllMocks();
    const routes = [
      {
        path: 'products',
        element: <Products />,
        loader: loaderMock,
      },
    ];

    router = createMemoryRouter(routes, {
      initialEntries: ['/products'],
    });
  });

  it('toggles filters and passes correct props to ProductContainer', () => {
    render(<RouterProvider router={router} />);

    const button = screen.getByRole('button');

    expect(ProductContainer).toHaveBeenCalledWith(
      expect.objectContaining({ collapse: true }),
      expect.anything(),
    );

    fireEvent.click(button);

    expect(ProductContainer).toHaveBeenCalledWith(
      expect.objectContaining({ collapse: false }),
      expect.anything(),
    );
  });

  it('updates search term and passes it to ProductContainer', () => {
    render(<RouterProvider router={router} />);

    const searchInput = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(searchInput, { target: { value: 'New Product' } });

    expect(ProductContainer).toHaveBeenCalledWith(
      expect.objectContaining({ searchTerm: 'New Product' }),
      expect.anything(),
    );
  });

  it('updates icon based on collapse state', () => {
    render(<RouterProvider router={router} />);

    const button = screen.getByRole('button');

    expect(button).toContainHTML('<i class="fa fa-filter"');

    fireEvent.click(button);

    expect(button).toContainHTML('<i class="fa fa-times"');
  });

  it('passes product items to ProductContainer when products are available', async () => {
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(ProductContainer).toHaveBeenCalledWith(
        expect.objectContaining({ products: mockProducts, collapse: true, searchTerm: '' }),
        expect.anything(),
      );
    });
  });
});

it('passes an empty array to ProductContainer when no products are available', async () => {
  jest.clearAllMocks();
  const loaderMock = jest.fn().mockReturnValue({ products: [] });
  const routes = [
    {
      path: 'products',
      element: <Products />,
      loader: loaderMock,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/products'],
  });
  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(ProductContainer).toHaveBeenCalledWith(
      expect.objectContaining({ products: [], collapse: true, searchTerm: '' }),

      expect.anything(),
    );
  });
});

describe('loader', () => {
  it('should fetch and return products', async () => {
    (getCatalog as jest.Mock).mockResolvedValueOnce(mockProducts);
    const data = await loader();
    expect(data.products).toEqual(mockProducts);
  });
});
