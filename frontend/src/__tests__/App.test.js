import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../api');

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('React Test App')).toBeInTheDocument();
  });
});
