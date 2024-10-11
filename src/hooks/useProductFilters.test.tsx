import useProductFilter from './useProductFilter';
import { IProduct } from '../types/product';
import { Currency, Gender } from '../types/common';
import { act, renderHook } from '@testing-library/react';

describe('useProductFilter Hook (Integration Test)', () => {
  const mockItems: IProduct[] = [
    {
      id: 1,
      name: 'Shirt',
      color: 'red',
      price: 50,
      gender: 'Men' as Gender,
      type: 'clothing',
      currency: 'INR' as Currency,
      quantity: 1,
      imageURL: 'https://im.g/sample-1.png',
    },
    {
      id: 2,
      name: 'Shoes',
      color: 'blue',
      price: 100,
      gender: 'Women' as Gender,
      type: 'footwear',
      currency: 'INR' as Currency,
      quantity: 1,
      imageURL: 'https://im.g/sample-1.png',
    },
    {
      id: 3,
      name: 'Hat',
      color: 'black',
      price: 25,
      gender: 'Men' as Gender,
      type: 'accessory',
      currency: 'INR' as Currency,
      quantity: 1,
      imageURL: 'https://im.g/sample-1.png',
    },
  ];

  it('should filter products by search term', () => {
    const { result } = renderHook(() => useProductFilter(mockItems));

    act(() => {
      const filteredItems = result.current.filter('iRt', [], [], {}, []);
      expect(filteredItems).toEqual([mockItems[0]]);
    });
  });

  it('should filter products by gender', () => {
    const { result } = renderHook(() => useProductFilter(mockItems));

    act(() => {
      const filteredItems = result.current.filter('', [], [], { male: true, female: false }, []);
      expect(filteredItems).toEqual([mockItems[0], mockItems[2]]);
    });
  });

  it('should filter products by price range', () => {
    const { result } = renderHook(() => useProductFilter(mockItems));

    act(() => {
      const filteredItems = result.current.filter('', [], [], {}, [30, 100]);
      expect(filteredItems).toEqual([mockItems.at(0), mockItems.at(1)]);
    });
  });

  it('should filter products by color', () => {
    const { result } = renderHook(() => useProductFilter(mockItems));

    act(() => {
      const filteredItems = result.current.filter('', ['red'], [], {}, []);
      expect(filteredItems).toEqual([mockItems[0]]);
    });
  });

  it('should filter products by type', () => {
    const { result } = renderHook(() => useProductFilter(mockItems));

    act(() => {
      const filteredItems = result.current.filter('', [], ['clothing'], {}, []);
      expect(filteredItems).toEqual([mockItems.at(0)]);
    });
  });

  it('should combine all filters correctly', () => {
    const { result } = renderHook(() => useProductFilter(mockItems));

    act(() => {
      const filteredItems = result.current.filter(
        'shI',
        ['red'],
        ['clothing'],
        { male: true, female: false },
        [26, 40],
      );
      expect(filteredItems).toEqual([]);
    });
  });

  it('should combine all filters correctly', () => {
    const { result } = renderHook(() => useProductFilter(mockItems));

    act(() => {
      const filteredItems = result.current.filter(
        'ha',
        ['black'],
        ['accessory'],
        { male: true, female: false },
        [20, 40],
      );
      expect(filteredItems).toEqual([mockItems.at(2)]);
    });
  });
});
