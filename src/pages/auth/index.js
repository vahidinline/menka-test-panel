import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import LoginFormEmail from './loginEmail';
import LoginFormPhone from './loginPhone';
import { useState } from 'react';

const AuthIndex = () => {
  const [loginType, setLoginType] = useState('email');
  return (
    <Container className="font-face-gm">
      <Row>
        <Col className="text-center">
          <ButtonGroup size="lg" className="mb-2">
            <Button>ثبت نام</Button>
            <Button
              onClick={() => {
                setLoginType('email');
              }}>
              ورود با ایمیل
            </Button>
            <Button
              onClick={() => {
                setLoginType('phone');
              }}>
              ورود با شماره تلفن
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        {loginType === 'email' ? (
          <Col>
            <LoginFormEmail />
          </Col>
        ) : (
          <Col>
            <LoginFormPhone />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AuthIndex;
