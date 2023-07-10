import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { ChildInformationFormThree } from '../../../data/questions.js';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

const Q3 = () => {
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
        <Col xs lg="7">
          <Form onSubmit={handleSubmit}>
            <h3> چند تربیته بودن</h3>
            {ChildInformationFormThree.map((question, index) => (
              <Form.Group key={index} controlId={`question${index + 1}`}>
                <Form.Label>{question.question}</Form.Label>
                {question.type === 'text' && (
                  <Form.Control
                    type="text"
                    value={formData[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                  />
                )}
                {question.type === 'number' && (
                  <RangeSlider
                    tooltip="off"
                    //  onChange={changeEvent => setValue(changeEvent.target.value)}
                  />
                )}
                {question.type === 'radio' && (
                  <div>
                    {question.options.map((option, optionIndex) => (
                      <Form.Check
                        key={optionIndex}
                        type="radio"
                        id={`question${index + 1}-option${optionIndex + 1}`}
                        label={option}
                        value={option}
                        checked={formData[index] === option}
                        onChange={(e) => handleChange(e, index)}
                      />
                    ))}
                  </div>
                )}
                {showQuestion5 && (
                  <Form.Group controlId="question9">
                    <Form.Label>
                      فاصله ی سنی فرزندان از یک دیگر چقدر است؟
                    </Form.Label>
                    {formData[8] > 1 &&
                      Array.from({ length: formData[8] - 1 }).map((_, i) => (
                        <Form.Control
                          key={i}
                          type="text"
                          value={formData[9 + i] || ''}
                          onChange={(e) => handleChange(e, 9 + i)}
                        />
                      ))}
                  </Form.Group>
                )}
              </Form.Group>
            ))}
            <Link
              to={{
                pathname: '/home',
              }}
              state={2}
              style={{ textDecoration: 'none' }}
              className="btn btn-primary mt-3 mb-3"
              size="lg"
              type="submit">
              ثبت فرم و ادامه
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Q3;
