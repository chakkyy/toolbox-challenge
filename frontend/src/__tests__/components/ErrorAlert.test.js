import React from 'react';
import { screen } from '@testing-library/react';
import ErrorAlert from '../../components/ErrorAlert/ErrorAlert';
import { renderWithRedux } from '../testUtils';

describe('ErrorAlert Component', () => {
  test('displays error when present', () => {
    renderWithRedux(<ErrorAlert />, {
      preloadedState: {
        files: {
          data: [],
          filter: '',
          loading: false,
          error: 'Test error',
        },
      },
    });

    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
