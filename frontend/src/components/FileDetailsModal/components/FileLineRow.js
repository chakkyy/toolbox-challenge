import React from 'react';
import TableCell from './TableCell';

const getFieldValidation = (line, field) => {
  if (!line.validation) {
    return { isInvalid: false, hasValidation: false };
  }

  return {
    isInvalid: !line.validation[`${field}Valid`],
    hasValidation: true,
  };
};

/**
 * Renders a table row for a single file line with validation
 * @param {Object} line - The line data with text, number, hex, and validation
 * @param {number} index - Row index for key generation
 */
const FileLineRow = ({ line, index }) => {
  const textValidation = getFieldValidation(line, 'text');
  const numberValidation = getFieldValidation(line, 'number');
  const hexValidation = getFieldValidation(line, 'hex');

  return (
    <tr key={`${line.text}-${line.number}-${index}`}>
      <TableCell
        value={line.text}
        isInvalid={textValidation.isInvalid}
      />
      <TableCell
        value={line.number}
        isInvalid={numberValidation.isInvalid}
        type="number"
      />
      <TableCell
        value={line.hex}
        isInvalid={hexValidation.isInvalid}
        type="hex"
      />
    </tr>
  );
};

export default FileLineRow;
