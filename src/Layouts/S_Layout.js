import React from "react";
import S_Header from "../components/S_Header";
<<<<<<< HEAD
import Footer from "../components/Footer";
=======
import Footer from "../components/Footer"; import Container from 'react-bootstrap/Container';
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81

const S_Layout = ({ children }) => {

    return (
<<<<<<< HEAD
        <>
            <S_Header />
            <main>{children}</main>
            <Footer />
        </>
=======
        <Container fluid style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <S_Header />
            <Container>
                {children}
            </Container>
            <Footer />
        </Container>
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81
    )
}

export default S_Layout