import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { ChildInformationFormTwo } from '../../../data/questions.js';
import MRangeSlider from '../rangeSlider.js';
const Q2 = (props) => {
  const { setQ2 } = props;
  const [q2Answers, setQ2Answers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const currentQuestion = ChildInformationFormTwo[currentQuestionIndex];

  const handleChange = (e, index) => {
    const updatedFormData = { ...q2Answers };
    updatedFormData[index] = e.target.value;
    setQ2Answers(updatedFormData);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = (e) => {
    setQ2(true);
    e.preventDefault();
    // Perform form submission or further processing here
    console.log('Form submitted:', q2Answers);
  };

  return (
    <Container>
      <Row
        className="justify-content-md-center font-face-gm"
        style={{ marginTop: '2rem' }}>
        <Col xs lg="6">
          <h3>کیفیت و کمیت رابطه ی والد با کودک</h3>

          <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
            <Form.Label>{currentQuestion.question}</Form.Label>
            {currentQuestion.type === 'text' && (
              <Form.Control
                type="text"
                value={q2Answers[currentQuestionIndex] || ''}
                onChange={(e) => handleChange(e, currentQuestionIndex)}
              />
            )}

            {currentQuestion.type === 'radio' && (
              <div>
                {currentQuestion.options.map((option, optionIndex) => (
                  <Form.Check
                    key={optionIndex}
                    type="radio"
                    id={`question${currentQuestionIndex + 1}-option${
                      optionIndex + 1
                    }`}
                    label={option}
                    value={option}
                    checked={q2Answers[currentQuestionIndex] === option}
                    onChange={(e) => handleChange(e, currentQuestionIndex)}
                  />
                ))}
              </div>
            )}
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button
              onClick={handlePrevious}
              style={{ textDecoration: 'none' }}
              className="btn btn-primary mt-3 mb-3"
              size="lg"
              disabled={currentQuestionIndex === 0}>
              قبلی
            </Button>
            {currentQuestionIndex < ChildInformationFormTwo.length - 1 ? (
              <Button
                onClick={handleNext}
                style={{ textDecoration: 'none' }}
                className="btn btn-primary mt-3 mb-3"
                size="lg"
                //disabled={!q1Answers[currentQuestionIndex]}>
              >
                {' '}
                بعدی
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                style={{ textDecoration: 'none' }}
                className="btn btn-primary mt-3 mb-3"
                size="lg"
                //disabled={!q2Answers[currentQuestionIndex]}>
              >
                {' '}
                ثبت فرم و ادامه
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Q2;
