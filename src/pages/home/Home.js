import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import CarouselHome from './carousel';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import MenkaInput from '../../component/form/input';
import QuestionsContext from '../../context/questions';
function Home() {
  const { questions, setQuestions } = useContext(QuestionsContext);
  const navigate = useNavigate();

  const getQuestions = async () => {
    try {
      const response = await fetch(
        'https://menkabackend.herokuapp.com/question/getall'
      );
      const data = await response.json();
      setQuestions(data);
      localStorage.setItem('questions', JSON.stringify(data));
      if (data && data.length > 0) {
        setTimeout(() => {
          navigate('/form');
        }, 2000);
      } else {
        // Handle the case when data is not available
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  return (
    <Container>
      <Row
        className="font-face-gm"
        style={{
          marginTop: '30px',
          border: '1px solid #ddd',
          borderRadius: 40,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginLeft: 0,
        }}>
        <Col>
          <Card style={{ margin: '30px' }}>
            <Card.Body>
              <Card.Title> به منکا خوش امدید</Card.Title>
              <Card.Text>
                منکا معتقد است، هر کودک مانند بوم نقاشی سفیدی است که بخش مهمی از
                این بوم به دست والدین نقاشی خواهد شد.{' '}
              </Card.Text>
              <Button
                //disabled={data === 3 ? false : true}
                onClick={() => {
                  getQuestions();
                }}
                variant="primary"
                style={{
                  marginTop: '20px',
                  borderRadius: '20px',

                  width: '100%',
                  marginBottom: '20px',
                }}>
                تست ASQ{' '}
              </Button>
              <ProgressBar striped variant="success" />
            </Card.Body>
          </Card>
        </Col>
        <Col>{/* <CarouselHome /> */}</Col>
      </Row>
    </Container>
  );
}

export default Home;
