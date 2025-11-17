import modalReducer, { openModal, closeModal } from '../../../redux/slices/modalSlice';

describe('modalSlice', () => {
  const initialState = {
    isOpen: false,
    fileName: null,
    fileData: null,
    loading: false,
    error: null,
  };

  test('openModal sets isOpen and fileName', () => {
    const actual = modalReducer(initialState, openModal('test.csv'));
    expect(actual.isOpen).toBe(true);
    expect(actual.fileName).toBe('test.csv');
  });

  test('closeModal resets state', () => {
    const openState = { ...initialState, isOpen: true, fileName: 'test.csv' };
    const actual = modalReducer(openState, closeModal());
    expect(actual.isOpen).toBe(false);
  });
});
