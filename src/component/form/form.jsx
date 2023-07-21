import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ChildInformationFormOne } from '../../data/questions.js';
import Q3 from './family/q3.js';
import Q1 from './family/q1.js';
import Q2 from './family/q2.js';
import Q0 from './family/q0.js';

const ChildInformationForm = () => {
  const [q0, setQ0] = useState(false);
  const [q1, setQ1] = useState(false);
  const [q2, setQ2] = useState(false);
  const [q3, setQ3] = useState(false);

  useEffect(() => {
    console.log(q1, q2, q3);
  }, [q1]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or further processing here
    console.log('Form submitted:');
  };

  return (
    <Container>
      <Row
        className="justify-content-md-center font-face-gm "
        style={{ marginTop: '2rem', flexDirection: 'row' }}>
        <Col lg="5" sm="12" md="12" xs={{ order: 2 }}>
          <Card style={{ margin: '5px', border: 'none' }}>
            <Card.Body>
              <Card.Text className="text-justify">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
                جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col
          lg="7"
          sm="12"
          md="12"
          xs={{ order: 1 }}
          className="d-flex justify-content-center align-items-center">
          <Q0 setQ0={setQ0} />
          {/* {!q1 && !q2 && !q3 && <Q1 setQ1={setQ1} />}
          {q1 && !q2 && !q3 && <Q2 setQ2={setQ2} />}
          {q1 && q2 && !q3 && <Q3 setQ3={setQ3} />} */}
        </Col>
      </Row>
    </Container>
  );
};

export default ChildInformationForm;
