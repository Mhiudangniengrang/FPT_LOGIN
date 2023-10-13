import React from "react";
import S_Header from "../components/S_Header";
import Footer from "../components/Footer";

const S_Layout = ({ children }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <S_Header />
            <main style={{ flex: '1' }}>{children}</main>
            <Footer />
        </div>
    )
}

export default S_Layout