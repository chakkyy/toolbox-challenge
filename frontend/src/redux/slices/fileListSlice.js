import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFileList } from '../../api';

/**
 * Async thunk to fetch list of all available files
 */
export const fetchFileListAsync = createAsyncThunk(
  'fileList/fetchFileList',
  async () => {
    const data = await fetchFileList();
    
    if (data && data.files) {
      return data.files;
    } else {
      return [];
    }
  }
);

const fileListSlice = createSlice({
  name: 'fileList',
  initialState: {
    files: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFileListAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFileListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload;
      })
      .addCase(fetchFileListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch file list. Please try again.';
        state.files = [];
      });
  },
});

export default fileListSlice.reducer;
