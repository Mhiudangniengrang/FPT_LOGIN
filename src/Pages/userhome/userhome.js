import React from "react";
import Header from "../../components/Header";
import Hero from "./section_hero";
import Feature from "./section_feature";
import Connect_section from "./connect_section";

class Userhome extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Hero />
                <Connect_section />
                <Feature />
            </>
        )
    }
}

export default Userhome