import React from "react";
import Style from "../assets/style/footer.module.scss";
import LOGO from "../../src/assets/image/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className={`container ${Style.footer}`}>
      <div className={`row ${Style.footerContainer}`}>
        <div className={`col-md-6 ${Style.footerSection}`}>
          <h5 className={Style.title}>Address:</h5>
          <p>FPT University HCM Campus</p>
          <h5 className={Style.title}>Contact:</h5>
          <p>IT Support: 0939 421 192</p>
        </div>

        <div className={`col-md-6 ${Style.logoSection}`}>
          <h1 className={Style.siteTitle}>Meet My Lecture</h1>
          <img
            src={LOGO}
            alt="MML Logo"
            className={`img-fluid ${Style.logo}`}
          />
        </div>
      </div>

      <div className={`text-center ${Style.copyRight}`}>
        <p>&#169; 2023 Meet My Lecture</p>
      </div>
    </footer>
  );
}

export default Footer;
