import React, { useState } from "react";
import Style from "../../assets/style/header.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import HorizontalStack from "../HorizontalStack";
import CustomNavDropdown from "../DropDownStack";
import { useData } from "../../context/DataContext";
const dropdownItems = [
  {
    link: "/student/viewschedule/week",
    desc: "View Schedule",
  },
  {
    link: "/student/search",
    desc: "Book slot",
  },
  {
    link: `/student/search`,
    desc: "Send Request",
  },
];

const S_Header = () => {
  const { loginUser } = useData()

  return (
    <Stack className={Style.container}>
      <div className={Style.div1}>
        <div className={Style.notify_icon}>
          <FontAwesomeIcon icon={faBell} color="#fff" size="xl" />
        </div>
        <NavDropdown
          className={`${Style.nav} ${Style.truncate_text}`}
          title={`Student ${loginUser.userName}`}
          id="nav-dropdown"
          style={{
            maxWidth: '200px'
          }}
        >
          <NavDropdown.Item
            href="/student/viewprofile"
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#000000", paddingRight: " 15px" }}
            />
            {loginUser.userName}
          </NavDropdown.Item>
          <NavDropdown.Item
            href="/student/viewprofile"
          >
            <FontAwesomeIcon
              icon={faUserPen}
              style={{ color: "#000000", paddingRight: " 10px" }}
            />
            Edit Profile
          </NavDropdown.Item>
          <NavDropdown.Item
            href="/student/viewschedule"
          >

            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#000000", paddingRight: " 15px" }}
            />
            View Schedule
          </NavDropdown.Item>
          <NavDropdown.Item
            href="/"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "#050505", paddingRight: " 15px" }}
            />
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </div>
      <Stack direction="horizontal" gap={3} className={Style.div2}>
        <h1 style={{ color: "#fff", fontWeight: "700", margin: "0" }}>
          MML - MEET MY LECTURER
        </h1>
      </Stack>
      <Stack direction="horizontal" gap={5} className={Style.div3}>
        <HorizontalStack icon={faHouse} text="Home" link="/student" />

        <CustomNavDropdown
          title="Schedule"
          icon={faCalendarDays}
          items={dropdownItems}
        />
        <HorizontalStack icon={faTableColumns} text="Dashboard" link="/student/dashboard" />

        <HorizontalStack
          modify="ms-auto"
          icon={faCircleQuestion}
          text="Help Center"
          link="/"
        />
      </Stack>
    </Stack>
  );

}

export default S_Header;
