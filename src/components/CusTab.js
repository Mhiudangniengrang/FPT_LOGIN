import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const CusTab = () => {
    const [key, setKey] = useState('events');
    return (
        <Tabs
            activeKey={key}
            className="mb-3"
        >
            <Tab eventKey="events" title="Events">
            </Tab>
        </Tabs>
    )
}

export default CusTab