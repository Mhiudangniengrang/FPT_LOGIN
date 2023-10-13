import React from "react";
import { Stack } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class FormSearch extends React.Component {

    render() {
        return (
            <Stack className="ms-auto" direction="horizontal" gap={2}>
                <label htmlFor="search">Search: </label>
                <Form.Control id='search' className={"me-auto"} placeholder="Search" />
                <Button variant="secondary">Go</Button>
            </Stack >
        );
    }
}

export default FormSearch;
