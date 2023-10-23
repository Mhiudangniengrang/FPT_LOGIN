import React from "react";
import S_Header from "../components/S_Header";
import Footer from "../components/Footer";
import Container from 'react-bootstrap/Container';
import { useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const S_Layout = ({ children }) => {

    const { setRole } = useContext(GlobalContext)
    useEffect(() => {
        setRole('student');
    }, []);
    return (
        <Container fluid
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
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
    )
}

export default S_Layout