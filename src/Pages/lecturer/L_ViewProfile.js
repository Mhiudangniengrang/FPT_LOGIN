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
import L_Aboutme from "../../components/ViewProfile/L_Aboutme";
import L_EditProfile from "../../components/ViewProfile/L_EditProfile";
import L_Course from "../../components/ViewProfile/L_Course";
import L_Layout from "../../Layouts/L_Layout";
import { useLocation } from "react-router-dom";

function L_ViewProfile() {
  const [activeTab, setActiveTab] = useState("aboutMe");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState([]);

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
                    <p>Hungld FU HCM Lại Đức Hùng</p>
                    <h5>Email Address:</h5>
                    <p>HungLD@fpt.edu.vn</p>
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
                          <L_Aboutme
                            description={description}
                            course={course}
                          />
                        )}
                        {activeTab === "course" && <L_Course course={course} />}
                        {activeTab === "editprofile" && (
                          <L_EditProfile
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
