import React from "react";
import S_Header from "../components/S_Header";
import Footer from "../components/Footer"; import Container from 'react-bootstrap/Container';

const S_Layout = ({ children }) => {

    return (
        <Container fluid style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <S_Header />
            <Container>
                {children}
            </Container>
            <Footer />
        </Container>
    )
}

export default S_Layout