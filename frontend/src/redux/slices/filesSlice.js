import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFiles } from '../../api';

/**
 * Async thunk to fetch files from the backend API
 * Automatically handles pending, fulfilled, and rejected states
 */
export const fetchFilesAsync = createAsyncThunk(
  'files/fetchFiles',
  async () => {
    const data = await fetchFiles();
    return data;
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    data: [],
    filter: '',
    loading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFilesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch files. Please try again.';
        state.data = [];
      });
  },
});

export const { setFilter, clearError } = filesSlice.actions;
export default filesSlice.reducer;
