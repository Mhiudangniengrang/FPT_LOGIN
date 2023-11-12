import React, { useEffect, useState } from "react";
import styles from "../../assets/style/hero.module.scss";
import Carousel from "react-bootstrap/Carousel";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../Services/customizeAxios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import dayjs from "dayjs";
var heroData = [
  {
    id: 1,
    image: require("../../assets/image/pexels-fauxels-3184317.jpg"),
    title: "Schedule Personalized Meetings with Lecturers",
    description:
      "Welcome to Meet My Lecturer, the first app in our school that empowers students to schedule personalized meetings with their lecturers. Easily book one-on-one sessions to get the support you need for your academic journey. Connect with your lecturers and enhance your learning experience. ",
  },
  {
    id: 2,
    image: require("../../assets/image/pexels-icsa-1708912.jpg"),
    title: "Plan Your Academic Success",
    description:
      "Start planning for academic success with Meet My Lecturer. Our app allows you to take control of your learning journey by scheduling meetings with your lecturers. Whether you need clarification on a topic or additional guidance, we've got you covered. Plan your success with Meet My Lecturer.",
  },
  {
    id: 3,
    image: require("../../assets/image/pexels-icsa-1708988.jpg"),
    title: "Connect and Learn",
    description:
      "Discover a new way to connect, learn with Meet My Lecturer. Our app fosters meaningful connections between students and lecturers. Enjoy the difference as you schedule meetings and engage in your academic journey like never before. Join Meet My Lecturer and elevate your learning experience. ",
  },
];

function Hero() {
  const navigate = useNavigate();
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
        sessionStorage.setItem('role', response.roleName)
        sessionStorage.setItem('loginTime', dayjs(Date.now()))
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
    <section
      className={
        " align-items-center justify-content-between hero " + styles.section
      }
      id="overview"
    >
      <ToastContainer />
      <div className={"w-50 float-start " + styles.leftDivStyle}>
        <h1 className={"text-start "}>
          Connecting Students and Teachers for Meetings
        </h1>
        <p className={"m-0 text-start " + styles.pStyle}>
          Welcome to Meet My Lecturer, the platform that brings students and
          teachers together for convenient scheduling and produtive meetings.
        </p>
        <span className="d-block text-start">Login with FPT.EDU.VN</span>
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
      <Carousel className="w-50 float-end">
        {heroData.map((hero) => {
          return (
            <Carousel.Item key={hero.id}>
              <img
                className="d-block w-100"
                src={hero.image}
                alt={"slide " + hero.id}
              />
              <div className={styles.rightDivStyle}>
                <h3 className="text-start">{hero.title}</h3>
                <p className=" text-start">{hero.description}</p>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
}

export default Hero;
