/**
 * Handle and format axios errors with context
 * @param {Error} error - Axios error object
 * @param {string} context - Function or operation name for context
 * @throws {Error} Formatted error with descriptive message
 */
function handleApiError(error, context) {
  if (error.response) {
    const status = error.response.status;
    const message =
      error.response.data?.message || error.response.statusText;
    throw new Error(`${context}: API error ${status} - ${message}`);
  } else if (error.request) {
    throw new Error(`${context}: Network error - ${error.message}`);
  } else {
    throw new Error(
      `${context}: Request setup error - ${error.message}`
    );
  }
}

module.exports = {
  handleApiError,
};
