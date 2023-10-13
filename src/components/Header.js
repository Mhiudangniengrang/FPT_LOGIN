import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/style/home.css'
import Image from "../assets/image/logo.png";
import ButtonLink from './ButtonLink';
import Language from './Language';

function Header() {

  const containerStlye = {
    maxWidth: '1350px',
  }
  const buttonStyle = {
    border: 'none',
    display: 'inline - block',
    padding: '10px 30px',
    backgroundColor: '#ff5722',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '10px',
    fontWeight: 'bold',
  }

  const titleStyle = {
    fontWeight: '700',
    paddingRight: '10px',
  }
  const overViewStyle = {
    color: 'rgb(255, 87, 34)',
  }
  return (
    <Navbar fixed="top" bg="light" data-bs-theme="light" >
      <Container style={containerStlye}>
        <Navbar.Brand href="/home">
          <img src={Image} alt='logoFPT' width={180} height={40} />
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/" style={titleStyle} >Meet My Lecturer</Nav.Link>
          <Nav.Link href="#overview" style={overViewStyle}>Overview</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
        </Nav>
        <div>
          <Language />
          <ButtonLink text="Login" link="/login" style={buttonStyle} />
        </div>
      </Container>
    </Navbar >
  )
}

export default Header