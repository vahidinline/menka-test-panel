import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function LoginFormEmail() {
  return (
    <Container fluid="md">
      <Row className="justify-content-md-center mt-5 font-face-gm">
        <Col lg="4">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = '/home';
            }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>آدرس ایمیل</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>رمز عبور</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              ورود
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginFormEmail;
