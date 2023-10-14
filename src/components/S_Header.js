import React from "react";
import Style from '../assets/style/header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUserPen } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

import NavDropdown from 'react-bootstrap/NavDropdown';
import { Stack } from "react-bootstrap";

import FormSearch from "./FormSearch";
import HorizontalStack from "./HorizontalStack";
import CustomNavDropdown from "./DropDownStack";

const dropdownItems = [
    {
        link: '',
        desc: 'View Schedule'
    },
    {
        link: '',
        desc: 'Book slot'
    },
    {
        link: '',
        desc: 'Send Request'
    },
]

class S_Header extends React.Component {


    render() {
        return (
            <Stack className={Style.container}>
                <div className={Style.div1}>
                    <div className={Style.notify_icon}>
                        <FontAwesomeIcon icon={faBell} color="#fff" size="xl" />
                    </div>
                    <NavDropdown className={Style.nav} title="Student [hieudmse161153]" id="nav-dropdown">
                        <NavDropdown.Item>
                            <FontAwesomeIcon icon={faUser} style={{ color: "#000000", paddingRight: " 5px", }} />
                            View Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <FontAwesomeIcon icon={faUserPen} style={{ color: "#000000", paddingRight: " 5px", }} />
                            Edit Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#000000", paddingRight: " 5px", }} />
                            View Schedule
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#050505", paddingRight: " 5px", }} />
                            Log out
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
                <Stack direction="horizontal" gap={3} className={Style.div2}>
                    <h1 style={{ color: "#fff", fontWeight: '700', margin: '0' }}>MML - MEET MY LECTURER</h1>
                </Stack>
                <Stack direction="horizontal" gap={5} className={Style.div3}>

                    <HorizontalStack icon={faHouse} text='Home' link="/" />
                    <CustomNavDropdown title='Schedule' icon={faCalendarDays} items={dropdownItems} />

                    <HorizontalStack modify='ms-auto' icon={faCircleQuestion} text='Help Center' link="/" />
                </Stack>
            </ Stack>
        );
    }
}

export default S_Header;
