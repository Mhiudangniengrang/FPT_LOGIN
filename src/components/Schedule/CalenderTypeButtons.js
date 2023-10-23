import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
function CalenderTypeButtons({ activeIndex, handlePrev, handleNext, options }) {
  return (
    <div className="d-flex justify-content-between">
      <Button onClick={handlePrev}>
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
      <Button onClick={handleNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}

export default CalenderTypeButtons;
