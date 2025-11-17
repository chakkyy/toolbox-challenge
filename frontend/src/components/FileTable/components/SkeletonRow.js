import React from 'react';
import { Placeholder } from 'react-bootstrap';

const SkeletonRow = () => {
  return (
    <tr>
      <td>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
      </td>
      <td>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </td>
      <td>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
      </td>
      <td>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={10} />
        </Placeholder>
      </td>
    </tr>
  );
};

export default SkeletonRow;
