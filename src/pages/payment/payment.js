import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Payment() {
  const location = useLocation();
  const [data, setData] = useState(1);

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
              <Card.Title> </Card.Title>
              <Card.Text>سند باکس پرداخت </Card.Text>
              <Link
                to={{
                  pathname: '/home',
                }}
                state={3}
                variant="primary"
                className="btn btn-success">
                پرداخت موفق و برگشت به سایت
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
