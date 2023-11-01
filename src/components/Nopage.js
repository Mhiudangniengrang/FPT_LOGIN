import React from "react";
import Header from "./Headers & Footers/Header";
import Footer from "./Headers & Footers/Footer";

export default function Nopage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} >
            <Header />
            <div className="pt-5  mt-auto mb-auto ms-0 me-0">
                <h1 className="p-5 text-center ">404 No page error :(</h1>
            </div>
            <Footer />
        </div>
    )
}