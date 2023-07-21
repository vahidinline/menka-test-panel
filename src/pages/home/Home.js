import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  ProgressBar,
  Row,
  Col,
} from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import QuestionsContext from '../../context/questions';

function Home() {
  const { questions, setQuestions } = useContext(QuestionsContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(false);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        'https://menkabackend.herokuapp.com/question/getall'
      );
      const data = await response.json();
      setQuestions(data);
      setData(true);
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

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 20);
      }, 400);

      return () => {
        clearInterval(interval);
      };
    }
  }, [data]);

  return (
    <Container>
      <Row
        className="font-face-gm"
        style={{
          marginTop: '30px',
          // border: '1px solid #ddd',
          // borderRadius: 40,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginLeft: 0,
        }}>
        <Col>
          <Card style={{ margin: '30px', border: 'none' }}>
            <Card.Body>
              <Card.Title>به منکا خوش امدید</Card.Title>
              <Card.Text>
                منکا معتقد است، هر کودک مانند بوم نقاشی سفیدی است که بخش مهمی از
                این بوم به دست والدین نقاشی خواهد شد.
              </Card.Text>
              <Button
                onClick={() => {
                  getQuestions();
                }}
                variant="primary"
                style={{
                  marginTop: '20px',
                  // borderRadius: '20px',
                  width: '100%',
                  marginBottom: '20px',
                }}
                disabled={data}>
                تست ASQ
              </Button>
              {progress !== 0 && (
                <ProgressBar striped variant="success" now={progress} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
