import React from "react";
import Style from '../../assets/style/team.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
const members = [
    {
        fullname: "Tran Minh Loc",
        email: "loctmse171246@fp.edu.vn",
        desc: "ReactJS/React Bootstrap",
        github: "https://github.com/minhlocdev",
        facebook: "https://github.com/truonghuy2490"
    },
    {
        fullname: "Nguyen Minh Nhat",
        email: "nhatnmse171301@fp.edu.vn",
        desc: "SpringBoot/RestAPI",
        github: "https://github.com/truonghuy2490",
        facebook: "https://github.com/truonghuy2490"
    },
    {
        fullname: "Nguyen Vu Truong Huy",
        email: "huynvtse171283@fp.edu.vn",
        desc: "SpringBoot/RestAPI",
        github: "https://github.com/truonghuy2490",
        facebook: "https://github.com/truonghuy2490"
    },
    {
        fullname: "Duong Minh Hieu",
        email: "hieudmse161153@fp.edu.vn",
        desc: "ReactJS/React Bootstrap",
        github: "https://github.com/Mhiudangniengrang",
        facebook: "https://github.com/truonghuy2490"
    },
]

function Team() {

    return (
        <section className={Style.section + ' pb-5'} id='team'>
            <h2>Our team</h2>
            <div className={Style.content}>
                {
                    members.map(member => {
                        return (
                            <div key={member.fullname} className={Style.member}>
                                <div className={Style.profileImg}><span>{member.fullname.charAt(0)}</span></div>
                                <h5>{member.fullname}</h5>
                                <h6>{member.email}</h6>
                                <p>{member.desc}</p>
                                <ul
                                    style={{
                                        listStyle: 'none',
                                        padding: '0'
                                    }}
                                >
                                    <li
                                        style={{
                                            cursor: 'pointer'
                                        }}>
                                        <a href={member.github} target="_blank">
                                            <FontAwesomeIcon icon={faGithub} style={{ color: "#000000" }} />
                                        </a>
                                    </li>
                                    <li
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <a href={member.facebook} target="_blank">
                                            <FontAwesomeIcon icon={faFacebook} style={{ color: "#000000", paddingLeft: "10px" }} />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        );
                    })
                }
            </div>
        </section >
    )
}

export default Team;