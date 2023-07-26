import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ChildInformationForm } from '../../../data/questions.js';
import PersianDatePicker from '../../persianDatePicker.js';
import MRangeSlider from '../rangeSlider.js';
import Alert from 'react-bootstrap/Alert';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { FcNext, FcPrevious, FcAdvance } from 'react-icons/fc';
import { MdArrowForward } from 'react-icons/md';
import { IoMdArrowBack } from 'react-icons/io';

import './../radio.css';
import JalaliToGregorianConverter from '../../datePickerCustom.js';
import ProgressBar from '../../Progressbar.js';
import WeightInput from '../../WeightInput';

const Q0 = (props) => {
  const { setQ0 } = props;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [q0Answers, setQ0Answers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [weight, setWeight] = useState({ kilos: 0, grams: 0 });
  const formatPc = (p) => p + '%';
  const currentQuestion = ChildInformationForm[currentQuestionIndex];
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
      Object.keys(q0Answers).length === ChildInformationForm.length;
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
    <Container fluid>
      <Row className="d-flex justify-content-between">
        <Col className="d-flex justify-content-start align-self-start">
          {' '}
          <Button
            onClick={handlePrevious}
            style={{ textDecoration: 'none' }}
            className="text-dark"
            size="lg"
            variant="link"
            disabled={currentQuestionIndex === 0}>
            <MdArrowForward />
            قبلی
          </Button>
        </Col>

        <Col className="d-flex justify-content-end">
          {currentQuestionIndex < ChildInformationForm.length - 1 ? (
            <Button
              onClick={handleNext}
              style={{ textDecoration: 'none' }}
              className="text-dark"
              size="lg"
              variant="link"
              // disabled={!q1Answers[currentQuestionIndex]}
            >
              بعدی
              <IoMdArrowBack />
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              style={{ textDecoration: 'none' }}
              className="text-dark"
              size="lg"
              // disabled={!q1Answers[currentQuestionIndex]}
            >
              ثبت فرم و ادامه
            </Button>
          )}
        </Col>
      </Row>
      <Row
        className="justify-content-md-center font-face-gm"
        style={{ marginTop: '5rem' }}>
        <Col xs lg="10">
          <Form.Group controlId={`question${currentQuestionIndex + 1}`}>
            <div
              className="font-bold"
              style={{
                direction: 'rtl',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}>
              {currentQuestion.question}
            </div>
            {currentQuestion.type === 'text' && (
              <Form.Control
                style={{
                  border: '2px solid #000',
                  padding: '1.5rem',
                  boxShadow: 'none',
                  fontSize: '2rem',
                }}
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
                // Add the following CSS for hover effect
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #f00 with the desired hover border color
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #000 with the original border color
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #00f with the desired focus border color
                  e.target.style.boxShadow = 'gray'; // Add a custom focus box shadow or set 'none' to remove it
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #000 with the original border color
                  e.target.style.boxShadow = 'none'; // Add this line to remove the box shadow on blur
                }}
              />
            )}
            {currentQuestion.type === 'number' && (
              <Form.Control
                style={{
                  direction: 'rtl',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  height: '5rem',

                  fontSize: '2rem',
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #f00 with the desired hover border color
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #000 with the original border color
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #00f with the desired focus border color
                  e.target.style.boxShadow = 'gray'; // Add a custom focus box shadow or set 'none' to remove it
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #000 with the original border color
                  e.target.style.boxShadow = 'none'; // Add this line to remove the box shadow on blur
                }}
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
                type={currentQuestion.id}
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
                style={{
                  direction: 'rtl',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  height: '5rem',
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #f00 with the desired hover border color
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #000 with the original border color
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #00f with the desired focus border color
                  e.target.style.boxShadow = 'gray'; // Add a custom focus box shadow or set 'none' to remove it
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#000'; // Replace #000 with the original border color
                  e.target.style.boxShadow = 'none'; // Add this line to remove the box shadow on blur
                }}
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
            {currentQuestion.type === 'weight' && (
              <WeightInput
                onChange={(value) => {
                  setWeight(value);
                  const updatedFormData = { ...q0Answers };
                  updatedFormData[currentQuestionIndex] = {
                    question: currentQuestion.question,
                    answer: value,
                  };
                  setQ0Answers(updatedFormData);
                }}
              />
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

      {/* <ProgressBar totalSteps={ChildInformationForm.length}  /> */}
    </Container>
  );
};

export default Q0;
