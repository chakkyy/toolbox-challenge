export const SET_FILES = 'SET_FILES';
export const SET_FILTER = 'SET_FILTER';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// Modal action types
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_MODAL_FILE_DATA = 'SET_MODAL_FILE_DATA';
export const SET_MODAL_LOADING = 'SET_MODAL_LOADING';
export const SET_MODAL_ERROR = 'SET_MODAL_ERROR';

// File list action types
export const SET_FILE_LIST = 'SET_FILE_LIST';
export const SET_FILE_LIST_LOADING = 'SET_FILE_LIST_LOADING';
export const SET_FILE_LIST_ERROR = 'SET_FILE_LIST_ERROR';

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

// Modal action creators
export const openModal = (fileName) => ({
  type: OPEN_MODAL,
  payload: fileName,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const setModalFileData = (fileData) => ({
  type: SET_MODAL_FILE_DATA,
  payload: fileData,
});

export const setModalLoading = (isLoading) => ({
  type: SET_MODAL_LOADING,
  payload: isLoading,
});

export const setModalError = (errorMessage) => ({
  type: SET_MODAL_ERROR,
  payload: errorMessage,
});

// File list action creators
export const setFileList = (fileList) => ({
  type: SET_FILE_LIST,
  payload: fileList,
});

export const setFileListLoading = (isLoading) => ({
  type: SET_FILE_LIST_LOADING,
  payload: isLoading,
});

export const setFileListError = (errorMessage) => ({
  type: SET_FILE_LIST_ERROR,
  payload: errorMessage,
});
