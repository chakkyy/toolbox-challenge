import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';
import { closeModal } from '../../redux/slices/modalSlice';
import FileLineRow from './components/FileLineRow';
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from './components/ModalStates';
import './FileDetailsModal.css';

const FileDetailsModal = () => {
  const dispatch = useDispatch();
  const { isOpen, fileName, fileData, loading, error } = useSelector(
    (state) => state.modal
  );

  const handleClose = () => dispatch(closeModal());

  const hasLines = fileData?.lines?.length > 0;

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
        {loading && <LoadingState />}

        {error && !loading && (
          <ErrorState error={error} onClose={handleClose} />
        )}

        {!loading && !error && fileData && (
          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              className="file-details-table"
            >
              <thead>
                <tr>
                  <th>Text</th>
                  <th>Number</th>
                  <th>Hex (32 chars)</th>
                </tr>
              </thead>
              <tbody>
                {hasLines ? (
                  fileData.lines.map((line, index) => (
                    <FileLineRow
                      key={index}
                      line={line}
                      index={index}
                    />
                  ))
                ) : (
                  <EmptyState lines={fileData.lines} />
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
