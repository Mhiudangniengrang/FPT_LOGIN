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
import S_EditProfile from "../../components/ViewProfile/S_EditProfile";
import S_Layout from "../../Layouts/S_Layout";
import { useLocation } from "react-router-dom";
import S_Course from "../../components/ViewProfile/S_Course";

function S_ViewProfile() {
  const [activeTab, setActiveTab] = useState("course");
  const [course, setCourse] = useState([]);
  const [name, setName] = useState(""); // Tên người dùng

  const location = useLocation();
  const state = location.state; // Initialize the state variable

  useEffect(() => {
    if (state && state.name) {
      // Kiểm tra xem có tên (name) trong location.state hay không
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
      route: "/student_home",
      text: "Home",
    },
    {
      route: "/s_view_profile",
      text: "View Profile",
    },
  ];

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
                    <p>{name || "Write a name here."}</p>
                    <h5>Email Address:</h5>
                    <p>hieudmse161153@fpt.edu.vn</p>
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
                        {activeTab === "course" && <S_Course course={course} />}
                        {activeTab === "editprofile" && (
                          <S_EditProfile
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
    </S_Layout>
  );
}

export default S_ViewProfile;
