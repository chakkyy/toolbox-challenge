const axios = require('axios');
const { handleApiError } = require('../utils/apiErrorHandler');

if (!process.env.ENDPOINT) {
  throw new Error('Missing required environment variable: ENDPOINT');
}
if (!process.env.ENDPOINT_TOKEN) {
  throw new Error(
    'Missing required environment variable: ENDPOINT_TOKEN'
  );
}

const apiClient = axios.create({
  baseURL: process.env.ENDPOINT,
  headers: {
    Authorization: process.env.ENDPOINT_TOKEN,
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Fetch list of available CSV files from external API
 * @returns {Promise<string[]>} Array of file names
 * @throws {Error} On network failure or API error
 */
async function getAllFiles() {
  try {
    const response = await apiClient.get('/files');
    return response.data.files;
  } catch (error) {
    handleApiError(error, 'getAllFiles');
  }
}

/**
 * Download CSV content for a specific file
 * @param {string} fileName - Name of the file to download
 * @returns {Promise<string>} CSV content as string
 * @throws {Error} On network failure or API error
 */
async function getFile(fileName) {
  if (!fileName) {
    throw new Error('fileName parameter is required');
  }

  try {
    const response = await apiClient.get(`/file/${fileName}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'getFile');
  }
}

module.exports = {
  getAllFiles,
  getFile,
};
