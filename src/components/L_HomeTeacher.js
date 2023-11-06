import React, { useState, useEffect } from "react";

import { Spinner, Tab, Tabs } from "react-bootstrap";
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

import SolveRequests from "./Slot & Course/SolveRequests";

function L_HomeTeacher() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [bookedSlot, setBookedSlot] = useState([])
  const [filteredSlot, setFilteredSlot] = useState([])
  const [loading, isLoading] = useState(true)
  const { setSelectedSlot } = useContext(GlobalContext)
  const { loginUser } = useData()

  useEffect(() => {
    axios.get(`/api/v1/user/emptySlot/lecturer/${loginUser.userId}`)
      .then(res => {
        setBookedSlot(res)
      }).catch(error => {
        console.log("Error at lecturer home:", error)
      }).finally(() => {
        isLoading(false)
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


  return (
    <div>
      <Tabs
        activeKey={'events'}
        className="mb-3"
      >
        <Tab eventKey="events" title="Events"
        >
          <div id="upcomming"
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

          <SolveRequests emptySlot={bookedSlot} />

        </Tab>
      </Tabs>
    </div >
  );
}

export default L_HomeTeacher;
