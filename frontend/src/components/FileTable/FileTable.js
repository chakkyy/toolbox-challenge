import React, { useState, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import './FileTable.css';

const FileTable = ({ files }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return ' ⇅';
    }
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  const sortedRows = useMemo(() => {
    const rows = [];
    files.forEach((file) => {
      file.lines.forEach((line) => {
        rows.push({
          file: file.file,
          text: line.text,
          number: line.number,
          hex: line.hex,
        });
      });
    });

    // Sort if a column is selected
    if (sortConfig.key) {
      rows.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        // Handle numerical sorting for 'number' column
        if (sortConfig.key === 'number') {
          return sortConfig.direction === 'asc'
            ? aVal - bVal
            : bVal - aVal;
        }

        // Handle alphabetical sorting (case-insensitive) for text columns
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();

        if (aStr < bStr) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aStr > bStr) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return rows;
  }, [files, sortConfig]);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th
            onClick={() => handleSort('file')}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background-color 0.2s',
            }}
            className="sortable-header"
          >
            File Name{getSortIcon('file')}
          </th>
          <th
            onClick={() => handleSort('text')}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background-color 0.2s',
            }}
            className="sortable-header"
          >
            Text{getSortIcon('text')}
          </th>
          <th
            onClick={() => handleSort('number')}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background-color 0.2s',
            }}
            className="sortable-header"
          >
            Number{getSortIcon('number')}
          </th>
          <th
            onClick={() => handleSort('hex')}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'background-color 0.2s',
            }}
            className="sortable-header"
          >
            Hex{getSortIcon('hex')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedRows && sortedRows.length > 0 ? (
          sortedRows.map((row, index) => (
            <tr key={`${row.file}-${row.text}-${index}`}>
              <td>{row.file}</td>
              <td>{row.text}</td>
              <td>{row.number}</td>
              <td>{row.hex}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default FileTable;
