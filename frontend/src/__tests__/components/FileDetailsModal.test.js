import React from 'react';
import { screen } from '@testing-library/react';
import FileDetailsModal from '../../components/FileDetailsModal/FileDetailsModal';
import { renderWithRedux } from '../testUtils';

describe('FileDetailsModal Component', () => {
  test('shows modal when open', () => {
    renderWithRedux(<FileDetailsModal />, {
      preloadedState: {
        modal: {
          isOpen: true,
          fileName: 'test.csv',
          fileData: { file: 'test.csv', lines: [{ text: 'hello', number: 123, hex: 'abc' }] },
          loading: false,
          error: null,
        },
      },
    });

    expect(screen.getByText('test.csv')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
