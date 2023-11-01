import React, { useState, useEffect } from "react";
import data from "../L_Data.json";

import { Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../Services/customizeAxios";
import { useData } from "../context/DataContext";
import Style from "../assets/style/form.module.scss"
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

import { useHistory } from "react-router-dom";

function L_HomeTeacher() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(dayjs()); // Initialize currentDate using Day.js
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = firstIndex + recordsPerPage;
  const [requestSlot, setRequestSlot] = useState([])
  const { setSelectedSlot } = useContext(GlobalContext)
  const { loginUser } = useData()
  console.log(loginUser)
  useEffect(() => {
    axios.get(`/api/v1/requests/lecturer/${loginUser.userId}`)
      .then(res => {
        console.log(res)
        setRequestSlot(res)
      }).catch(error => {
        console.log("Error at lecturer home:", error)
      })
  }, [])
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
    setCurrentPage(1);
  }
  const history = useHistory()
  const handleRequest = (record) => {
    setSelectedSlot(record)
    history.push('lecturer/viewschedule')
  }

  return (
    <div>
      <Tabs
        activeKey={'events'}
        className="mb-3"
      >
        <Tab eventKey="events" title="Events"
        >
          <div
            id="requests"
            style={{
              marginTop: '40px',
              minHeight: '20vh'
            }}
          >
            <div>
              <div
                style={{
                  border: "1px dashed rgb(194 164 164)",
                  marginBottom: '10px'
                }}
              ></div>
              <h3
                style={{
                  paddingBottom: '20px'
                }}>Upcomming Events</h3>
            </div>
            <Card className="text-center">
              <Card.Body>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </div>

          <div id="requests"
            style={{
              marginTop: '40px',
              minHeight: '20vh'
            }}
          >
            <div >
              <div
                style={{
                  border: "1px dashed rgb(194 164 164)",
                  marginBottom: '10px'
                }}
              ></div>
              <h3
                style={{
                  paddingBottom: '20px'
                }}>Requesting Events</h3>
            </div>
            <Card className="text-center">
              <Card.Body>

                <table className="table text-center">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Student's ID</th>
                      <th>Student's name</th>
                      <th>Subject</th>
                      <th>Purpose</th>
                      <th>Request at</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestSlot.map((record, i) => (
                      <tr
                        className={Style.tableRowOnClick}
                        key={i}
                        onClick={() => handleRequest(record)}
                      >
                        <td>{i + 1}</td>
                        <td>{record.studentId}</td>
                        <td>{record.studentName}</td>
                        <td>{record.subjectId}</td>
                        <td>{record.requestContent}</td>
                        <td>{dayjs(record.createAt).format('DD-MM-YYYY')}</td>
                        <td>
                          {record.requestStatus === "PENDING"}
                          <div
                            style={{
                              background: 'rgba(255,255,0,0.7)',
                              color: '#7781ff',
                              fontWeight: '600',
                            }}
                          >Pending</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </div>

        </Tab>
      </Tabs>
    </div >
  );
}

export default L_HomeTeacher;
