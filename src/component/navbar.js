import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navbars() {
  return (
    <Navbar className="bg-body-tertiary font-face-gm">
      <Container>
        <Navbar.Brand href="#home">پنل منکا</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            نام والد: <a href="#login"> شکرالله نعمت زاده </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
