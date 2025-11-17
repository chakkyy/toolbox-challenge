import React from 'react';
import { screen } from '@testing-library/react';
import FileTable from '../../components/FileTable/FileTable';
import { renderWithRedux } from '../testUtils';

describe('FileTable Component', () => {
  test('renders without crashing', () => {
    renderWithRedux(<FileTable />);
    expect(screen.getByText('Valid Files Data')).toBeInTheDocument();
  });

  test('displays file data', () => {
    const mockFileData = [
      {
        file: 'test1.csv',
        lines: [{ text: 'hello', number: 123, hex: 'abc' }],
      },
    ];

    renderWithRedux(<FileTable />, {
      preloadedState: {
        files: { data: mockFileData, filter: '', loading: false, error: null },
      },
    });

    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
