import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const MRangeSlider = (props) => {
  const { options, value, onChange } = props;
  const [sliderValue, setSliderValue] = useState(value || 0);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
    onChange(newValue);
  };

  const formatPc = (p) => p + '%';

  return (
    <Form>
      <Form.Group as={Row}>
        <Col>
          <div
            className="slider custom-labels"
            style={{
              width: '100%',
              height: '36px',
              direction: 'ltr',
            }}>
            <Slider
              style={{
                width: '100%',
                height: '36px',
                background: 'transparent',
                direction: 'rtl',
              }}
              min={0}
              max={100}
              value={sliderValue}
              labels={options}
              format={formatPc}
              onChange={handleSliderChange}
            />
          </div>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default MRangeSlider;
