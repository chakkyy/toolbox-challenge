/**
 * API Service Layer
 *
 * Provides a centralized interface for backend API communication.
 * Handles HTTP requests, error transformation, and response parsing.
 *
 * @module api
 */

import axios from 'axios';
import config from './config';

/**
 * Create axios instance with configured base URL
 */
const api = axios.create({
  baseURL: config.API_URL,
});

/**
 * Transform axios errors into consistent format
 * @param {Error} error - The axios error object
 * @returns {Object} Transformed error object
 */
const transformError = (error) => {
  // Handle axios response errors (HTTP errors)
  if (error.response) {
    return {
      message: error.response.data?.message || 'API request failed',
      status: error.response.status,
      data: error.response.data,
    };
  }

  // Handle network errors (no response)
  if (error.request) {
    return {
      message: 'Network error - unable to reach server',
      status: null,
      data: null,
    };
  }

  // Handle other errors
  return {
    message: error.message || 'An unexpected error occurred',
    status: null,
    data: null,
  };
};

/**
 * Fetches all files from the backend API
 * @returns {Promise<Array>} Promise that resolves with array of file data
 * @throws {Error} Throws error if request fails
 */
export const fetchFiles = async () => {
  try {
    const response = await api.get('/files/data');
    return response.data;
  } catch (error) {
    throw transformError(error);
  }
};

/**
 * Fetches files filtered by name from the backend API
 * @param {string} fileName - The file name to filter by
 * @returns {Promise<Array>} Promise that resolves with filtered file data array
 * @throws {Error} Throws error if request fails
 */
export const fetchFilesByName = async (fileName) => {
  try {
    const response = await api.get('/files/data', {
      params: { fileName },
    });
    return response.data;
  } catch (error) {
    throw transformError(error);
  }
};
