import React, { useState } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';

const WeightInput = ({ onChange, keyPress }) => {
  const [weight, setWeight] = useState({ kilos: 0, grams: 0 });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWeight((prevWeight) => ({
      ...prevWeight,
      [name]: value,
    }));
    onChange({ ...weight, [name]: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const { kilos, grams } = weight;
      if (kilos !== 0 && grams !== 0) {
        // Trigger your function here

        keyPress(event);
      }
    }
  };

  const getTotalWeight = () => {
    const totalKilos = parseInt(weight.kilos, 10);
    const totalGrams = parseInt(weight.grams, 10);
    return `${totalKilos} کیلو و ${totalGrams} گرم`;
  };

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
            style={
              {
                // ...styles for input
              }
            }
            type="number"
            min={100}
            max={999}
            name="grams"
            value={weight.grams}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Add this line
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
            style={
              {
                // ...styles for input
              }
            }
            type="number"
            name="kilos"
            value={weight.kilos}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Add this line
            placeholder="وزن به کیلو"
            aria-label="Kilos"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {weight.kilos && weight.grams ? (
            <p className="font-bold text-center shadow-sm p-3 mb-5 bg-transparent rounded">
              {getTotalWeight()}
            </p>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default WeightInput;
