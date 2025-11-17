import fileListReducer, { fetchFileListAsync } from '../../../redux/slices/fileListSlice';

describe('fileListSlice', () => {
  const initialState = {
    files: [],
    loading: false,
    error: null,
  };

  test('fetchFileListAsync.fulfilled updates files', () => {
    const mockFiles = ['test1.csv', 'test2.csv'];
    const actual = fileListReducer(initialState, fetchFileListAsync.fulfilled(mockFiles));
    expect(actual.files).toEqual(mockFiles);
    expect(actual.loading).toBe(false);
  });
});
