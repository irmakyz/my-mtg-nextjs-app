import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Search from '@/components/Search';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Search Component', () => {
  let setSearchTerm;
  let setPage;
  let router;

  beforeEach(() => {
    setSearchTerm = jest.fn();
    setPage = jest.fn();
    router = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(router);
  });

  test('renders Search component with initial value', () => {
    const { getByPlaceholderText } = render(
      <Search searchTerm="Test" setSearchTerm={setSearchTerm} setPage={setPage} />
    );

    const input = getByPlaceholderText('Search by card name...');
    expect(input.value).toBe('Test');
  });

  test('calls setSearchTerm, setPage, and push router on input change', () => {
    const { getByPlaceholderText } = render(
      <Search searchTerm="" setSearchTerm={setSearchTerm} setPage={setPage} />
    );

    const input = getByPlaceholderText('Search by card name...');
    fireEvent.change(input, { target: { value: 'New Search' } });

    expect(setSearchTerm).toHaveBeenCalledWith('New Search');
    expect(setPage).toHaveBeenCalledWith(1);
    expect(router.push).toHaveBeenCalledWith('/?page=1&search=New Search', { scroll: false });
  });
});