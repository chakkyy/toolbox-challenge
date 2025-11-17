import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './slices/filesSlice';
import modalReducer from './slices/modalSlice';
import fileListReducer from './slices/fileListSlice';

// Create Redux store with slice reducers
const store = configureStore({
  reducer: {
    files: filesReducer,
    modal: modalReducer,
    fileList: fileListReducer,
  },
});

export default store;
