import React, { useContext, useState } from "react";

import Style from "../assets/style/header.module.scss";

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

import HorizontalStack from "./HorizontalStack";
import CustomNavDropdown from "./DropDownStack";
import GlobalContext from "../context/GlobalContext";
import { getDateFormat } from "../Utils/dateUtils";

const dropdownItems = [
  {
    link: "/lecturer/meetingschedule",
    desc: "View Meeting Schedule",
  },
  {
    link: "/lecturer/teachingschedule",
    desc: "View Teaching Schedule",
  },
  {
    link: "/lecturer/viewrequest",
    desc: "View Students' Request",
  },
];

const L_Header = () => {
  const { daySelected, setShowSlotModal, setSelectedSlot } =
    useContext(GlobalContext);

  const handleCreateClick = () => {
    setShowSlotModal(true);
    let date = getDateFormat(new Date());
    console.log("date" + date);
    setSelectedSlot(() => ({
      slot: {
        date: date,
      },
    }));
  };
  return (
    <Stack className={Style.container}>
      <div className={Style.div1}>
        <div className={Style.notify_icon}>
          <FontAwesomeIcon icon={faBell} color="#fff" size="xl" />
        </div>
        <NavDropdown
          className={Style.nav}
          title="Teacher [Hungld]"
          id="nav-dropdown"
        >
          <NavDropdown.Item
            href="/lecturer/viewprofile"
          >
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#000000", paddingRight: " 5px" }}
            />

            View Profile
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
          <NavDropdown.Item>
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
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            style={{ color: "#fa8334", paddingRight: "10px" }}
          />
          <a href="#create_slot"
            style={{
              textDecorationLine: "none",
              color: "#000",
            }}
            onClick={() => handleCreateClick()}
          >
            Create Slot
          </a>
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
