import React from "react";
import Style from '../../assets/style/connect_section.module.scss';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../Services/customizeAxios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
export default function Connect_section() {
    const navigate = useNavigate();
    const { setAccessToken } = useContext(GlobalContext);
    const handleLoginSuccess = (credentialResponse) => {
        const accessToken = credentialResponse.credential;
        setAccessToken(accessToken)
        axios
            .get("/api/v1/user/userId", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then((response) => {
                navigate(`/${response.roleName}`)
            })
            .catch(error => {
                console.log("Error getting user data:", error);
            });
    };

    return (

        <section className={Style.section} id='overview'>
            <div className={Style.content}>
                <h2 className={Style.h2}>Scheduling made easy for students and teachers</h2>

                <div className={Style.description}>
                    <p >Meet My Lecturer simplifies the process of scheduling meetings with teachers, allowing students to easily request meetings and teachers to create available time slots. With our user-friendly platform, you can say goodbye to the hassle of coordinating schedules and hello to more productive meetings.</p>
                    <div className={Style.subDescription}>
                        <div>
                            <h3 className="d-block">Request Meetings with Teachers</h3>
                            <p className="d-block">Students can browse available time slots and requests meetings. Requests require student and time slot detail</p>
                        </div>
                        <div>
                            <h3 className="d-block">Schedule Student Meetings</h3>
                            <p className="d-block">Teachers can review accept, or reject student meeting requests. Accepted meetings are scheduled based in the time slot details</p>
                        </div>
                    </div>
                    <div>
                        <GoogleOAuthProvider clientId="557005058309-0088dfrc1trmtp5sn1im019as1rt3ofq.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={() => {
                                    console.log("Login Failed");
                                }}
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </section >

    )
}