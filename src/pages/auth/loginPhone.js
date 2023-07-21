import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import calculateAgeInYearsMonthsDays from '../../component/ageDetector';
import AgeGroups from '../../data/ageGroup';
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
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState(0);
  const appVerifier = window.recaptchaVerifier;

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
  const handleSubmitData = async () => {
    try {
      const familyBaseQuestions = localStorage.getItem('q0');
      const familyBaseQuestionsParsed = JSON.parse(familyBaseQuestions);
      const age = calculateAgeInYearsMonthsDays(familyBaseQuestionsParsed);
      console.log(age);
      setAge(age);
      const matchingAgeGroup = getAgeGroupByAge(age);
      console.log(matchingAgeGroup);
      // Modify the familyBaseQuestionsParsed object to include phoneNumber
      if (familyBaseQuestionsParsed) {
        familyBaseQuestionsParsed.phoneNumber = phoneNumber;
      } else {
        // If the data is not available, create a new object with phoneNumber
        familyBaseQuestionsParsed = { phoneNumber };
      }

      // Store the updated data back in localStorage
      localStorage.setItem('q0', JSON.stringify(familyBaseQuestionsParsed));
      // const result = await axios.post(
      //   'http://localhost:8081/api/register',
      //   familyBaseQuestionsParsed
      // );
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  function getAgeGroupByAge(age) {
    console.log(age.months);
    const ageInDays = age.months * 30.44; // Average number of days in a month

    // Find the matching age group based on the given age in days
    const matchingAgeGroup = AgeGroups.find((ageGroup) => {
      const [startMonth, startDay] = ageGroup.code
        .split('-')[0]
        .split('.')
        .map(Number);
      const [endMonth, endDay] = ageGroup.code
        .split('-')[1]
        .split('.')
        .map(Number);

      const startAgeInDays = startMonth * 30.44;
      console.log('startAgeInDays', startAgeInDays);
      const endAgeInDays = endMonth * 30.44;
      console.log('endAgeInDays', endAgeInDays);
      return ageInDays >= startAgeInDays && ageInDays <= endAgeInDays;
    });

    console.log('matchingAgeGroup', matchingAgeGroup);
    localStorage.setItem(
      'ageGroup',
      JSON.stringify(
        matchingAgeGroup === undefined ? 'زیر یک ماه' : matchingAgeGroup
      )
    );
  }

  return (
    <Container fluid="md">
      <Row className="justify-content-md-center mt-5 font-face-gm">
        <Col lg="4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitData();
              navigate('/hallway');
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
