import React from "react";
import L_Header from "../components/L_Header";
import Footer from "../components/Footer";

const L_Layout = ({ children }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <L_Header />
            <main style={{ flex: '1' }}>{children}</main>
            <Footer />
        </div>
    )
}

export default L_Layout