import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class FormSearch extends React.Component {

    render() {
        return (
            <div style={{ maxWidth: '30vw', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', padding: '40px 0' }}>
                <label className='pe-2' id='search_label' htmlFor="search">Search for: </label>
                <form id='search' className="form pe-0"
                    style={{ display: 'flex', flex: '1' }}
                >
                    <select className="form-select pe-0" style={{ maxWidth: '150px', marginRight: '10px' }}>
                        <option value='lecturer'>Lecturer</option>
                        <option value='subject'>Subject</option>
                    </select>
                    <input type="text" placeholder="Search" className="me-2 p-1" />
                    <Button variant="secondary" type="submit">Go</Button>
                </form>
            </div >
        );
    }
}

export default FormSearch;
