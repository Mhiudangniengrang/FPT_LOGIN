import React from "react";
import L_Header from "../components/L_Header";
import Footer from "../components/Footer";
<<<<<<< HEAD
=======
import Container from 'react-bootstrap/Container';
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81

const L_Layout = ({ children }) => {

    return (
<<<<<<< HEAD
        <div >
            <L_Header />
            <main>{children}</main>
            <Footer />
        </div>
=======
        <Container fluid style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <L_Header />
            <Container>
                {children}
            </Container>
            <Footer />
        </Container>
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81
    )
}

export default L_Layout