import React from "react";
import Header from "../../components/Header";
import Hero from "./section_hero";
import Feature from "./section_feature";

class Userhome extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Hero />
                <Feature />
            </>
        )
    }
}

export default Userhome