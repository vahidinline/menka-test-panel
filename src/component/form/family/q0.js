import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ChildInformationFormZero } from '../../../data/questions.js';
import PersianDatePicker from '../../persianDatePicker.js';
import MRangeSlider from '../rangeSlider.js';
import Alert from 'react-bootstrap/Alert';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { FcNext, FcPrevious } from 'react-icons/fc';
import './../radio.css';
import JalaliToGregorianConverter from '../../datePickerCustom.js';
const Q0 = (props) => {
  const { setQ0 } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [q0Answers, setQ0Answers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const formatPc = (p) => p + '%';
  const currentQuestion = ChildInformationFormZero[currentQuestionIndex];
  const navigate = useNavigate();
  const datePickerRef = useRef(null);
  const [convertedDate, setConvertedDate] = useState('');
  console.log(convertedDate);
  const handleDateConversion = (gregorianDate) => {
    setConvertedDate(gregorianDate);
  };
  const handleChange = (e, index, question) => {
    const updatedFormData = { ...q0Answers };
    console.log(updatedFormData);
    updatedFormData[index] = {
      question: question,
      answer: e.target.value,
    };
    setQ0Answers(updatedFormData);
  };

  //add convertedDate to q0Answers
  useEffect(() => {
    if (convertedDate) {
      const updatedFormData = { ...q0Answers };
      updatedFormData[currentQuestionIndex] = {
        question: currentQuestion.question,
        answer: convertedDate,
      };
      setQ0Answers(updatedFormData);
    }
  }, [convertedDate]);

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
    localStorage.setItem('q0', JSON.stringify(q0Answers));
    // Perform form submission or further processing here
    //navigate
    navigate('/register');
  };

  const checkCompletion = () => {
    const isCompleted =
      Object.keys(q0Answers).length === ChildInformationFormZero.length;
    setCompleted(isCompleted);
  };

  //set error to false when user selects a date
  useEffect(() => {
    setError(false);
  }, [q0Answers]);

  const handleKeyPress = (event) => {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === 'Enter') {
      // Perform the action you want when Enter is pressed (e.g., submit form)
      handleNext();
    }
    if (event.key === 'Backspace' || event.key === 'esc') {
      // Perform the action you want when Enter is pressed (e.g., submit form)
      handlePrevious();
    }
  };

  const handleDatePickerKeyDown = (event) => {
    const keyCode = event.keyCode || event.which;
    console.log(keyCode);
    // Check if the key pressed is Enter (key code 13)
    if (keyCode === 13) {
      datePickerRef.current.open();
      // Perform the action you want when Enter is pressed (e.g., save the selected date)
      handleNext();
      console.log('You pressed Enter!');
    }
  };

  return (
    <Container>
      <Row>
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
      </Row>
      <Row
        className="justify-content-md-center font-face-gm"
        style={{ marginTop: '5rem' }}>
        <Col xs lg="10">
          <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
            <div
              style={{
                direction: 'rtl',
                textAlign: 'right',
                fontSize: '1rem',
                marginBottom: '1rem',
              }}>
              {currentQuestion.question}
            </div>
            {currentQuestion.type === 'text' && (
              <Form.Control
                required
                type="text"
                onKeyPress={handleKeyPress}
                value={q0Answers[currentQuestionIndex]?.answer || ''}
                onChange={(e) =>
                  handleChange(
                    e,
                    currentQuestionIndex,
                    currentQuestion.question
                  )
                }
              />
            )}
            {currentQuestion.type === 'number' && (
              <Form.Control
                required
                onKeyPress={handleKeyPress}
                type="number"
                value={q0Answers[currentQuestionIndex]?.answer || ''}
                onChange={(e) =>
                  handleChange(
                    e,
                    currentQuestionIndex,
                    currentQuestion.question
                  )
                }
              />
            )}
            {currentQuestion.type === 'date' && (
              <JalaliToGregorianConverter
                onConversion={handleDateConversion}
                onKeyPress={handleNext}
              />

              // <>
              //   <PersianDatePicker
              //     onKeyPress={() => {
              //       console.log('keyDown');
              //     }}
              //     onClickOutside={() => {
              //       console.log('clicked outside');
              //     }}
              //     ref={datePickerRef}
              //     value={q0Answers[currentQuestionIndex]?.answer || ''}
              //     onChange={(date) => {
              //       const updatedFormData = { ...q0Answers };
              //       updatedFormData[currentQuestionIndex] = {
              //         question: currentQuestion.question,
              //         answer: date,
              //       };
              //       setQ0Answers(updatedFormData);
              //     }}
              //     onBlur={() => {}}
              //   />
              //   <button onKeyDown={console.log('keyDown')} />
              // </>
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
                      onKeyPress={handleKeyPress}
                      onChange={(value) => {
                        setSliderValue(value);
                        const updatedFormData = { ...q0Answers };
                        updatedFormData[currentQuestionIndex] = {
                          question: currentQuestion.question,
                          answer: value,
                        };
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
                value={q0Answers[currentQuestionIndex]?.answer || ''}
                onChange={(e) =>
                  handleChange(
                    e,
                    currentQuestionIndex,
                    currentQuestion.question
                  )
                }
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
              <>
                {currentQuestion.options.map((option, optionIndex) => (
                  <Form.Check
                    style={{
                      direction: 'rtl',
                      textAlign: 'right',
                      fontSize: '1.2rem',
                    }}
                    key={optionIndex}
                    type="radio"
                    id={`question${currentQuestionIndex + 1}-option${
                      optionIndex + 1
                    }`}
                    value={option}
                    label={option}
                    checked={q0Answers[currentQuestionIndex]?.answer === option}
                    onChange={(e) =>
                      handleChange(
                        e,
                        currentQuestionIndex,
                        currentQuestion.question
                      )
                    }
                    required
                  />
                ))}
              </>
            )}
          </Form.Group>

          {error && (
            <Alert
              className="text-right font-face-gm text-right mt-3 mb-3"
              variant="danger">
              لطفا به سوال پاسخ دهید
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Q0;
