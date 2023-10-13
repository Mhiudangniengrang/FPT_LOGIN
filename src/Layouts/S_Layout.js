import React from "react";
import S_Header from "../components/S_Header";
import Footer from "../components/Footer";

const S_Layout = ({ children }) => {

    return (
        <>
            <S_Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default S_Layout