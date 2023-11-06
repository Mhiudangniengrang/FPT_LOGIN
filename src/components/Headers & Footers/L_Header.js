import React, { useContext, useState } from "react";

import Style from "../../assets/style/header.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

import HorizontalStack from "../HorizontalStack";
import CustomNavDropdown from "../DropDownStack";
import GlobalContext from "../../context/GlobalContext";
import { useData } from "../../context/DataContext";

const dropdownItems = [
  {
    link: "/lecturer/meetingschedule",
    desc: "View Meeting Schedule",
  },
  {
    link: "/lecturer/teachingschedule",
    desc: "View Teaching Schedule",
  },
];

const L_Header = () => {
  const { daySelected, setShowSlotModal, setDaySelected } =
    useContext(GlobalContext);
  const { loginUser } = useData()
  const handleCreateClick = () => {
    setShowSlotModal(true);
    setDaySelected(new Date)
  };
  return (
    <Stack className={Style.container}>
      <div className={Style.div1}>
        <div className={Style.notify_icon}>
          <FontAwesomeIcon icon={faBell} color="#fff" size="xl" />
        </div>
        <NavDropdown
          className={`${Style.nav} ${Style.truncate_text}`}
          title={`Lecturer [${loginUser.userName}]`}
          id="nav-dropdown"
          style={{
            maxWidth: '200px'
          }}
        >
          <NavDropdown.Item
            href="/lecturer/viewprofile"
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#000000", paddingRight: " 5px" }}
            />

            {loginUser.userName}
          </NavDropdown.Item>
          <NavDropdown.Item
            href="/lecturer/viewprofile"
          >
            <FontAwesomeIcon
              icon={faUserPen}
              style={{ color: "#000000", paddingRight: " 5px" }}
            />
            Edit Profile
          </NavDropdown.Item>
          <NavDropdown.Item
            href="/lecturer/meetingschedule"
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#000000", paddingRight: " 5px" }}
            />
            View Meeting
          </NavDropdown.Item>
          <NavDropdown.Item
            href="/"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "#050505", paddingRight: " 5px" }}
            />
            Log out
          </NavDropdown.Item>
        </NavDropdown>
      </div>
      <Stack direction="horizontal" gap={3} className={Style.div2}>
        <h1 style={{ color: "#fff", fontWeight: "700", margin: "0" }}>
          MML - MEET MY LECTURER
        </h1>

        <Button
          className="ms-auto"
          variant="light"
          style={{ borderRadius: "10px" }}
          onClick={() => handleCreateClick()}
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            style={{ color: "#fa8334", paddingRight: "10px" }}

          />
          Create Slot
        </Button>
      </Stack>
      <Stack direction="horizontal" gap={5} className={Style.div3}>
        <HorizontalStack icon={faHouse} text="Home" link="/lecturer" />
        <CustomNavDropdown
          title="Schedule"
          icon={faCalendarDays}
          items={dropdownItems}
        />
        <HorizontalStack
          modify="ms-auto"
          icon={faCircleQuestion}
          text="Help Center"
          link="/"
        />
      </Stack>
    </Stack>
  );
};

export default L_Header;
