import React from 'react';
import SkeletonRow from './SkeletonRow';

/**
 * Table body component with loading and empty states
 * @param {boolean} loading - Whether data is loading
 * @param {Array} rows - Array of row data to display
 */
const TableBody = ({ loading, rows }) => {
  if (loading) {
    return (
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonRow key={`skeleton-${index}`} />
        ))}
      </tbody>
    );
  }

  if (!rows || rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="4" className="text-center">
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row, index) => (
        <tr key={`${row.file}-${row.text}-${index}`}>
          <td>{row.file}</td>
          <td>{row.text}</td>
          <td>{row.number}</td>
          <td>{row.hex}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
