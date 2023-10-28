import React, { useContext, useEffect, useState } from "react";
import data from "../S_Data.json"; // Replace with the correct path to your data file
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Card, Row, Col, Tab, Tabs, Stack } from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import axios from "../Services/customizeAxios";
import GlobalContext from "../context/GlobalContext";

function S_HomeStudent() {

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
  const relatedCourses = [
    {
      id: 1,
      name: "PRN211-Lập trình Cross-Platform với .Net",
      instructor: "SWP391-Lai Duc Hung",
    },
    {
      id: 2,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },
    {
      id: 3,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },
    {
      id: 4,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },
    {
      id: 5,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },
    {
      id: 6,
      name: "PRN212-React Hooks và React-Bootstrap",
      instructor: "John Doe",
    },

    // Thêm các khóa học khác tại đây
  ];
  const history = useHistory();
  const handleClickProfile = () => {
    history.push("/lecturer/viewprofile");
  };
  return (
    <div>
      <Tabs
        activeKey={'events'}
        className="mb-3"
      >
        <Tab eventKey="events" title="Events">
          <div
            id="booked_slot"
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
                }}>Booked slot</h3>
            </div>
            <Card className="text-center"
            >

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
                  <tbody>
                    {records.length > 0 && (
                      records.map((record, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
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
                      )))}
                    {records.length == 0 && (
                      <tr>
                        <td colSpan={9}>
                          <div
                            style={{
                              margin: '100px',
                              textAlign: 'center'
                            }}
                          >There are no events in this day yet.
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* ... (your pagination code) */}
              </Card.Body>
            </Card>
          </div>

          <div
            id="requested_slot"
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
                >Requested slot</h3>
                <div className="ms-auto">
                  <Button variant="secondary">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Button>{" "}
                  <Button variant="secondary" >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                </div>
              </Stack>
            </div>
            {/* 4 items next for next page */}
            <Row>

              <Col>
                <Card>
                  <Card.Body className="pt-5 border-top"
                    style={{
                      minWidth: '200px',
                      maxWidth: '300px'
                    }}
                  >
                    <Card.Title>Ngu</Card.Title>
                    <Stack direction="horizontal" className="mb-3">
                      <Card.Text className="mb-0">Instructor: </Card.Text>
                      <Card.Text
                        className="ms-auto"
                      >Status: </Card.Text>
                    </Stack>
                    <Card.Subtitle>
                      <p>Purpose: aosdbaosdbaosdaosidbaosidboasidbaosdibiasbdoasdb asojdbaisudhaisudh isuahd iasuhd iasuh isauh diaush iduash idaushid ahsi dhaiudh aius</p>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="pt-5 border-top"
                    style={{
                      minWidth: '200px',
                      maxWidth: '300px'
                    }}
                  >
                    <Card.Title>Ngu</Card.Title>
                    <Card.Text>Instructor:</Card.Text>
                    <Card.Subtitle>
                      <p>Purpose: aosdbaosdbaosdaosidbaosidboasidbaosdibiasbdoasdb asojdbaisudhaisudh isuahd iasuhd iasuh isauh diaush iduash idaushid ahsi dhaiudh aius</p>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="pt-5 border-top"
                    style={{
                      minWidth: '200px',
                      maxWidth: '300px'
                    }}
                  >
                    <Card.Title>Ngu</Card.Title>
                    <Card.Text>Instructor: </Card.Text>
                    <Card.Subtitle>
                      <p>Purpose: aosdbaosdbaosdaosidbaosidboasidbaosdibiasbdoasdb asojdbaisudhaisudh isuahd iasuhd iasuh isauh diaush iduash idaushid ahsi dhaiudh aius</p>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Body className="pt-5 border-top"
                    style={{
                      minWidth: '200px',
                      maxWidth: '300px'
                    }}
                  >
                    <Card.Title>Ngu</Card.Title>
                    <Card.Text>Instructor:</Card.Text>
                    <Card.Subtitle>
                      <p>Purpose: aosdbaosdbaosdaosidbaosidboasidbaosdibiasbdoasdb asojdbaisudhaisudh isuahd iasuhd iasuh isauh diaush iduash idaushid ahsi dhaiudh aius</p>
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

          </div>
        </Tab>
      </Tabs>

      <Tabs
        activeKey={"related"}
        className="mb-3"
      >
        <Tab eventKey="related" title="Related Courses">
          <Row>
            {relatedCourses.map((course) => (
              <Col key={course.id} md={4}>
                <Card
                  className="my-2"
                  style={{ width: "100%", paddingTop: "100px" }}
                  onClick={handleClickProfile}
                >
                  <Card.Body className="pt-5 border-top">
                    <Card.Title>{course.name}</Card.Title>
                    <Card.Text>Instructor: {course.instructor}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
}

export default S_HomeStudent;
