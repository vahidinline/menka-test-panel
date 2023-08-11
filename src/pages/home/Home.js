import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Image,
  ProgressBar,
  Placeholder,
} from 'react-bootstrap';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import QuestionsContext from '../../context/questions';

function Home() {
  const { questions, setQuestions } = useContext(QuestionsContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(false);

  const getQuestions = async () => {
    localStorage.clear();
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
          navigate('/register');
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
    <Container
      fluid
      style={{
        background: '#FEF4EC',
        height: '100vh',
      }}>
      <Row
        className="font-face-gm"
        style={{
          // border: '1px solid #ddd',
          // borderRadius: 40,

          overflow: 'hidden',
          marginLeft: 0,
        }}>
        <Col xs={12} sm={12} md={6}>
          <Card
            style={{
              marginTop: '230px',
              border: 'none',
              background: '#FEF4EC',
            }}>
            <Card.Body>
              <h1 className="font-bold text-center">به منکا خوش امدید</h1>
              <p className="text-center">
                در این قسمت متن دلخواه شما نوشته خواهد شد.
              </p>
              <Button
                onClick={() => {
                  getQuestions();
                }}
                variant="dark"
                style={{
                  marginTop: '100px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  textAlign: 'center',
                  margin: 'auto',
                  backgroundColor: '#2d3e50',
                  borderRadius: '40px',
                  width: '40%',
                  height: '50px',
                  marginBottom: '20px',
                }}
                disabled={data}>
                شروع تست
              </Button>
              <p className="text-center mt-5">تست تایید شده توسط ...</p>
              {progress !== 0 && (
                <ProgressBar
                  now={progress}
                  label={`${progress}%`}
                  style={{
                    width: '40%',
                    margin: 'auto',
                    marginTop: '20px',
                    marginBottom: '20px',
                  }}
                />
                // <ProgressBar
                //   now={progress}
                //   label={`${progress}%`}
                //   style={{
                //     width: '40%',
                //     margin: 'auto',
                //     marginTop: '20px',
                //     marginBottom: '20px',
                //   }}
                // />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Placeholder animation="glow" />
          <Placeholder xs={12} bg="primary" animation="glow" />
          {/* <Image
            src="https://images.everydayhealth.com/images/lung-respiratory/ear-nose-throat/pg-odd-nose-facts-01-full.jpg?w=768"
            style={{ width: '100%', height: '100%' }}
          /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
