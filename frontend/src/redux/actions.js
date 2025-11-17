export const SET_FILES = 'SET_FILES';
export const SET_FILTER = 'SET_FILTER';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export const setFiles = (files) => ({
  type: SET_FILES,
  payload: files,
});

export const setFilter = (filterText) => ({
  type: SET_FILTER,
  payload: filterText,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (errorMessage) => ({
  type: SET_ERROR,
  payload: errorMessage,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
