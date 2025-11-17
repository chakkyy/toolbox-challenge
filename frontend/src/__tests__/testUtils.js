import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../redux/slices/filesSlice';
import modalReducer from '../redux/slices/modalSlice';
import fileListReducer from '../redux/slices/fileListSlice';

export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      files: filesReducer,
      modal: modalReducer,
      fileList: fileListReducer,
    },
    preloadedState,
  });
};

export const renderWithRedux = (
  component,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return {
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

export const mockFileData = [
  { file: 'test1.csv', text: 'hello', number: 123, hex: 'abc123' },
  { file: 'test2.csv', text: 'world', number: 456, hex: 'def456' },
];

export const mockFileList = {
  files: ['test1.csv', 'test2.csv', 'test3.csv'],
};
