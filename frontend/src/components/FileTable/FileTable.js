import React from 'react';
import { Table } from 'react-bootstrap';
import useFileData from '../../hooks/useFileData';
import useSorting from '../../hooks/useSorting';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import './FileTable.css';

const FileTable = () => {
  const { loading, flattenedRows } = useFileData();
  const { handleSort, getSortIcon, sortedData } =
    useSorting(flattenedRows);

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
          <TableHeader
            onSort={handleSort}
            getSortIcon={getSortIcon}
          />
          <TableBody loading={loading} rows={sortedData} />
        </Table>
      </div>
    </>
  );
};

export default FileTable;
