import React, { useEffect, useState } from "react";
import styles from "../../assets/style/hero.module.scss";
import Carousel from "react-bootstrap/Carousel";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import axios from "../../Services/customizeAxios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
var heroData = [
  {
    id: 1,
    image: require("../../assets/image/pexels-fauxels-3184317.jpg"),
    title: "The perfect design for your website",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!",
  },
  {
    id: 2,
    image: require("../../assets/image/pexels-icsa-1708912.jpg"),
    title: "Start Your Future Financial Plan",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!",
  },
  {
    id: 3,
    image: require("../../assets/image/pexels-icsa-1708988.jpg"),
    title: "Enjoy the Difference",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!",
  },
];

function Hero() {
  const history = useHistory();
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
        console.log("Student")
        history.push(`/${response.roleName}`)
      })
      .catch(error => {
        console.log("Error getting user data:", error);
      });
  };

  return (
    <section
      className={
        " align-items-center justify-content-between hero " + styles.section
      }
      id="overview"
    >
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
