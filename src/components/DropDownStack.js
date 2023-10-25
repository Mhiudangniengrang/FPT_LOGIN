import React from 'react';
import { Stack, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomNavDropdown({ title, items, icon }) {
    return (
        <Stack gap={2} direction='horizontal'>
            <FontAwesomeIcon icon={icon} style={{ color: "#000000", }} />
            <NavDropdown title={title} id="nav-dropdown">
                {items.map((item, index) => (
                    <NavDropdown.Item key={index} href={item.link}>
                        {item.desc}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </Stack>
    );
}

export default CustomNavDropdown;