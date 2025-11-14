import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FileFilter = ({ onFilter }) => {
  const [filterText, setFilterText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filterText);
  };

  const handleChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Row className="align-items-end">
        <Col xs={12} md={8} lg={6}>
          <Form.Group controlId="fileFilter">
            <Form.Label>Filter Files</Form.Label>
            <Form.Control
              type="text"
              placeholder="Filter by file name..."
              value={filterText}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md={4} lg={3} className="mt-2 mt-md-0">
          <Button variant="primary" type="submit" className="w-100">
            Filter
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FileFilter;
