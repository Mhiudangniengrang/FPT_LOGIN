import React, { useContext, useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Row, Col, Tab, Tabs, Stack, Spinner, Pagination } from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "../context/DataContext";
import axios from "../Services/customizeAxios";
import Style from '../assets/style/dashboard.module.scss'
import RelatedCourse from "./RealatedCourse";

function S_HomeStudent() {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Initialize currentDate using Day.js
  const [loading, isLoading] = useState(true)
  const [bookedSlot, setBookedSlot] = useState([])
  const [filteredSlot, setFilteredSlot] = useState([])
  const [page, setPage] = useState(0)
  const [pageContent, setPageContent] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const { loginUser } = useData()

  useEffect(() => {
    axios.get(`/api/v1/students/bookedSlot/homePage/${loginUser.userId}`
    )
      .then(res => {
        isLoading(false)
        setBookedSlot(res)
      })
      .catch(error => {
        isLoading(false)
        console.log("error at getting booked slot: " + error)
      })
  }, [])

  useEffect(async () => {
    isLoading(true)
    await axios.get(`/api/v1/requests/homepage/students/${loginUser.userId}`,
      {
        params: {
          pageNo: page,
          pageSize: 4,
        }
      }
    ).then(res => {
      isLoading(false)
      console.log(res.content)
      setPageContent(res.content)
      setTotalPage(res.totalPage)
    }).catch(error => {
      isLoading(false)
      console.log("Error at getting request:", error)
    })
  }, [page])

  useEffect(() => {
    setFilteredSlot(getFilterBookedSlot)
  }, [currentDate])

  const getFilterBookedSlot = () => {
    const date = dayjs(currentDate).format("YYYY-MM-DD")
    const matchingSlots = bookedSlot.reduce((accumulator, slot) => {
      if (slot.dateStart === date) {
        return [...accumulator, slot];
      }
      return accumulator;
    }, []);
    return matchingSlots;
  }

  // const getFilterRequestedSlot = () => {
  //   const date = dayjs(currentDate).format("YYYY-MM-DD")
  //   const matchingSlots = bookedSlot.reduce((accumulator, slot) => {
  //     if (slot.dateStart === date) {
  //       return [...accumulator, slot];
  //     }
  //     return accumulator;
  //   }, []);
  //   return matchingSlots;
  // }

  console.log(filteredSlot)

  function nextDate() {
    const newDate = currentDate.add(1, "day");
    setCurrentDate(newDate);
  }

  function previousDate() {
    const newDate = currentDate.subtract(1, "day");
    setCurrentDate(newDate);
  }

  const handlePageChange = (value) => {
    setPage(value)
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
            id="booked_slot" >
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
                }}>Booked slot</h3>
            </div>
            <Card className="text-center"
              style={{
                minHeight: '40vh'
              }}
            >

              <Card.Body>

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
                  {loading ? (
                    <Spinner />
                  ) : (
                    <tbody>
                      {filteredSlot.length > 0 ? (
                        filteredSlot.map((record, i) => {
                          console.log(record);
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{record.lecturerName}</td>
                              <td>{record.dateStart}</td>
                              <td>{record.timeStart}</td>
                              <td>{record.slotTimeId}</td>
                              <td>{record.roomId}</td>
                              <td>{record.subjectId}</td>
                              <td>{record.duration}</td>
                              <td>
                                {record.status === "BOOKED" ? (
                                  <div className="text-success">Booked</div>
                                ) : (
                                  "Some other status"
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={9}>
                            <div
                              style={{
                                margin: '100px',
                                textAlign: 'center'
                              }}
                            >
                              There are no events in this day yet.
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  )}
                </table>

                {/* ... (your pagination code) */}
              </Card.Body>
            </Card>
          </div>

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
                  border: "2px dashed rgb(194 164 164)",
                  marginBottom: '10px'
                }}
              ></div>
              <Stack direction="horizontal"
                style={{
                  paddingBottom: '20px'
                }}
              >
                <h3
                >Requests</h3>
              </Stack>
            </div>
            {/* 4 items next for next page */}
            <Row>
              {loading ? (
                <Spinner />
              ) : (
                pageContent.map((item, i) => (
                  <Col key={i} md={3} className="mb-3">
                    <Card>
                      <Card.Body
                        className="pt-5 border-top"
                        style={{
                          minWidth: '200px',
                          maxWidth: '300px',
                        }}
                      >
                        <Card.Title>{item.subjectId}</Card.Title>
                        <Card.Text className="mb-0">
                          <p>Instructor: {item.lecturerName}</p>
                          <p> Status: {item.requestStatus}</p>
                        </Card.Text>
                        <Card.Subtitle>
                          <p>Purpose: {item.requestContent}</p>
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
            <div
              style={{
                textAlign: "center"
              }}
            >
              <Button variant="secondary" onClick={() => setPage(prev => prev - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Button>

              <Pagination>
                {Array.from({ length: totalPage }).map((_, index) => (
                  <Pagination.Item key={index} onClick={() => handlePageChange(index)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
              <Button variant="secondary" onClick={() => setPage(prev => prev + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Button>
            </div>
          </div>
        </Tab>
      </Tabs>

      <Tabs
        activeKey={"related"}
        className="mb-3"
      >
        <Tab eventKey="related" title="Related Courses">
          <RelatedCourse />
        </Tab>
      </Tabs>
    </div >
  );
}

export default S_HomeStudent;
