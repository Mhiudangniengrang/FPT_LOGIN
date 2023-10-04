import React from 'react';
import './home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rate from '../../assets/image/rate 1.png';
import Schedule from '../../assets/image/schedule 1.png';
import Search from '../../assets/image/search 1.png';

const featuresData = [
    {
        id: 1,
        icon: Schedule,
        title: 'Schedule',
        description: 'your meeting'
    },
    {
        id: 2,
        icon: Search,
        title: 'Search',
        description: 'lectures'
    },
    {
        id: 3,
        icon: Rate,
        title: 'Rate',
        description: 'your course'
    },
]

function Feature() {
    return (
        <section className='features'>
            <Container fluid>
                <div className="title-holder">
                    <h2>OUR SERVICES</h2>
                </div>
                <Row>
                    {
                        featuresData.map(features => {
                            return (
                                <Col sm={4} className='holder' key={features.id}>
                                    <div className="feature">
                                        <img className='feature_logo' src={features.icon} alt="icon" />
                                        <div className='description'>
                                            <h3>{features.title}</h3>
                                            <span>{features.description}</span>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        </section>
    )
}

export default Feature