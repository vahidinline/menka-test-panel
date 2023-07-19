import { Card, Container } from 'react-bootstrap';
import MenkaInput from './form/input';
import { useEffect, useState } from 'react';

const Question = (props) => {
  const { question } = props;
  const qId = question._id;
  const [answers, setAnswers] = useState({}); // Form data state
  const [savedData, setSavedData] = useState(null); // Saved form data state

  // Load saved data from storage on component mount
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem(`${qId}-answers`));
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
  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  return (
    <Container className="font-face-gm">
      <Card style={{ width: '100%', height: 'rem' }}>
        <Card.Body>
          <Card.Title>{question.roomType}</Card.Title>
          <Card.Title>{question.ageGroup}</Card.Title>
          <div
            dangerouslySetInnerHTML={{
              __html: question.questions.question,
            }}
          />
          {/* <Card.Text>{question.questions.question}</Card.Text> */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Question;
