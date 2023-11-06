import React from "react";
import Style from "../assets/style/loading.module.scss"
import { Container } from "react-bootstrap";

const PageLoading = () => {

    return (
        <Container fluid className={Style.Container_fluid}>
            <h2 data-text="meetmylecturer..."
            >
                meetmylecturer...
            </h2>
        </Container >
    )
}

export default PageLoading