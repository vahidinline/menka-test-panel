import React from 'react';
import { Container, Form } from 'react-bootstrap';

const MenkaInput = ({ type, name, label, error, ...rest }) => {
  return (
    <Container className="d-flex mt-4">
      <Form.Group className="mb-3">
        <Form.Check type={type} name={name} label={label} />
      </Form.Group>
    </Container>
  );
};

export default MenkaInput;
