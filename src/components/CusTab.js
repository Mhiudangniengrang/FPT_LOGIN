import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const CusTab = () => {
    const [key, setKey] = useState('meeting');
    return (
        <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="meeting" title="Meeting Schedule">
            </Tab>
            <Tab eventKey="teaching" title="Teaching Schedule">
            </Tab>
        </Tabs>
    )
}

export default CusTab