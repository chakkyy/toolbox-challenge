export const SET_FILES = 'SET_FILES';
export const SET_FILTER = 'SET_FILTER';

export const setFiles = (files) => ({
  type: SET_FILES,
  payload: files,
});

export const setFilter = (filterText) => ({
  type: SET_FILTER,
  payload: filterText,
});
