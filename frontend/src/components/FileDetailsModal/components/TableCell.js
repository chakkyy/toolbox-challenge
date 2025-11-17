import React from 'react';

/**
 * Renders a table cell with validation styling
 * @param {string} value - The cell value
 * @param {boolean} isInvalid - Whether the field is invalid
 * @param {string} type - Field type: 'text', 'number', or 'hex'
 */
const TableCell = ({ value, isInvalid, type = 'text' }) => {
  const className = isInvalid ? 'invalid-field' : '';

  if (!value) {
    return (
      <td className={className}>
        <span className="text-muted">Empty</span>
      </td>
    );
  }

  // Special handling for number field - show quotes around invalid numbers
  if (type === 'number' && isInvalid) {
    return (
      <td className={className}>
        <span className="invalid-value">&quot;{value}&quot;</span>
      </td>
    );
  }

  // Special handling for hex field - show character count for invalid hex
  if (type === 'hex') {
    return (
      <td className={className}>
        <span
          className={isInvalid ? 'hex-value-invalid' : 'hex-value'}
        >
          {value}
        </span>
        {isInvalid && (
          <small className="hex-length-indicator">
            ({value.length} chars)
          </small>
        )}
      </td>
    );
  }

  return <td className={className}>{value}</td>;
};

export default TableCell;
