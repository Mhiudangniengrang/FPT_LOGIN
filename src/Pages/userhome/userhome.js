import React from "react";
import Header from "../../components/Header";
import Hero from "./section_hero";
import Feature from "./section_feature";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import Footer from "../../components/Footer";

class Userhome extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Hero />
                <Feature />
                <Footer />
            </>
        )
    }
}

export default Userhome