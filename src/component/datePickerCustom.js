import React, { useEffect, useState } from 'react';
import jalaliMoment from 'jalali-moment';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const JalaliToGregorianConverter = ({ onConversion, type }) => {
  console.log(type);
  // Calculate the starting Jalali year for the range (60 years ago from the current Jalali year)
  const currentJalaliYear = jalaliMoment().jYear();
  const startingJalaliYear =
    type === 3 ? currentJalaliYear - 5 : currentJalaliYear - 60;

  const [jalaliDate, setJalaliDate] = useState({
    year: '',
    month: '',
    day: '',
  });

  const [gregorianDate, setGregorianDate] = useState('');

  const generateSelectOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const jalaliYears = generateSelectOptions(
    startingJalaliYear,
    currentJalaliYear
  );
  const jalaliMonths = generateSelectOptions(1, 12);
  const gregorianDays = generateSelectOptions(1, 31);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJalaliDate({ ...jalaliDate, [name]: value });
  };

  const handleConvert = () => {
    const { year, month, day } = jalaliDate;
    if (year && month && day) {
      const jalaliString = `${year}/${month}/${day}`;
      const gregorianDate = jalaliMoment(jalaliString, 'jYYYY/jM/jD').format(
        'YYYY-MM-DD'
      );
      setGregorianDate(gregorianDate);
      onConversion(gregorianDate); // Pass Gregorian date to the parent component
    } else {
      setGregorianDate('');
    }
  };

  const checkData = () => {
    if (jalaliDate.year && jalaliDate.month && jalaliDate.day) {
      handleConvert();
    }
  };

  useEffect(() => {
    checkData();
  }, [jalaliDate]);

  return (
    <Container>
      <Row>
        <Col lg="4" md="12" sm="12">
          <Form.Group controlId="year">
            <Form.Control
              style={{
                direction: 'rtl',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '1rem',
              }}
              as="select"
              name="year"
              value={jalaliDate.year}
              onChange={handleChange}>
              <option value="">انتخاب سال</option>
              {jalaliYears}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col lg="4" md="12" sm="12">
          <Form.Group controlId="month">
            <Form.Control
              as="select"
              name="month"
              value={jalaliDate.month}
              onChange={handleChange}>
              <option value="">انتخاب ماه</option>
              {jalaliMonths}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col lg="4" md="12" sm="12">
          <Form.Group controlId="day">
            <Form.Control
              as="select"
              name="day"
              value={jalaliDate.day}
              onChange={handleChange}>
              <option value="">انتخاب روز</option>
              {gregorianDays}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default JalaliToGregorianConverter;
