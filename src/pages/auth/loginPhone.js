import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';

function LoginFormPhone() {
  const [phoneNumber, setPhoneNumber] = useState();
  console.log(phoneNumber);
  const appVerifier = window.recaptchaVerifier;
  console.log(appVerifier);

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log('sms sent');
      window.confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
    });
  return (
    <Container fluid="md">
      <Row className="justify-content-md-center mt-5 font-face-gm">
        <Col lg="4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = '/hallway';
            }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>لطفا شماره موبایل خود را وارد کنید</Form.Label>
              <Form.Control
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="phone"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Code</Form.Label>
              <Form.Control type="text" placeholder="Code" />
            </Form.Group> */}

            <Button variant="primary" type="submit">
              دریافت کد
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginFormPhone;
