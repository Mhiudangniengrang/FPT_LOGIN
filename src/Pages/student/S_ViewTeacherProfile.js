import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Card, Button, CardBody } from "react-bootstrap";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import S_Layout from "../../Layouts/S_Layout";
class S_ViewTeacherProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "aboutMe", // Initial active tab is About Me
    };
  }

  setActiveTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <S_Layout>
        <Container>
          <Row>
            <Col md={4}>
              <Card className="my-2">
                <Card.Header>
                  <FontAwesomeIcon icon={faUser} /> View Teacher Profile
                </Card.Header>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="my-4 ">
                <Card.Body className="py-2 ">
                  <Row>
                    <Col md={6}>
                      <div>
                        <h5>Lecturer ID:</h5>
                        <p>HungLD</p>
                        <h5>Name:</h5>
                        <p>Lai Duc Hung</p>
                        <h5>Email Address:</h5>
                        <p>hungld@fe.fpt.vn</p>
                      </div>
                    </Col>

                    <Col md={6}>
                      <Button
                        variant="warning"
                        onClick={() => this.setActiveTab("aboutMe")}
                      >
                        About me
                      </Button>
                      <div className="my-2 ">
                        <Card>
                          <CardBody>
                            <h5>About me</h5>
                            <strong>Description:</strong>
                            <p>
                              {" "}
                              Write a brief introduction about yourself here.
                            </p>

                            <div>
                              <h5 className="font-weight-bold">Course</h5>

                              <strong>Course Profile:</strong>

                              <div>
                                <div
                                  style={{
                                    float: "left",
                                    width: "50%",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faBriefcase} /> CSI104
                                  - Introduction to Computing
                                  <br />
                                  <FontAwesomeIcon icon={faBriefcase} /> SWT301
                                  - Software Testing
                                  <br />
                                  <FontAwesomeIcon icon={faBriefcase} /> SWE102
                                  - Introduction to Software Engineering
                                </div>
                                <div
                                  style={{
                                    float: "left",
                                    width: "50%",
                                    paddingTop: "10px",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faBriefcase} /> SWR301
                                  - Software Requirement
                                  <br />
                                  <FontAwesomeIcon icon={faBriefcase} /> SWP391
                                  - Application Development Project
                                  <br />
                                  <FontAwesomeIcon icon={faBriefcase} /> CEA201
                                  - Computer Organization and Architecture
                                </div>
                              </div>
                            </div>
                            <div>
                              <p>
                                {" "}
                                <a
                                  href="/lecturer/teachingschedule"
                                  className="schedule-link text-black "
                                >
                                  Go to teaching schedule
                                </a>
                              </p>
                              <p>
                                <a
                                  href="/lecturer/meetingschedule"
                                  className="schedule-link text-black"
                                >
                                  Go to meeting schedule{" "}
                                </a>
                              </p>
                            </div>
                            <div>
                              {" "}
                              <Button variant="primary">Book Slot</Button>
                              <Button className="mx-2" variant="primary">
                                Send Request
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </S_Layout>
    );
  }
}

export default S_ViewTeacherProfile;
