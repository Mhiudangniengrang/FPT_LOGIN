import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  CardBody,
} from "react-bootstrap";
import S_Aboutme from "../../components/ViewProfile/S_Aboutme";
import S_EditProfile from "../../components/ViewProfile/S_EditProfile";
import S_Course from "../../components/ViewProfile/S_Course";
import S_Layout from "../../Layouts/S_Layout";
import { useLocation } from "react-router-dom";

<<<<<<< HEAD
function S_ViewProfile() {
  const [activeTab, setActiveTab] = useState("aboutMe");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState([]);
=======
import Breadcrumbs from "../../components/BreadcrumpCus";

const breadScrumData = [
  {
    route: '/student_home',
    text: "Home",
  },
  {
    route: '/s_view_profile',
    text: "View Profile",
  },
]

class S_ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "aboutMe",
      description: "", // Initialize description and course in S_ViewProfile state
      course: [],
    };
  }
>>>>>>> 66b06db80497bdd771bf784ab3cda15601803302

  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state && state.selectedSubjects) {
      setCourse(state.selectedSubjects);
    }
  }, [state]);

  const handleUpdateProfile = (description, selectedSubjects) => {
    const course = selectedSubjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
    }));
    setDescription(description);
    setCourse(course);
  };

<<<<<<< HEAD
  return (
    <S_Layout>
      <Container>
        <Row>
          <Col md={4}>
            <Card className="my-2">
              <Card.Header>
                <FontAwesomeIcon icon={faUser} /> View Profile
              </Card.Header>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card className="my-4">
              <Card.Body className="py-2">
                <Row>
                  <Col md={6} className="py-2">
                    <h5>Name:</h5>
                    <p>Duong Minh Hieu(K16-HCM)</p>
                    <h5>Email Address:</h5>
                    <p>hieudmse161153@fpt.edu.vn</p>
                  </Col>
                  <Col md={6}>
                    <Button
                      variant={activeTab === "aboutMe" ? "success" : "dark"}
                      onClick={() => setActiveTab("aboutMe")}
                    >
                      About me
                    </Button>
                    <Button
                      className="px-3 mx-2"
                      variant={activeTab === "course" ? "success" : "dark"}
                      onClick={() => setActiveTab("course")}
                    >
                      Course
                    </Button>
                    <Button
                      variant={activeTab === "editprofile" ? "success" : "dark"}
                      onClick={() => setActiveTab("editprofile")}
                    >
                      Edit profile
                    </Button>
                    <Card className="my-3">
                      <CardBody>
                        {activeTab === "aboutMe" && (
                          <S_Aboutme
                            description={description}
                            course={course}
                          />
                        )}
                        {activeTab === "course" && <S_Course course={course} />}
                        {activeTab === "editprofile" && (
                          <S_EditProfile
                            onUpdateProfile={handleUpdateProfile}
                          />
                        )}
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </S_Layout>
  );
=======
  render() {
    const { activeTab, description, course } = this.state;

    return (
      <S_Layout>
        <Container>
          <Breadcrumbs items={breadScrumData} />
          <Row>
            <Col md={4}>
              <Card className="my-2">
                <Card.Header>
                  <FontAwesomeIcon icon={faUser} /> View Profile
                </Card.Header>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="my-4">
                <Card.Body className="py-2">
                  <Row>
                    <Col md={6} className="py-2">
                      <h5>Name:</h5>
                      <p>Duong Minh Hieu(K16-HCM)</p>
                      <h5>Email Address:</h5>
                      <p>hieudmse161153@fpt.edu.vn</p>
                    </Col>
                    <Col md={6}>
                      <Button
                        variant={activeTab === "aboutMe" ? "success" : "dark"}
                        onClick={() => this.setActiveTab("aboutMe")}
                      >
                        About me
                      </Button>
                      <Button
                        className="px-3 mx-2"
                        variant={activeTab === "course" ? "success" : "dark"}
                        onClick={() => this.setActiveTab("course")}
                      >
                        Course
                      </Button>
                      <Button
                        variant={
                          activeTab === "editprofile" ? "success" : "dark"
                        }
                        onClick={() => this.setActiveTab("editprofile")}
                      >
                        Edit profile
                      </Button>
                      <Card className="my-3">
                        <CardBody>
                          {activeTab === "aboutMe" && (
                            <S_Aboutme
                              description={description}
                              course={course}
                            />
                          )}
                          {activeTab === "course" && (
                            <S_Course course={course} />
                          )}
                          {activeTab === "editprofile" && (
                            <S_EditProfile
                              onUpdateProfile={this.handleUpdateProfile}
                            />
                          )}
                        </CardBody>
                      </Card>
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
>>>>>>> 66b06db80497bdd771bf784ab3cda15601803302
}

export default S_ViewProfile;
