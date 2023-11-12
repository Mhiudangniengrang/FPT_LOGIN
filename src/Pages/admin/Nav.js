import React from 'react'

import 'bootstrap/js/dist/dropdown'
import Style from '../../assets/style/admin.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/js/dist/collapse'


function Nav({ Toggle }) {
    return (
        <nav className={`navbar navbar-expand-sm navbar-dark px-3 ${Style.nav}`}>
            <FontAwesomeIcon
                className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}
                icon={faBars} style={{ color: "#000000", cursor: 'pointer' }} />
            <button className="navbar-toggler d-lg-none"
                type="button" data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <i className='bi bi-justify'></i>
            </button>
            <h5 style={{ margin: '0' }}>Admin Panel</h5>
        </nav>
    )
}
export default Nav