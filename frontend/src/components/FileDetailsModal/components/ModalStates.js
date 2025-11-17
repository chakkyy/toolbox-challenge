import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';

export const LoadingState = () => (
  <div className="text-center py-4">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    <p className="mt-2">Loading file details...</p>
  </div>
);

/**
 * Error state component
 * @param {string} error - Error message to display
 * @param {Function} onClose - Callback when alert is closed
 */
export const ErrorState = ({ error, onClose }) => (
  <Alert variant="danger" dismissible onClose={onClose}>
    <Alert.Heading>Error</Alert.Heading>
    <p>{error}</p>
  </Alert>
);

/**
 * Empty state component for table
 * @param {Array} lines - Array of file lines
 */
export const EmptyState = ({ lines }) => {
  const message =
    lines?.length === 0
      ? 'File is empty or all lines have insufficient data.'
      : 'No data available for this file.';

  return (
    <tr>
      <td colSpan="3" className="text-center text-muted">
        {message}
      </td>
    </tr>
  );
};
