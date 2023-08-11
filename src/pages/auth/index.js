import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import LoginFormEmail from './loginEmail';
import LoginFormPhone from './loginPhone';
import { useState } from 'react';

const AuthIndex = () => {
  const [loginType, setLoginType] = useState('email');
  return (
    <Container
      fluid
      className="font-face-gm"
      style={{
        background: '#FEF4EC',
      }}>
      <Row>
        <Col>
          <LoginFormPhone />
        </Col>
      </Row>
    </Container>
  );
};

export default AuthIndex;
