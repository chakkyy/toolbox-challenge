import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { clearError } from '../../redux/actions';

const ErrorAlert = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  if (!error) {
    return null;
  }

  const handleDismiss = () => {
    dispatch(clearError());
  };

  return (
    <Alert variant="danger" dismissible onClose={handleDismiss} className="mb-3">
      <Alert.Heading>Error</Alert.Heading>
      <p>{error}</p>
    </Alert>
  );
};

export default ErrorAlert;
