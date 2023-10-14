import React from "react";
<<<<<<< HEAD
import { Stack } from "react-bootstrap";
=======
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class FormSearch extends React.Component {

    render() {
        return (
<<<<<<< HEAD
            <Stack className="ms-auto" direction="horizontal" gap={2}>
                <label htmlFor="search">Search: </label>
                <Form.Control id='search' className={"me-auto"} placeholder="Search" />
                <Button variant="secondary">Go</Button>
            </Stack >
=======
            <div style={{ maxWidth: '40%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '40px 0' }}>
                <label id='search_label' htmlFor="search" style={{ width: '200px', marginRight: '10px' }}>Search for: </label>
                <select className="form-select pe-0" style={{ maxWidth: '150px', marginRight: '10px' }}>
                    <option value='lecturer'>Lecturer</option>
                    <option value='subject'>Subject</option>
                </select>
                <Form.Control id='search' className={"me-auto"} placeholder="Search" />
                <Button variant="secondary">Go</Button>
            </div >
>>>>>>> 3642c7e3f0fbbac191afd418488231e310a59d81
        );
    }
}

export default FormSearch;
