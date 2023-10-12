import React from "react";
import Style from '../assets/style/header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Stack } from "react-bootstrap";
class L_Header extends React.Component {

    render() {
        return (
            <Stack className={Style.container}>
                <div className={Style.div1}>
                    <div className={Style.notify_icon}>
                        <FontAwesomeIcon icon={faBell} color="#fff" size="xl" />
                    </div>
                    <NavDropdown className={Style.nav} title="Teacher [Hungld]" id="nav-dropdown">
                        <NavDropdown.Item>View Profile</NavDropdown.Item>
                        <NavDropdown.Item>Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item>View Meeting</NavDropdown.Item>
                        <NavDropdown.Item>Log out</NavDropdown.Item>
                    </NavDropdown>
                </div>
                <div className={Style.div2}>Second header</div>
                <div className={Style.div3}>Third header</div>
            </ Stack>
        );
    }
}

export default L_Header;
