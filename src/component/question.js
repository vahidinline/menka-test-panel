import { Card, Container } from 'react-bootstrap';
import MenkaInput from './form/input';

const Question = (props) => {
  const { question } = props;
  console.log('question', question);
  return (
    <Container className="font-face-gm">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{question.roomType}</Card.Title>
          <Card.Text>{question.questions.question}</Card.Text>

          <MenkaInput type={'radio'} />
          <MenkaInput type={'radio'} />
          <MenkaInput type={'radio'} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Question;
