import filesReducer, { setFilter, fetchFilesAsync } from '../../../redux/slices/filesSlice';

describe('filesSlice', () => {
  const initialState = {
    data: [],
    filter: '',
    loading: false,
    error: null,
  };

  test('setFilter updates filter', () => {
    const actual = filesReducer(initialState, setFilter('test'));
    expect(actual.filter).toBe('test');
  });

  test('fetchFilesAsync.fulfilled updates data', () => {
    const mockData = [{ file: 'test.csv', lines: [] }];
    const actual = filesReducer(initialState, fetchFilesAsync.fulfilled(mockData));
    expect(actual.data).toEqual(mockData);
    expect(actual.loading).toBe(false);
  });
});
