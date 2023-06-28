import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ChildInformationForm = () => {
  const [formData, setFormData] = useState({});

  const questions = [
    {
      question: 'نام و نام فامیل کودک',
      type: 'text',
    },
    {
      question: 'روز/ماه/سال تولد کودک',
      type: 'date',
    },
    {
      question: 'تاریخ تولد مادر',
      type: 'date',
    },
    {
      question: 'تحصیلات مادر',
      type: 'text',
    },
    {
      question: 'شغل مادر',
      type: 'text',
    },
    {
      question: 'تاریخ تولد پدر',
      type: 'date',
    },
    {
      question: 'تحصیلات پدر',
      type: 'text',
    },
    {
      question: 'شغل پدر',
      type: 'text',
    },
    {
      question: 'چند فرزند دارید؟',
      type: 'text',
    },
    {
      question: 'فاصله ی سنی فرزندان از یک دیگر چقدر است؟',
      type: 'text',
      options: [],
    },
    {
      question: 'کودک ثبت نام شده فرزند چندم است؟',
      type: 'text',
    },
    {
      question: 'آیا بارداری شما خواسته بوده است؟',
      type: 'radio',
      options: ['بله', 'خیر'],
    },
    {
      question: 'آیا پیش آمده فرزند شما شاهد مشاجره و نزاع بوده باشد؟',
      type: 'radio',
      options: ['به ندرت', 'گاهی', 'اغلب'],
    },
    {
      question:
        'مشاجراتی که فرزندتان شاهد بوده معمولا لفظی فیزیکی هر دو نوع بوده است.',
      type: 'radio',
      options: ['لفظی', 'فیزیکی', 'هر دو'],
    },
    {
      question:
        'مدت زمانی که پدر و مادر با یک دیگر وقت می‌گذرانند برای: تفریح و صمیمیت/مسائل کاری و زندگی روزمره / مسائل تربیتی کودک',
      type: 'text',
    },
    {
      question: 'کودک رابطه‌ی عاطفی میان دو والد را می‌بیند؟',
      type: 'radio',
      options: ['گاهی', 'به ندرت', 'اغلب'],
    },
  ];
  const [showQuestion5, setShowQuestion5] = useState(false);

  const handleChange = (e, index) => {
    const updatedFormData = { ...formData };
    updatedFormData[index] = e.target.value;
    setFormData(updatedFormData);

    if (index === 8 && parseInt(e.target.value) > 1) {
      setShowQuestion5(true);
    } else if (index === 8) {
      setShowQuestion5(false);
      // Clear the answer to question 5 when it is hidden
      setFormData({ ...formData, 9: '' });
    }
  };

  const handleDateChange = (date, index) => {
    const updatedFormData = { ...formData };
    updatedFormData[index] = date;
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or further processing here
    console.log('Form submitted:', formData);
  };

  return (
    <Container>
      <Row
        className="justify-content-md-center font-face-gm"
        style={{ marginTop: '2rem' }}>
        <Col xs lg="6">
          <Form onSubmit={handleSubmit}>
            <h3>سوالات بستر خانواده</h3>
            {questions.map((question, index) => (
              <Form.Group key={index} controlId={`question${index + 1}`}>
                <Form.Label>{question.question}</Form.Label>
                {question.type === 'text' && (
                  <Form.Control
                    type="text"
                    value={formData[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                  />
                )}
                {question.type === 'date' && (
                  <DatePicker
                    selected={formData[index] || null}
                    onChange={(date) => handleDateChange(date, index)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                )}
                {question.type === 'radio' && (
                  <div>
                    {question.options.map((option, optionIndex) => (
                      <Form.Check
                        key={optionIndex}
                        type="radio"
                        id={`question${index + 1}-option${optionIndex + 1}`}
                        label={option}
                        value={option}
                        checked={formData[index] === option}
                        onChange={(e) => handleChange(e, index)}
                      />
                    ))}
                  </div>
                )}
                {showQuestion5 && (
                  <Form.Group controlId="question9">
                    <Form.Label>
                      فاصله ی سنی فرزندان از یک دیگر چقدر است؟
                    </Form.Label>
                    {formData[8] > 1 &&
                      Array.from({ length: formData[8] - 1 }).map((_, i) => (
                        <Form.Control
                          key={i}
                          type="text"
                          value={formData[9 + i] || ''}
                          onChange={(e) => handleChange(e, 9 + i)}
                        />
                      ))}
                  </Form.Group>
                )}
              </Form.Group>
            ))}
            <Link
              to={{
                pathname: '/home',
              }}
              state={2}
              style={{ textDecoration: 'none' }}
              className="btn btn-primary mt-3 mb-3"
              size="lg"
              type="submit">
              ثبت فرم و ادامه
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChildInformationForm;
