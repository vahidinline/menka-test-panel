import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChildInformationFormOne } from '../../data/questions.js';
import Q3 from './family/q3.js';
import Q1 from './family/q1.js';
import Q2 from './family/q2.js';

const ChildInformationForm = () => {
  const [formData, setFormData] = useState({});

  const [showQuestion5, setShowQuestion5] = useState(false);

  const handleChange = (e, index) => {
    const updatedFormData = { ...formData };
    updatedFormData[index] = e.target.value;
    setFormData(updatedFormData);

    if (index === 8 && parseInt(e.target.value) > 1) {
      setShowQuestion5(true);
    } else if (index === 8) {
      setShowQuestion5(false);
      // Clear the answer to question 5 when it is hidden
      setFormData({ ...formData, 9: '' });
    }
  };

  const handleDateChange = (date, index) => {
    const updatedFormData = { ...formData };
    updatedFormData[index] = date;
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or further processing here
    console.log('Form submitted:', formData);
  };

  return (
    <Container>
      <Row
        className="justify-content-md-center font-face-gm"
        style={{ marginTop: '2rem' }}>
        <Col xs lg="6">
          <Q1 />
          <Q2 />
          <Q3 />
        </Col>
      </Row>
    </Container>
  );
};

export default ChildInformationForm;
