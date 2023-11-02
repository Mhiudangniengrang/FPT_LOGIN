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
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [requestSlot, setRequestSlot] = useState([])
  const [bookedSlot, setBookedSlot] = useState([])
  const [filteredSlot, setFilteredSlot] = useState([])
  const [filter, setFilter] = useState("PENDING")
  const { setSelectedSlot } = useContext(GlobalContext)
  const { loginUser } = useData()
  useEffect(() => {
    axios.get(`/api/v1/requests/lecturer/${loginUser.userId}`)
      .then(res => {
        console.log(res)
        setRequestSlot(res)
      }).catch(error => {
        console.log("Error at lecturer home:", error)
      })
  }, [])
  useEffect(() => {
    axios.get(`/api/v1/user/emptySlot/lecturer/${loginUser.userId}`)
      .then(res => {
        setBookedSlot(res)
      }).catch(error => {
        console.log("Error at lecturer home:", error)
      })
  }, [])
  useEffect(() => {
    setFilteredSlot(getFilterBookedSlot)
  }, [currentDate, bookedSlot])
  const getFilterBookedSlot = () => {
    const date = dayjs(currentDate).format("YYYY-MM-DD")
    const matchingSlots = bookedSlot.reduce((accumulator, slot) => {
      if (slot.dateStart === date && slot.status === "BOOKED") {
        return [...accumulator, slot];
      }
      return accumulator;
    }, []);
    return matchingSlots;
  }


  function nextDate() {
    const newDate = currentDate.add(1, "day");
    setCurrentDate(newDate);
  }

  function previousDate() {
    const newDate = currentDate.subtract(1, "day");
    setCurrentDate(newDate);
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
                    {console.log(filteredSlot)}
                    {filteredSlot.map((record, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{record.studentName}</td>
                        <td>{record.dateStart}</td>
                        <td>{record.timeStart}</td>
                        <td>{record.slotTimeId}</td>
                        <td>{record.roomId}</td>
                        <td>{record.subjectId}</td>
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

                <div
                  style={{
                    textAlign: 'left'
                  }}
                >
                  <span>Filter by: </span>
                  <select
                    onChange={e => setFilter(e.target.value)}
                  >
                    <option value={"PENDING"}>Pending requests</option>
                    <option value={"APPROVED"}>Approved requests</option>
                  </select>
                </div>

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

                      (record.requestStatus === filter) && (
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
                          {filter === "PENDING" ? (
                            <td>
                              <div
                                style={{
                                  background: 'rgba(255,255,0,0.5)',
                                  color: '#7781ff',
                                  fontWeight: '600',
                                }}
                              >Pending</div>

                            </td>
                          ) : (
                            <td>
                              <div
                                style={{
                                  background: 'rgb(0 255 52 / 50%)',
                                  color: 'rgb(4 62 1)',
                                  fontWeight: '600',
                                }}
                              >Approved</div>
                            </td>

                          )}
                        </tr>
                      )
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
