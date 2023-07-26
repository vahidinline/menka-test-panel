import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChildInformationFormOne } from '../../data/questions.js';
import Q3 from './family/q3.js';
import Q1 from './family/q1.js';
import Q2 from './family/q2.js';
import Q0 from './family/q0.js';

const ChildInformationForm = () => {
  const [q0, setQ0] = useState(false);
  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or further processing here
    console.log('Form submitted:');
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: '#FEF4EC',
        height: '100vh',
      }}>
      <Row
        className="justify-content-md-center font-face-gm "
        style={{ flexDirection: 'row' }}>
        <Col lg="12" sm="12" md="12" xs={{ order: 1 }} className="d-flex">
          <Q0 setQ0={setQ0} />
        </Col>
      </Row>
    </Container>
  );
};

export default ChildInformationForm;
