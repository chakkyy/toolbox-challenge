import { fetchFiles, fetchFilesByName, fetchFileList } from '../api';
import {
  setFiles,
  setLoading,
  setError,
  clearError,
  setModalFileData,
  setModalLoading,
  setModalError,
  setFileList,
  setFileListLoading,
  setFileListError,
} from './actions';

/**
 * Async thunk action to fetch files from the backend API
 * Manages loading and error states during the API call
 * @returns {Function} Thunk function for Redux dispatch
 */
export const fetchFilesAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(clearError());
      dispatch(setLoading(true));

      const data = await fetchFiles();
      dispatch(setFiles(data));
    } catch (error) {
      const errorMessage =
        error.message || 'Failed to fetch files. Please try again.';
      dispatch(setError(errorMessage));
      dispatch(setFiles([]));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

/**
 * Async thunk action to fetch a single file by name for the modal
 * Manages modal loading and error states during the API call
 * @param {string} fileName - The name of the file to fetch
 * @returns {Function} Thunk function for Redux dispatch
 */
export const fetchFileForModal = (fileName) => {
  return async (dispatch) => {
    try {
      dispatch(setModalLoading(true));
      dispatch(setModalError(null));

      const data = await fetchFilesByName(fileName);
      console.log('🚀 ~ fetchFileForModal ~ data:', data);

      if (data && data.length > 0) {
        dispatch(setModalFileData(data[0]));
      } else {
        dispatch(setModalError('No data found for this file'));
      }
    } catch (error) {
      const errorMessage =
        error.message ||
        'Failed to fetch file details. Please try again.';
      dispatch(setModalError(errorMessage));
    } finally {
      dispatch(setModalLoading(false));
    }
  };
};

/**
 * Async thunk action to fetch list of all available files
 * Manages file list loading and error states during the API call
 * @returns {Function} Thunk function for Redux dispatch
 */
export const fetchFileListAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(setFileListLoading(true));
      dispatch(setFileListError(null));

      const data = await fetchFileList();

      if (data && data.files) {
        dispatch(setFileList(data.files));
      } else {
        dispatch(setFileList([]));
      }
    } catch (error) {
      const errorMessage =
        error.message ||
        'Failed to fetch file list. Please try again.';
      dispatch(setFileListError(errorMessage));
      dispatch(setFileList([]));
    } finally {
      dispatch(setFileListLoading(false));
    }
  };
};
