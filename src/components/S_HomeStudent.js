import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card} from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function S_HomeStudent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(dayjs()); 
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = firstIndex + recordsPerPage;

  function handleRecordsPerPageChange(e) {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  }

  function nextDate() {
    const newDate = currentDate.add(1, "day");
    setCurrentDate(newDate);
    setCurrentPage(1);
  }

  function previousDate() {
    const newDate = currentDate.subtract(1, "day");
    setCurrentDate(newDate);
    setCurrentPage(1);
  }


  return (
    <div>
      <Card className="text-center my-5">
        <Card.Body>
          <div className="d-flex align-items-center">
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

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="secondary" onClick={previousDate}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>{" "}
            <h2>{currentDate.format("dddd, DD/MM/YYYY")}</h2>
            <Button variant="secondary" onClick={nextDate}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
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
          </table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default S_HomeStudent;
