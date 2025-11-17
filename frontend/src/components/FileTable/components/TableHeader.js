import React from 'react';

/**
 * Sortable table header component
 * @param {Function} onSort - Callback when column is clicked
 * @param {Function} getSortIcon - Function to get sort icon for column
 */
const TableHeader = ({ onSort, getSortIcon }) => {
  const columns = [
    { key: 'file', label: 'File Name' },
    { key: 'text', label: 'Text' },
    { key: 'number', label: 'Number' },
    { key: 'hex', label: 'Hex' },
  ];

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            onClick={() => onSort(column.key)}
            className="sortable-header"
          >
            {column.label}
            {getSortIcon(column.key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
