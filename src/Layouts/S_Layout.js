import React from "react";
import S_Header from "../components/Headers & Footers/S_Header";
import Footer from "../components/Headers & Footers/Footer";
import Container from 'react-bootstrap/Container';

const S_Layout = ({ children }) => {
    return (
        <>
            <Container fluid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <S_Header />
                <Container
                    style={{ flex: '1' }}
                >
                    {children}
                </Container>
                <Footer />
            </Container>
        </>

    )
}

export default S_Layout