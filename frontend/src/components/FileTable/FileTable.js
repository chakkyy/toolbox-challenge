import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import SkeletonRow from '../SkeletonRow';
import './FileTable.css';

const FileTable = () => {
  const files = useSelector((state) => state.files.data);
  const filterText = useSelector((state) => state.files.filter);
  const loading = useSelector((state) => state.files.loading);

  const filteredFiles = useMemo(() => {
    if (!filterText) return files;
    return files.filter((file) =>
      file.file.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [files, filterText]);

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
    filteredFiles.forEach((file) => {
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
  }, [filteredFiles, sortConfig]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Valid Files Data</h5>
        <small className="text-muted">
          Showing files with valid data only
        </small>
      </div>
      <div className="table-responsive table-container">
        <Table striped bordered hover className="file-table">
        <thead>
          <tr>
            <th
              onClick={() => handleSort('file')}
              className="sortable-header"
            >
              File Name{getSortIcon('file')}
            </th>
            <th
              onClick={() => handleSort('text')}
              className="sortable-header"
            >
              Text{getSortIcon('text')}
            </th>
            <th
              onClick={() => handleSort('number')}
              className="sortable-header"
            >
              Number{getSortIcon('number')}
            </th>
            <th
              onClick={() => handleSort('hex')}
              className="sortable-header"
            >
              Hex{getSortIcon('hex')}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SkeletonRow key={`skeleton-${index}`} />
            ))
          ) : sortedRows && sortedRows.length > 0 ? (
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
    </div>
    </>
  );
};

export default FileTable;
