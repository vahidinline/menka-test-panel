//component should provide a list of questions regarding the room name.
//user has 3 days to answer the questions.
//should get data of questions from the server, call the Menka input component for each question.
//should has video and text to describe the room.
//if user answered all the questions, the room will be closed
//room must be locked based on the parent condition
import { useEffect, useState } from 'react';
import Question from '../question';
import { useLocation } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MenkaInput from '../form/input';
import { Container, Form } from 'react-bootstrap';
import RoomNameFrame from './frame';

const lable = [
  { id: 1, lable: 'بله' },
  { id: 2, lable: 'خیر' },
  { id: 3, lable: 'گاهی' },
];

const RoomIndex = (props) => {
  const location = useLocation();
  const { questions, room } = location.state;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(); // Form data state
  const [savedData, setSavedData] = useState(null); // Saved form data state

  // Load saved data from storage on component mount
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem(`${room}-answers`));
    const savedTimestamp = localStorage.getItem('timestamp');
    const threeDays = 3 * 24 * 60 * 60 * 1000; // Three days in milliseconds

    if (
      savedFormData &&
      savedTimestamp &&
      Date.now() - savedTimestamp < threeDays
    ) {
      setSavedData(savedFormData);
    }
  }, []);

  // Update form data
  const handleChange = (event) => {
    console.log(event.target.value);
    setAnswers(event.target.value);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://www.transparenttextures.com/patterns/brick-wall.png")`,
      }}
      className='mt-5
      font-face-gm
      mx-auto
      text-justify
      w-50
      bg-white
      p-5
      rounded-3
      shadow-lg
      border border-2 border-secondary
      
      '>
      {/* <RoomNameFrame roomName={room} /> */}
      {questions.length > 0 && (
        <div >
          <Question question={questions[currentStep]} />
          {lable.map((item, index) => {
            return (
              <Container className="d-flex mt-4">
                <Form.Group required onChange={handleChange} className="mb-3">
                  <Form.Check
                    type="radio"
                    name="answer"
                    label={item.lable}
                    
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
          <button className="btn btn-primary" disabled>
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
