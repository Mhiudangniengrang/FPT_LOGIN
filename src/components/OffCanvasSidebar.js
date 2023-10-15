import React, { useState } from 'react';
import { Button, Offcanvas, ListGroup } from 'react-bootstrap';

function OffCanvasSidebar() {
    const [showSidebar, setShowSidebar] = useState(false);

    const openSidebar = () => setShowSidebar(true);
    const closeSidebar = () => setShowSidebar(false);

    return (
        <div>
            {/* Navbar with a button to open the sidebar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Button variant="light" onClick={openSidebar}>
                    <span className="navbar-toggler-icon"></span>
                </Button>
                <h1 className="navbar-brand">Your App</h1>
            </nav>

            <Offcanvas show={showSidebar} onHide={closeSidebar}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Sidebar Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Sidebar menu content goes here */}
                    <ListGroup>
                        <ListGroup.Item>Item 1</ListGroup.Item>
                        <ListGroup.Item>Item 2</ListGroup.Item>
                        <ListGroup.Item>Item 3</ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Page content */}
            <div className={`content ${showSidebar ? 'offcanvas-open' : ''}`}>
                {/* Page content goes here */}
                <h2>Main Content</h2>
                <p>This is the main content of your page.</p>
            </div>
        </div>
    );
}

export default OffCanvasSidebar;
