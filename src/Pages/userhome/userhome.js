import React from "react";
import Header from "../../components/Header";
import Hero from "./section_hero";
import Feature from "./section_feature";
import Connect_section from "./connect_section";
import Team from "./team_section";
import Footer from "../../components/Footer";
import { DataProvider } from "../../context/DataContext";

class Userhome extends React.Component {
    render() {
        return (
            <>
                <Header />
                <DataProvider>
                    <Hero />
                    <Connect_section />
                </DataProvider>
                <Feature />
                <Team />
                <Footer />
            </>
        );
    }
}

export default Userhome;
