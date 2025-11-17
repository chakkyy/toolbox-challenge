import React from 'react';

const TableTitle = () => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h5 className="mb-0">Valid Files Data</h5>
      <small className="text-muted">
        Showing files with valid data only
      </small>
    </div>
  );
};

export default TableTitle;
