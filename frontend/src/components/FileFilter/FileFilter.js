import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { setFilter } from '../../redux/slices/filesSlice';

const FileFilter = () => {
  const dispatch = useDispatch();
  const filterText = useSelector((state) => state.files.filter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className="mb-3">
      <Row>
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
      </Row>
    </div>
  );
};

export default FileFilter;
