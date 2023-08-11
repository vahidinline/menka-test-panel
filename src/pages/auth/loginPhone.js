import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Verif from './verif';

function LoginFormPhone() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSent, setPhoneSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}/api/login/`,
        {
          phoneNumber: phoneNumber,
        }
      );
      setPhoneSent(true);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{ height: '100vh' }}>
      {phoneSent ? (
        <Row>
          <Verif phoneNumber={phoneNumber} />
        </Row>
      ) : (
        <Row className="justify-content-md-center mt-5 font-face-gm">
          <Col lg="4">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitData();
                // navigate('/hallway');
              }}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <h4 className="text-center font-bold">
                  لطفا شماره موبایل خود را وارد کنید
                </h4>
                <Form.Control
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type="phone"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
              </Form.Group>

              <Button
                variant="primary"
                disabled={isLoading}
                style={{
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
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </>
                )}
                ثبت نام
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default LoginFormPhone;
