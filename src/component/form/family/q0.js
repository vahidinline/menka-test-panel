import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChildInformationFormZero } from '../../../data/questions.js';
import PersianDatePicker from '../../persianDatePicker.js';
import MRangeSlider from '../rangeSlider.js';
import Alert from 'react-bootstrap/Alert';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { FcNext, FcPrevious } from 'react-icons/fc';
const Q0 = (props) => {
  const { setQ0 } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [q0Answers, setQ0Answers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const formatPc = (p) => p + '%';
  const currentQuestion = ChildInformationFormZero[currentQuestionIndex];
  console.log(q0Answers);

  const handleChange = (e, index) => {
    const updatedFormData = { ...q0Answers };
    updatedFormData[index] = e.target.value;
    setQ0Answers(updatedFormData);
  };

  const handleDateChange = (date, index) => {
    console.log(date);
    const updatedFormData = { ...q0Answers };
    updatedFormData[index] = date;
    setQ0Answers(updatedFormData);
  };

  const handleNext = () => {
    //check if input has value
    //if not, return
    const currentAnswer = q0Answers[currentQuestionIndex];
    console.log(currentAnswer);
    if (currentAnswer) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setError(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = (e) => {
    setQ0(true);
    console.log('set Q1 to true');
    e.preventDefault();
    // Perform form submission or further processing here
    console.log('Form submitted:', q0Answers);
  };

  const checkCompletion = () => {
    const isCompleted =
      Object.keys(q0Answers).length === ChildInformationFormZero.length;
    setCompleted(isCompleted);
  };

  //set error to false when user starts typing
  const handleTyping = () => {
    setError(false);
  };

  //set error to false when user selects a date
  useEffect(() => {
    setError(false);
  }, [q0Answers]);

  return (
    <Container>
      <Row
        className="justify-content-md-center font-face-gm"
        style={{ marginTop: '2rem' }}>
        <Col xs lg="6">
          <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
            <Form.Label>{currentQuestion.question}</Form.Label>
            {currentQuestion.type === 'text' && (
              <Form.Control
                required
                type="text"
                value={q0Answers[currentQuestionIndex] || ''}
                onChange={(e) => handleChange(e, currentQuestionIndex)}
              />
            )}
            {currentQuestion.type === 'date' && (
              <PersianDatePicker
                required
                value={q0Answers[currentQuestionIndex] || ''}
                onChange={(date) => {
                  const updatedFormData = { ...q0Answers };
                  updatedFormData[currentQuestionIndex] = date;
                  setQ0Answers(updatedFormData);
                }}
                onBlur={() => {}}
              />
            )}
            {currentQuestion.type === 'range' && (
              <Form.Group as={Row}>
                <Col>
                  <div
                    className="slider custom-labels"
                    style={{
                      width: '100%',
                      height: '36px',
                      direction: 'ltr',
                    }}>
                    <Slider
                      style={{
                        width: '100%',
                        height: '36px',
                        background: 'transparent',
                        direction: 'rtl',
                      }}
                      min={0}
                      max={100}
                      step={25}
                      value={sliderValue}
                      labels={currentQuestion.options}
                      format={formatPc}
                      onChange={(value) => {
                        setSliderValue(value);
                        const updatedFormData = { ...q0Answers };
                        updatedFormData[currentQuestionIndex] = value;
                        setQ0Answers(updatedFormData);
                      }}
                    />
                  </div>
                </Col>
              </Form.Group>
            )}
            {currentQuestion.type === 'select' && (
              <Form.Control
                as="select"
                value={q0Answers[currentQuestionIndex] || ''}
                onChange={(e) => handleChange(e, currentQuestionIndex)}
                required>
                <option value="" disabled hidden>
                  انتخاب کنید
                </option>
                {currentQuestion.items.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Control>
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
                    checked={q0Answers[currentQuestionIndex] === option}
                    onChange={(e) => handleChange(e, currentQuestionIndex)}
                    required
                  />
                ))}
              </div>
            )}
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button
              onClick={handlePrevious}
              style={{ textDecoration: 'none' }}
              className="btn btn-light text-primary
               mt-3 mb-3"
              size="lg"
              disabled={currentQuestionIndex === 0}>
              <FcNext size={20} color="white" /> قبلی
            </Button>
            {error && (
              <Alert
                className="text-right font-face-gm text-right mt-3 mb-3"
                variant="danger">
                لطفا به سوال پاسخ دهید
              </Alert>
            )}
            {currentQuestionIndex < ChildInformationFormZero.length - 1 ? (
              <Button
                onClick={handleNext}
                style={{ textDecoration: 'none' }}
                className="btn btn-light text-primary
                mt-3 mb-3"
                size="lg"
                // disabled={!q1Answers[currentQuestionIndex]}
              >
                بعدی
                <FcPrevious size={20} color="white" />
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={handleSubmit}
                style={{ textDecoration: 'none' }}
                className="btn btn-primary mt-3 mb-3"
                size="lg"
                // disabled={!q1Answers[currentQuestionIndex]}
              >
                ثبت فرم و ادامه
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Q0;
