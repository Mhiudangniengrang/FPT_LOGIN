import React from 'react'
import Style from '../../assets/style/admin.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookOpen, faPersonShelter } from "@fortawesome/free-solid-svg-icons";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
export function Sidebar({ Toggle }) {
    const menuItems = [
        { icon: faGauge, text: 'Dashboard', href: '/admin/dashboard' },
        { icon: faBook, text: 'Major', href: '/admin/major' },
        { icon: faPersonShelter, text: 'Room', href: '/admin/room' },
        { icon: faBookOpen, text: 'Subject', href: '/admin/subject' },
    ];
    const { type } = useParams()
    return (
        <div className={`sidebar p-2 ${Style.sidebar} ${Toggle === false ? Style.isActive : ""}`}>
            <div className='m-2'>
                <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
                <span className={`brand-name fs-4 fw-bold text-white ${Style.brandName}`}>Meet My Lecturer</span>
            </div>
            <div className={`list-group ${Style.listGroup}`}>
                {menuItems.map((item, index) => (
                    <a key={index}
                        className={`list-group-item py-2 ${type === item.text.toLowerCase() ? Style.active : ''}`}
                        href={item.href}
                        data-bs-content={item.text}
                    >
                        <FontAwesomeIcon className='bi bi-speedometer2 fs-5 me-3' icon={item.icon} />
                        <span>{item.text}</span>
                    </a>
                ))}
                <a className='list-group-item py-2' >
                    <FontAwesomeIcon
                        className={`bi bi-power fs-5 me-3 ${Style.icon}`}
                        icon={faRightFromBracket} />
                    <span >Logout</span>
                </a>
            </div>
        </div>
    )
}
