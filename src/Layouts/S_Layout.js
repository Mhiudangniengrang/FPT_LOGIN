import React from "react";
import S_Header from "../components/S_Header";
import Footer from "../components/Footer";
import Container from 'react-bootstrap/Container';
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const S_Layout = ({ children }) => {

    const { setShowSlotModal } = useContext(GlobalContext)
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