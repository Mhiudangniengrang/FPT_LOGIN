import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class FormSearch extends React.Component {

    render() {
        return (
            <div style={{ maxWidth: '30vw', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '40px 0' }}>
                <label id='search_label' htmlFor="search" style={{ width: '200px', marginRight: '10px' }}>Search for: </label>
                <select className="form-select pe-0" style={{ maxWidth: '150px', marginRight: '10px' }}>
                    <option value='lecturer'>Lecturer</option>
                    <option value='subject'>Subject</option>
                </select>
                <Form.Control id='search' className={"me-auto"} placeholder="Search" />
                <Button variant="secondary">Go</Button>
            </div >
        );
    }
}

export default FormSearch;
