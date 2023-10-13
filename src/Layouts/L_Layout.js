import React from "react";
import L_Header from "../components/L_Header";
import Footer from "../components/Footer";

const L_Layout = ({ children }) => {

    return (
        <div >
            <L_Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default L_Layout