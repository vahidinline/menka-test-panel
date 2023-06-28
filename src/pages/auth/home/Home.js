import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import CarouselHome from './carousel';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const location = useLocation();
  const [data, setData] = useState(1);
  console.log(data);
  useEffect(() => {
    if (location?.state) setData(location.state);
  }, [location]);

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
                disabled={data === 3 ? false : true}
                variant="primary"
                style={{
                  marginTop: '20px',
                  borderRadius: '20px',

                  width: '100%',
                  marginBottom: '20px',
                }}>
                تست ASQ{' '}
              </Button>
              <ProgressBar
                striped
                variant="success"
                now={data === 1 ? 25 : data === 2 ? 50 : data === 3 ? 100 : 0}
              />
            </Card.Body>
          </Card>
          {data === 1 && (
            <Card style={{ margin: '30px' }}>
              <Card.Body>
                <Card.Title> </Card.Title>
                <Card.Text>لطفا فرم بستر کودک را تکمیل کنید. </Card.Text>
                <Button
                  onClick={() => {
                    window.location.href = '/form';
                  }}
                  variant="primary"
                  style={{
                    marginTop: '20px',
                    borderRadius: '20px',

                    width: '100%',
                    marginBottom: '20px',
                  }}>
                  از اینجا شروع کنیم{' '}
                </Button>
              </Card.Body>
            </Card>
          )}
          {data === 2 && (
            <Card style={{ margin: '30px' }}>
              <Card.Body>
                <Card.Title>پرداخت هزینه </Card.Title>

                <Button
                  onClick={() => {
                    window.location.href = '/payment';
                  }}
                  variant="primary"
                  style={{
                    marginTop: '20px',
                    borderRadius: '20px',

                    width: '100%',
                    marginBottom: '20px',
                  }}>
                  پرداخت
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col>
          <CarouselHome />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
