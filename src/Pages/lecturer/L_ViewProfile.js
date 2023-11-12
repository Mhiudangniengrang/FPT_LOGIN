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
import L_EditProfile from "../../components/ViewProfile/L_EditProfile";
import L_Layout from "../../Layouts/L_Layout";
import { useLocation } from "react-router-dom";
import L_Course from "../../components/ViewProfile/L_Course";
import { useData } from "../../context/DataContext";

function L_ViewProfile() {
  const [activeTab, setActiveTab] = useState("course");
  const [course, setCourse] = useState([]);
  const [name, setName] = useState("");
  const { loginUser } = useData()
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    if (state && state.name) {

      setName(state.name);
    }

    // Cập nhật các thông tin khác
    if (state && state.selectedSubjects) {
      setCourse(state.selectedSubjects);
    }
  }, [state]);
  const handleUpdateProfile = (selectedSubjects) => {
    const course = selectedSubjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
    }));

    setCourse(course);
  };
  const breadScrumData = [
    {
      route: "/lecturer_home",
      text: "Home",
    },
    {
      route: "/l_view_profile",
      text: "View Profile",
    },
  ];

  return (
    <L_Layout>
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
                    <p>{loginUser.userName}</p>
                    <h5>Email Address:</h5>
                    <p>{loginUser.email}</p>{" "}
                  </Col>
                  <Col md={6}>
                    <Button
                      className="mx-2"
                      variant={activeTab === "course" ? "warning" : "secondary"}
                      onClick={() => setActiveTab("course")}
                    >
                      Course
                    </Button>

                    <Button
                      variant={
                        activeTab === "editprofile" ? "warning" : "secondary"
                      }
                      onClick={() => setActiveTab("editprofile")}
                    >
                      Edit profile
                    </Button>
                    <Card className="my-3">
                      <CardBody>
                        {activeTab === "course" && <L_Course course={course} />}
                        {activeTab === "editprofile" && (
                          <L_EditProfile
                            onUpdateName={(newName) => setName(newName)}
                            currentName={name}
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
    </L_Layout>
  );
}

export default L_ViewProfile;
