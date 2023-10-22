import React from "react";
import dayjs from "dayjs";
import { Button, Card, Stack } from "react-bootstrap";
import WeeklyCalendar from "./Schedule/Week";
import Month from "./Schedule/Month";
import { useState, useEffect, useContext } from "react";
import CalenderTypeButtons from "../components/Schedule/CalenderTypeButtons"; // Make sure the path is correct

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import {
  addDaysByOne,
  getEndOfWeekFormatted,
  getMonth,
  getStartOfWeekFormatted,
  subDaysByOne,
} from "../Utils/dateUtils";
import GlobalContext from "../context/GlobalContext";
import List from "./Schedule/List";

const Calender_type = () => {
  const [activeButton, setActiveButton] = useState("week");
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const {
    setMonthIndex,
    monthIndex,
    daySelected,
    setDaySelected,
  } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  function handlePrevMonth() {
    if (activeButton === "month") {
      setMonthIndex(monthIndex - 1);
    } else if (activeButton === "day") {
      setDaySelected(subDaysByOne(daySelected));
    }
  }
  function handleNextMonth() {
    if (activeButton === "month") {
      setMonthIndex(monthIndex + 1);
    } else if (activeButton === "day") {
      setDaySelected(addDaysByOne(daySelected));
    }
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  return (
    <>
      <div>
        <h2
          style={{
            marginLeft: "1rem",
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            fontWeight: 700,
            color: "#6B7280",
          }}
        >
          {activeButton === "month" &&
            dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
          {activeButton === "week" &&
            getStartOfWeekFormatted(daySelected) +
              " - " +
              getEndOfWeekFormatted(daySelected)}
          {activeButton === "list" && <div>hi</div>}
        </h2>
        <Stack direction="horizontal">
          {activeButton === "month" && (
            <div>
              <button
                onClick={handleReset}
                style={{
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  paddingLeft: "1rem",
                  paddingRight: "1rem",
                  marginRight: "1.25rem",
                  borderRadius: "0.25rem",
                  borderWidth: "1px",
                }}
              >
                Today
              </button>
              <button onClick={handlePrevMonth}>
                <span
                  style={{
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    color: "#4B5563",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCaretLeft}
                    style={{ color: "#000000" }}
                  />
                </span>
              </button>
              <button onClick={handleNextMonth}>
                <span
                  style={{
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    color: "#4B5563",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    style={{ color: "#000000" }}
                  />
                </span>
              </button>
            </div>
          )}

          <div className="btn-group pb-4 ms-auto ">
            <Button
              variant="secondary"
              onClick={() => handleButtonClick("day")}
              className={
                activeButton === "day"
                  ? "btn btn-primary my-custom-button"
                  : "btn btn-secondary my-custom-button"
              }
            >
              day
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleButtonClick("week")}
              className={
                activeButton === "week"
                  ? "btn btn-primary my-custom-button"
                  : "btn btn-secondary my-custom-button"
              }
            >
              week
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleButtonClick("month")}
              className={
                activeButton === "month"
                  ? "btn btn-primary my-custom-button"
                  : "btn btn-secondary my-custom-button"
              }
            >
              month
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleButtonClick("list")}
              className={
                activeButton === "list"
                  ? "btn btn-primary my-custom-button"
                  : "btn btn-secondary my-custom-button"
              }
            >
              list
            </Button>
          </div>
        </Stack>
        {activeButton && (
          <div className="text-center">
            <Card.Body>
              {/* Content that appears when a button is active */}
              {activeButton === "day" && <p>List content goes here.</p>}
              {activeButton === "week" && <WeeklyCalendar />}
              {activeButton === "month" && <Month month={currenMonth} />}
              {activeButton === "list" && <List />}
            </Card.Body>
          </div>
        )}{" "}
      </div>
    </>
  );
};

export default Calender_type;
