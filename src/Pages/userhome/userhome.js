import React from "react";
import Header from "../../components/Header";
import Hero from "./section_hero";
import Feature from "./section_feature";
import Connect_section from "./connect_section";
import Team from "./team_section";
import Footer from "../../components/Footer";
import { useEffect } from "react";

function Userhome() {
    useEffect(() => {
        localStorage.removeItem("accessToken")
    }, [])
    return (
        <>
            <Header />
            <Hero />
            <Connect_section />
            <Feature />
            <Team />
            <Footer />
        </>
    );

}

export default Userhome;
