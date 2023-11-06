import React from "react";
import S_Header from "../components/Headers & Footers/S_Header";
import Footer from "../components/Headers & Footers/Footer";
import Container from 'react-bootstrap/Container';
import { useData } from "../context/DataContext";
import Unauthorize from "../Pages/errors/Unauthorize";

const S_Layout = ({ children }) => {
    const { authorize } = useData()
    return (
        <>
            {authorize !== null && (
                authorize ? (
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
                ) : (
                    <Unauthorize />
                )
            )}
        </>

    )
}

export default S_Layout