import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChildInformationFormOne } from '../../data/questions.js';
import Q3 from './family/q3.js';
import Q1 from './family/q1.js';
import Q2 from './family/q2.js';
import Q0 from './family/q0.js';

const ChildInformationForm = () => {
  const [q0,setQ0] = useState(false)
  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);

  useEffect(() => {
    console.log(q1, q2, q3);
  }, [q1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or further processing here
    console.log('Form submitted:');
  };

  return (
    <Container>
      <Row
        className="justify-content-md-center font-face-gm"
        style={{ marginTop: '2rem' }}>
        <Col xs lg="10">
          <Q0 setQ0={setQ0}/>
          {/* {!q1 && !q2 && !q3 && <Q1 setQ1={setQ1} />}
          {q1 && !q2 && !q3 && <Q2 setQ2={setQ2} />}
          {q1 && q2 && !q3 && <Q3 setQ3={setQ3} />} */}
        </Col>
      </Row>
    </Container>
  );
};

export default ChildInformationForm;
