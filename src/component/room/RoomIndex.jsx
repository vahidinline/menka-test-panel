import React, { useEffect, useState } from 'react';
import Question from '../question';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MenkaInput from '../form/input';
import { Container, Form } from 'react-bootstrap';
import axios from 'axios';

const labels = [
  { id: 0, label: 'بله' },
  { id: 1, label: 'خیر' },
  { id: 2, label: 'گاهی' },
];

const RoomIndex = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, room, ageGroup, done, userId } = location?.state;
  console.log('userId', userId);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  useEffect(() => {
    const filteredQuestions = questions?.filter(
      (question) => question.ageGroup === ageGroup.title
    );
    if (!filteredQuestions) return;
    setFilteredQuestions(filteredQuestions);
  }, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(filteredQuestions?.length).fill('')
  );
  console.log('selectedAnswers', selectedAnswers);
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
  const handleChange = (event, index, question) => {
    const { value } = event.target;

    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = { question, a: value };
      return newAnswers;
    });
    setSelectedAnswers((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = { question, a: value };
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
    localStorage.setItem(`${room}-answers`, JSON.stringify(selectedAnswers));
    handleSubmitCloud();
    // Perform any final actions before closing the room

    // Clear the saved data when all questions are answered
    // localStorage.removeItem(`${room}-answers`);
    // localStorage.removeItem(`${room}-timestamp`);
  };

  const handleSubmitCloud = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}/answers/add`,
        {
          userId: userId,
          qa: selectedAnswers,
          room: room,
          ageGroup: ageGroup.title,
        }
      );
      navigate('/hallway');
    } catch (error) {
      alert('خطایی رخ داده است');
    }
  };
  const handleNext = () => {
    handleNextStep();
    //check if input has valu
    //if not, return
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleKeyPress = (event) => {
    // Check if the key pressed is Enter (key code 13)
    if (event.key === 'Enter') {
      // Perform the action you want when Enter is pressed (e.g., submit form)
      console.log('enter');
      handleNext();
    }
    if (event.key === 'Backspace' || event.key === 'esc') {
      // Perform the action you want when Enter is pressed (e.g., submit form)
      handlePrevious();
    }
  };

  return (
    <Container
      fluid
      style={{
        background: '#FEF4EC',
        height: '100vh',
      }}>
      {/* Your video and text descriptions for the room can be added here */}
      {/* سن کودک : {ageGroup.title} */}
      {filteredQuestions.length > 0 && (
        <div>
          <Question
            question={filteredQuestions[currentStep]}
            ageGroup={ageGroup}
          />
          {labels.map((item, index) => {
            return (
              <Container className="font-face-gm d-flex mt-4" key={item.id}>
                <Form.Group required className="mb-3">
                  <Form.Check
                    onKeyDown={handleKeyPress}
                    type="radio"
                    required
                    name={`answer_${currentStep}`} // Use a unique name for each question
                    label={item.label}
                    value={index.toString()} // Use the index as the value
                    checked={selectedAnswers[currentStep] === index.toString()}
                    onChange={(e) =>
                      handleChange(
                        e,
                        currentStep,
                        filteredQuestions[currentStep]._id
                      )
                    } // Pass the current step's index
                  />
                </Form.Group>
              </Container>
            );
          })}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {/* <button
          className="btn btn-primary"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prevStep) => prevStep - 1)}>
          قبلی
        </button> */}

        {currentStep < filteredQuestions.length - 1 ? null : (
          // <button className="btn btn-primary" onClick={handleNextStep}>
          //   بعدی
          // </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            ثبت
          </button>
        )}
      </div>
      <ProgressBar
        className="mx-4 my-5"
        animated
        now={(currentStep / filteredQuestions.length) * 100}
      />
    </Container>
  );
};

export default RoomIndex;
