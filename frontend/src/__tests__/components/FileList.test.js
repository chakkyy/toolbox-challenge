import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FileList from '../../components/FileList/FileList';
import { renderWithRedux } from '../testUtils';

describe('FileList Component', () => {
  test('renders files and handles click', () => {
    const { store } = renderWithRedux(<FileList />, {
      preloadedState: {
        fileList: {
          files: ['test1.csv'],
          loading: false,
          error: null,
        },
      },
    });

    const fileItem = screen.getByText('test1.csv');
    fireEvent.click(fileItem);

    expect(store.getState().modal.isOpen).toBe(true);
  });
});
