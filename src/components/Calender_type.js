import React from "react";
import dayjs from "dayjs";
import { Button, Card, Stack, Form } from "react-bootstrap";
import WeeklyCalendar from "./Schedule/Week";
import Month from "./Schedule/Month";
import { useState, useEffect, useContext } from "react";
import data from "../S_Data.json";
import List from "../components/Schedule/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../Services/customizeAxios";
import {
  addDaysByOne,
  getEndOfWeekFormatted,
  getMonth,
  getStartOfWeekFormatted,
  subDaysByOne,
} from "../Utils/dateUtils";
import GlobalContext from "../context/GlobalContext";

const Calender_type = () => {
  const [activeButton, setActiveButton] = useState("week");
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { setMonthIndex, monthIndex, daySelected, setDaySelected } =
    useContext(GlobalContext);


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
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = firstIndex + recordsPerPage;
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const options = ["Summer-2023", "Fall-2023", "Spring-2023"];
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedTerm, setSelectedTerm] = useState("Fall-2023"); // Default term
  const [filteredData, setFilteredData] = useState([]);

  const terms = {
    "Summer-2023": { startDate: "5/5", endDate: "25/7" },
    "Fall-2023": { startDate: "5/9", endDate: "25/11" },
    "Spring-2023": { startDate: "5/1", endDate: "25/3" },
  };

  useEffect(() => {
    const termInfo = terms[selectedTerm];
    const termStartDateParts = termInfo.startDate.split("/");
    const termEndDateParts = termInfo.endDate.split("/");
    const termStartDate = new Date(
      2023,
      parseInt(termStartDateParts[1]) - 1, // Subtract 1 from month because it's 0-based
      parseInt(termStartDateParts[0])
    );
    const termEndDate = new Date(
      2023,
      parseInt(termEndDateParts[1]) - 1,
      parseInt(termEndDateParts[0])
    );

    const termData = data.filter((record) => {
      const recordDateParts = record.date.split("/");
      const recordDate = new Date(
        2023,
        parseInt(recordDateParts[1]) - 1,
        parseInt(recordDateParts[0])
      );

      return recordDate >= termStartDate && recordDate <= termEndDate;
    });

    setFilteredData(termData);
  }, [selectedTerm]);

  const handleSpringTerm = () => {
    setSelectedTerm("Spring-2023");
    setCurrentPage(1);
    setActiveIndex(2); // Update to match the index of "Spring-2023"
  };

  const handleSummerTerm = () => {
    setSelectedTerm("Summer-2023");
    setCurrentPage(1);
    setActiveIndex(0); // Update to match the index of "Summer-2023"
  };

  const handleFallTerm = () => {
    setSelectedTerm("Fall-2023");
    setCurrentPage(1);
    setActiveIndex(1); // Update to match the index of "Fall-2023"
  };

  // The handleNext and handlePrev functions are updated as follows
  const handleNext = () => {
    setCurrentPage(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % options.length);
    setSelectedTerm(options[(activeIndex + 1) % options.length]);
  };

  const handlePrev = () => {
    setCurrentPage(1);
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + options.length) % options.length
    );
    setSelectedTerm(
      options[(activeIndex - 1 + options.length) % options.length]
    );
  };
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(no) {
    setCurrentPage(no);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handleRecordsPerPageChange(e) {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  }

  return (
    <>
      <div>
        <h2
          style={{
            padding: '0',
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
          {activeButton === "list" && (
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handlePrev}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>
              <h3
                style={{
                  marginLeft: "1rem",
                  fontSize: "1.25rem",
                  lineHeight: "1.75rem",
                  fontWeight: 700,
                  color: "#6B7280",
                }}
                className={activeIndex === 0 ? "" : ""}
              >
                {options[activeIndex]}
              </h3>
              <Button

                variant="secondary"
                onClick={handleNext}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </div>
          )}
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
              {activeButton === "week" && <WeeklyCalendar isDisable={false} />}
              {activeButton === "month" && <Month month={currenMonth} />}
              {activeButton === "list" && (
                <List
                  data={data}
                  currentPage={currentPage}
                  recordsPerPage={recordsPerPage}
                  handleRecordsPerPageChange={handleRecordsPerPageChange}
                  prePage={prePage}
                  changeCPage={changeCPage}
                  nextPage={nextPage}
                  filteredData={filteredData}
                />
              )}
            </Card.Body>
          </div>
        )}{" "}
      </div>
    </>
  );
};

export default Calender_type;
