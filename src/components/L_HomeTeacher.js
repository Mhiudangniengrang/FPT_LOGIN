import React, { useState, useEffect } from "react";
import data from "../L_Data.json"; // Replace with the correct path to your data file
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../Services/customizeAxios"
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function L_HomeTeacher() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(dayjs()); // Initialize currentDate using Day.js
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = firstIndex + recordsPerPage;
  const { accessToken } = useContext(GlobalContext)
  useEffect(() => {
    axios
      .get(`/api/v1/user/userId`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log("Error lecturer home", error);
      });
  }, []);

  const filteredData = data.filter((record) => {
    const recordDate = dayjs(record.date, "DD/MM/YYYY"); // Adjust the date format
    return (
      recordDate.date() === currentDate.date() &&
      recordDate.month() === currentDate.month() &&
      recordDate.year() === currentDate.year()
    );
  });

  const records = filteredData.slice(firstIndex, lastIndex);

  function handleRecordsPerPageChange(e) {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  }

  function nextDate() {
    const newDate = currentDate.add(1, "day");
    setCurrentDate(newDate);
    setCurrentPage(1); // Reset to the first page when changing the date
  }

  function previousDate() {
    const newDate = currentDate.subtract(1, "day");
    setCurrentDate(newDate);
    setCurrentPage(1); // Reset to the first page when changing the date
  }

  return (
    <div>
      <div>
        <Card className="my-2 w-25  ">
          <Card.Header>
            <h3 className="text-lg">
              <FontAwesomeIcon
                className=" mx-2"
                size="1x"
                icon={faCalendarDays}
              />
              Events
            </h3>
          </Card.Header>
        </Card>
        <Container>
          <div className="custom-dashed-line my-3"></div>{" "}
          {/* Add a custom dashed line */}
          <h4>Upcoming events</h4>
          <div className="custom-dashed-line my-3"></div>{" "}
          {/* Add another custom dashed line */}
        </Container>
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
              <h5>{currentDate.format("dddd, DD/MM/YYYY")}</h5>
              <Button variant="secondary" onClick={nextDate}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </div>

            <table className="table text-center">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Student</th>
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
                {records.map((record, i) => (
                  <tr key={i}>
                    <td>{record.no}</td>
                    <td>{record.student}</td>
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

            {/* ... (your pagination code) */}
          </Card.Body>
        </Card>
      </div>
      <Container>
        <div className="custom-dashed-line my-3"></div>{" "}
        {/* Add a custom dashed line */}
        <h4>Requesting events</h4>
        <div className="custom-dashed-line my-3"></div>{" "}
        {/* Add another custom dashed line */}
      </Container>

      <Row>
        <Col xs={8}>
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
                <h5>{currentDate.format("dddd, DD/MM/YYYY")}</h5>
                <Button variant="secondary" onClick={nextDate}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div>


              <table className="table text-center">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, i) => (
                    <tr key={i}>
                      <td>{record.no}</td>
                      <td>{record.student}</td>
                      <td>{record.subject}</td>
                      <td>
                        {" "}
                        {record.status === "Accepted"}
                        <div className="text-success">Accepted</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>

        <Col>

        </Col>
      </Row>



      <hr /> {/* Đường line ngang */}
      {/* Include the L_Requestingevents component */}
    </div>
  );
}

export default L_HomeTeacher;
