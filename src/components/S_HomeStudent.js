import React, { useState, useEffect } from "react";
import data from "../S_Data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function S_HomeStudent() {
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
    <div>
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

      <Card className="text-center my-5">
        <Card.Body>
          <div className="d-flex align-items-center ">
            Show{" "}
            <Form.Select
              className="w-25"
              aria-label="Default select example"
              as="select"
              size="sm"
              onChange={handleRecordsPerPageChange}
              value={recordsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Form.Select>{" "}
            entries
          </div>

          <table className="table text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Lecture</th>
                <th>Date</th>
                <th>Time Start</th>
                <th>Slot</th>
                <th>Room</th>
                <th>Subject</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, i) => (
                <tr key={i}>
                  <td>{record.no}</td>
                  <td>{record.lecture}</td>
                  <td>{record.date}</td>
                  <td>{record.timestart}</td>
                  <td>{record.slot}</td>
                  <td>{record.room}</td>
                  <td>{record.subject}</td>
                  <td>{record.duration}</td>
                  <td>
                    {" "}
                    {record.status === "Accepted"}
                    <div className="text-success">Accepted</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prePage}>
                  Prev
                </a>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default S_HomeStudent;
