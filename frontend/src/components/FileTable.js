import React from 'react';
import { Table } from 'react-bootstrap';

const FileTable = ({ files }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {files && files.length > 0 ? (
          files.map((file) =>
            file.lines.map((line, index) => (
              <tr key={`${file.file}-${index}`}>
                <td>{file.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            ))
          )
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
