import React, { useState } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';

const WeightInput = ({ onChange }) => {
  const [weight, setWeight] = useState({ kilos: 0, grams: 0 });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWeight((prevWeight) => ({
      ...prevWeight,
      [name]: value,
    }));
    onChange({ ...weight, [name]: value });
  };

  const getTotalWeight = () => {
    const totalKilos = parseInt(weight.kilos, 10);
    const totalGrams = parseInt(weight.grams, 10);
    return `${totalKilos} کیلو و ${totalGrams} گرم`;
  };

  // Pass the total weight to the parent component

  return (
    <Container>
      <Row>
        <Col
          lg={6}
          sm={12}
          md={12}
          style={{
            padding: '0',
          }}>
          <FormControl
            className="font-bold"
            style={{
              border: '2px solid #000',
              borderWidth: '2px 2px 2px 0',
              padding: '1.5rem',
              boxShadow: 'none',
              fontSize: '2rem',
              paddingRight: '0',
              borderRadius: '0 10px 10px 0 ',
              textAlign: 'center',
            }}
            type="number"
            min={100}
            max={999}
            name="grams"
            value={weight.grams}
            onChange={handleChange}
            placeholder="وزن به گرم"
            aria-label="Grams"
          />
        </Col>
        <Col
          lg={6}
          sm={12}
          md={12}
          style={{
            padding: '0',
          }}>
          <FormControl
            className="font-bold"
            style={{
              border: '2px solid #000',
              borderWidth: '2px 0 2px 2px',
              padding: '1.5rem',
              paddingRight: '0',
              borderRadius: '10px 0 0 10px ',
              boxShadow: 'none',
              fontSize: '2rem',

              textAlign: 'center',
            }}
            type="number"
            name="kilos"
            value={weight.kilos}
            onChange={handleChange}
            placeholder="وزن به کیلو"
            aria-label="Kilos"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p
            className="font-bold text-center shadow-sm p-3 mb-5 bg-transparent rounded
          ">
            {getTotalWeight()}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default WeightInput;
