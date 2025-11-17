import { fetchFiles } from '../api';
import {
  setFiles,
  setLoading,
  setError,
  clearError,
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
