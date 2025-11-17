import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FileFilter from '../../components/FileFilter/FileFilter';
import { renderWithRedux } from '../testUtils';

describe('FileFilter Component', () => {
  test('renders and updates filter', () => {
    const { store } = renderWithRedux(<FileFilter />);
    const input = screen.getByPlaceholderText('Filter by file name...');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(store.getState().files.filter).toBe('test');
  });
});
