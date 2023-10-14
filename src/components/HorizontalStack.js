import React from "react";
import { NavLink, Stack } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const HorizontalStack = ({ icon, text, link, modify }) => {

    return (
        <Stack className={modify} direction="horizontal" gap={2}>
            <FontAwesomeIcon icon={icon} style={{ color: "#000000", }} />
            <NavLink onTouchCancel={link}>{text}</NavLink>
        </Stack>
    )
}

export default HorizontalStack