import React from "react";
import Style from '../../assets/style/connect_section.module.scss';

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../Services/customizeAxios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
export default function Connect_section() {
    const navigate = useNavigate();
    const { setAccessToken } = useContext(GlobalContext);
    const handleLoginSuccess = (credentialResponse) => {
        const accessToken = credentialResponse.credential;
        localStorage.setItem('accessToken', accessToken)
        axios
            .get("/api/v1/user/userId", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then((response) => {
                console.log(response)
                sessionStorage.setItem('loginTime', Date.now())
                sessionStorage.setItem('role', response.roleName)
                const encodeInfo = {
                    userId: response.userId,
                    email: response.email,
                    status: response.status,
                    roleName: response.roleName,
                    majorId: response.majorId,
                };
                const saveToSession = {
                    userName: response.userName,
                    info: btoa(JSON.stringify(encodeInfo))
                }
                sessionStorage.setItem("user", JSON.stringify(saveToSession));
                navigate(`/${response.roleName}`)
            })
            .catch(error => {
                console.log("Error getting user data:", error);
                toast.error(`${error.response != null ? error.response.data.message : error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    return (

        <section className={Style.section} id='overview'>
            <ToastContainer />
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
                                    toast.error(`${error.response != null ? error.response.data.message : error.message}`, {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                }}
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </section >

    )
}