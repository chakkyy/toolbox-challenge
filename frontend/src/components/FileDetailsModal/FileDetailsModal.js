import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Button,
  Table,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { closeModal } from '../../redux/slices/modalSlice';
import './FileDetailsModal.css';

const FileDetailsModal = () => {
  const dispatch = useDispatch();
  const { isOpen, fileName, fileData, loading, error } = useSelector(
    (state) => state.modal
  );

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      size="lg"
      aria-labelledby="file-details-modal-title"
      aria-describedby="file-details-modal-body"
    >
      <Modal.Header closeButton>
        <Modal.Title id="file-details-modal-title">
          {fileName || 'File Details'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body id="file-details-modal-body">
        {loading && (
          <div className="text-center py-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Loading file details...</p>
          </div>
        )}

        {error && !loading && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => dispatch(closeModal())}
          >
            <Alert.Heading>Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {!loading && !error && fileData && (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex</th>
                </tr>
              </thead>
              <tbody>
                {fileData.lines && fileData.lines.length > 0 ? (
                  fileData.lines.map((line, index) => (
                    <tr key={`${line.text}-${line.number}-${index}`}>
                      <td>{line.text}</td>
                      <td>{line.number}</td>
                      <td>{line.hex}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No valid lines available for this file. All data
                      failed validation. Please review the source file
                      manually.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}

        {!loading && !error && !fileData && (
          <p className="text-center text-muted">No data available</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileDetailsModal;
