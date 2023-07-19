import React, { useEffect, useState } from 'react';
import Question from '../question';
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MenkaInput from '../form/input';
import { Container, Form } from 'react-bootstrap';
import RoomNameFrame from './frame';

const labels = [
  { id: 0, label: 'بله' },
  { id: 1, label: 'خیر' },
  { id: 2, label: 'گاهی' },
];

const RoomIndex = () => {
  const location = useLocation();
  const { questions, room } = location.state;
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill('')
  );
  const [savedData, setSavedData] = useState(null); // Saved form data state

  // Load saved data from storage on component mount
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem(`${room}-answers`));
    const savedTimestamp = localStorage.getItem(`${room}-timestamp`);
    const threeDays = 3 * 24 * 60 * 60 * 1000; // Three days in milliseconds

    if (
      savedFormData &&
      savedTimestamp &&
      Date.now() - savedTimestamp < threeDays
    ) {
      setSavedData(savedFormData);
      setSelectedAnswers(savedFormData.answers);
      setCurrentStep(savedFormData.currentStep);
    }
  }, []);

  // Update form data and selected answer
  const handleChange = (event, index) => {
    const { value } = event.target;
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = value;
      return newAnswers;
    });
    setSelectedAnswers((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = value;
      return newSelected;
    });
  };

  // Save form data to local storage
  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
    const formData = {
      answers: selectedAnswers,
      currentStep: currentStep + 1,
    };
    localStorage.setItem(`${room}-answers`, JSON.stringify(formData));
    localStorage.setItem(`${room}-timestamp`, Date.now());
  };

  // Room submission handler
  const handleSubmit = () => {
    // Perform any final actions before closing the room

    // Clear the saved data when all questions are answered
    localStorage.removeItem(`${room}-answers`);
    localStorage.removeItem(`${room}-timestamp`);
  };

  return (
    <div className="mt-5 font-face-gm mx-auto text-justify w-50 bg-white p-5 rounded-3 shadow-lg border border-2 border-secondary">
      {/* Your video and text descriptions for the room can be added here */}

      {questions.length > 0 && (
        <div>
          <Question question={questions[currentStep]} />
          {labels.map((item, index) => {
            return (
              <Container className="d-flex mt-4" key={item.id}>
                <Form.Group required className="mb-3">
                  <Form.Check
                    type="radio"
                    name={`answer_${currentStep}`} // Use a unique name for each question
                    label={item.label}
                    value={index.toString()} // Use the index as the value
                    checked={selectedAnswers[currentStep] === index.toString()}
                    onChange={(e) => handleChange(e, currentStep)} // Pass the current step's index
                  />
                </Form.Group>
              </Container>
            );
          })}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button
          className="btn btn-primary"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
          قبلی
        </button>

        {currentStep < questions.length - 1 ? (
          <button className="btn btn-primary" onClick={handleNextStep}>
            بعدی
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit}>
            ثبت
          </button>
        )}
      </div>

      <ProgressBar
        className="mx-4 my-5"
        animated
        now={(currentStep / questions.length) * 100}
      />
    </div>
  );
};

export default RoomIndex;
