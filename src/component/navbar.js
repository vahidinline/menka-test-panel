import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { useEffect, useState } from 'react';
function Navbars() {
  const [childName, setChildName] = useState('');

  useEffect(() => {
    const result = JSON.parse(localStorage?.getItem('q0'));
    if (!result) return;
    const childName = result[0]?.answer;
    setChildName(childName);
  }, []);
  return (
    <Navbar
      style={{ backgroundColor: '#eea47f', borderBottom: '1px solid #ddd' }}
      className=" font-face-gm">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={Logo}
            width="100%"
            height="50"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#login">`تست ASQ {childName ? childName : null}`</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
