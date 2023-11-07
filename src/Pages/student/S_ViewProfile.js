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
import { useHistory } from "react-router-dom";
import { useData, useDataCourse } from "../../context/DataContext";

function S_ViewProfile() {
  const [activeTab, setActiveTab] = useState("course");
  const [name, setName] = useState("");
  const history = useHistory();
  const location = useLocation();
  const selectedSubjectsStr = location.state?.selectedSubjects;

  const { loginUser } = useData();

  const handleUpdateProfile = (updatedData) => {
    history.replace({
      ...location,
      state: updatedData,
    });
  };
  const breadScrumData = [
    {
      route: "/student",
      text: "Home",
    },
    {
      route: "/student/viewprofile",
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
                        {activeTab === "course" && (
                          <S_Course selectedSubjects={selectedSubjectsStr} />
                        )}
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
}

export default S_ViewProfile;
