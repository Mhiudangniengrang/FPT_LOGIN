import React from "react";
import Style from '../../assets/style/team.module.scss'

const members = [
    {
        fullname: "Tran Minh Loc",
        email: "loctmse171246@fpt,edu.vn",
        desc: "ReactJS/React Bootstrap"
    },
    {
        fullname: "Nguyen Minh Nhat",
        email: "loctmse171246@fpt,edu.vn",
        desc: "SpringBoot/RestAPI"
    },
    {
        fullname: "Nguyen Vu Truong Huy",
        email: "loctmse171246@fpt,edu.vn",
        desc: "SpringBoot/RestAPI"
    },
    {
        fullname: "Duong Minh Hieu",
        email: "loctmse171246@fpt,edu.vn",
        desc: "ReactJS/React Bootstrap"
    },
]

function Team() {

    return (
        <section className={Style.section} id='team'>
            <h2>Our team</h2>
            <div className={Style.content}>
                {
                    members.map(member => {
                        return (
                            <div className={Style.member} key={member.email}>
                                <div className={Style.profileImg}><span>{member.fullname.charAt(0)}</span></div>
                                <h5>{member.fullname}</h5>
                                <h6>{member.email}</h6>
                                <p>{member.desc}</p>
                                <ul>
                                    <li><a>
                                    </a></li>
                                    <li><a></a></li>
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