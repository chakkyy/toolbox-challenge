import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  ListGroup,
  Badge,
  Spinner,
} from 'react-bootstrap';
import { openModal, fetchFileForModal } from '../../redux/slices/modalSlice';
import './FileList.css';

const FileList = () => {
  const dispatch = useDispatch();
  const { files, loading, error } = useSelector(
    (state) => state.fileList
  );

  const handleFileClick = (fileName) => {
    dispatch(openModal(fileName));
    dispatch(fetchFileForModal(fileName));
  };

  const handleFileKeyDown = (event, fileName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFileClick(fileName);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-2">
          <Spinner animation="border" size="sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }

    if (error) {
      return (
        <p className="text-muted text-center mb-0 py-2 small">
          No data available
        </p>
      );
    }

    if (files.length === 0) {
      return (
        <p className="text-muted text-center mb-0 py-2 small">
          No files available
        </p>
      );
    }

    return (
      <ListGroup variant="flush" className="file-list-group">
        {files.map((fileName, index) => (
          <ListGroup.Item
            key={`${fileName}-${index}`}
            action
            className="file-list-item py-2 px-3"
            onClick={() => handleFileClick(fileName)}
            onKeyDown={(e) => handleFileKeyDown(e, fileName)}
            tabIndex="0"
            role="button"
            aria-label={`View details for ${fileName}`}
          >
            <small className="file-name">{fileName}</small>
            <span className="view-icon">👁️</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <Card className="file-list-card mb-4">
      <Card.Header className="d-flex justify-content-between align-items-center py-2">
        <small className="fw-bold">All Available Files</small>
        {!loading && files.length > 0 && (
          <Badge bg="primary" pill>
            {files.length}
          </Badge>
        )}
      </Card.Header>
      <Card.Body className="p-0">{renderContent()}</Card.Body>
    </Card>
  );
};

export default FileList;
