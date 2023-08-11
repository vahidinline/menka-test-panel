import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';

function Verif(props) {
  const { phoneNumber } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [token, setToken] = useState(null);
  const { decodedToken, isExpired } = useJwt(token);

  console.log(decodedToken);
  const [code, setCode] = useState('');
  useEffect(() => {
    if (code.length === 4) {
      setIsSubmitted(true);
    }
  }, [code]);

  const navigate = useNavigate();
  const handleSubmitData = async () => {
    setIsSubmitted(true);
    setIsLoading(true);
    const result = await axios
      .post(`${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}/api/verify/`, {
        phoneNumber: phoneNumber,
        verificationCode: code,
      })

      .then((response) => {
        try {
          console.log(response.data.data.token);
          setToken(response.data.data.token);
          localStorage.setItem('token', response.data.data.token);
          navigate('/form');
        } catch (error) {
          alert('خطایی رخ داده است');
        }
      })
      .catch((error) => {
        alert('Error during verification');
      });
  };

  return (
    <Container fluid="md">
      <Row className="justify-content-md-center mt-5 font-face-gm">
        <Col lg="4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitData();
            }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h4 className="text-center font-bold">
                کد ۴ رقمی دریافت شده را وارد کنید
              </h4>
              <Form.Control
                onChange={(e) => setCode(e.target.value)}
                type="number"
                placeholder="کد ۴ رقمی"
              />
              <Countdown date={Date.now() + 60000} />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Code</Form.Label>
            <Form.Control type="text" placeholder="Code" />
          </Form.Group> */}

            {isSubmitted && (
              <Button
                //disabled={isLoading}
                variant="primary"
                style={{
                  backgroundColor: '#000',
                  border: 'none',
                  width: '100%',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
                type="submit">
                {isLoading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                ورود{' '}
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Verif;
