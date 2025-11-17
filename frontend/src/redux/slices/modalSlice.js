import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilesByName } from '../../api';

/**
 * Async thunk to fetch file details for the modal
 * @param {string} fileName - The name of the file to fetch
 */
export const fetchFileForModal = createAsyncThunk(
  'modal/fetchFileForModal',
  async (fileName) => {
    const data = await fetchFilesByName(fileName);
    
    if (data && data.length > 0) {
      return data[0];
    } else {
      throw new Error('No data found for this file');
    }
  }
);

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    fileName: null,
    fileData: null,
    loading: false,
    error: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.fileName = action.payload;
      state.fileData = null;
      state.error = null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.fileName = null;
      state.fileData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileForModal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileForModal.fulfilled, (state, action) => {
        state.loading = false;
        state.fileData = action.payload;
      })
      .addCase(fetchFileForModal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch file details. Please try again.';
      });
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
