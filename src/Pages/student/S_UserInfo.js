import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import S_Layout from "../../Layouts/S_Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import axios from "../../Services/customizeAxios";
function S_UserInfo() {
  const history = useHistory();
  const [major, setMajor] = useState("Select Major");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [majors, setMajors] = useState([]);
  const [majorId, setMajorId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/student/searching/majors")
      .then((response) => {
        setMajors(response);
        if (response.length > 0) {
          setMajorId(response[0].majorId);
        }
      })
      .catch((error) => {
        console.error("Error fetching majors:", error);
      });
  }, []);

  useEffect(() => {
    if (majorId) {
      axios
        .get(`/api/v1/student/searching/subjects/major/${majorId}`)
        .then((res) => {
          setSelectedSubjects(res);
          // console.log(res);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    }
  }, [majorId]);

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
    const selectedMajor = majors.find(
      (majorOption) => majorOption.majorName === event.target.value
    );
    if (selectedMajor) {
      setMajorId(selectedMajor.majorId);
    }
  };

  const handleClickSave = () => {
    const selectedSubjectsToUpdate = selectedSubjects.filter(
      (subject) => subject.selected
    );

    history.push("/student/viewprofile", {
      selectedSubjects: selectedSubjectsToUpdate,
      name: formData.name,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleClickSubject = (subjectId) => {
    const updatedSubjects = selectedSubjects.map((subject) => {
      if (subject.subjectId === subjectId) {
        return { ...subject, selected: !subject.selected };
      }
      return subject;
    });
    setSelectedSubjects(updatedSubjects);
  };

  return (
    <S_Layout>
      <Container className="py-2">
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <div className="py-1 text-center m-0">
              <div className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon className="h5 px-2" icon={faUser} />
                <h3 className=" ">User Information</h3>
              </div>
            </div>
            <Card className="px-2">
              <CardBody>
                <div>
                  <Form.Group className="d-flex align-items-center">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      className="w-50 mb-2 mx-2"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <FormGroup>
                    <label htmlFor="major">Major:</label>
                    <select
                      className="mx-2"
                      id="major"
                      name="major"
                      value={major}
                      onChange={handleMajorChange}
                    >
                      <option value="Select Major" disabled hidden>
                        Select Major
                      </option>
                      {majors.map((majorOption) => (
                        <option key={majorOption.majorId}>
                          {majorOption.majorName}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                  <p className="my-3">Your current subjects:</p>
                  {selectedSubjects.length > 0 && (
                    <div className="my-3">
                      <strong>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          className="mx-2"
                        />
                        {major}
                      </strong>
                      <div className="my-2">
                        <ListGroup>
                          {selectedSubjects.map((result) => (
                            <ListGroupItem
                              key={result.subjectId}
                              onClick={() =>
                                handleClickSubject(result.subjectId)
                              }
                              style={{
                                background: result.selected
                                  ? "#a9a9a9"
                                  : "transparent",
                              }}
                            >
                              {result.subjectId} - {result.lecturerName}
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </div>
                    </div>
                  )}

                  <Button onClick={handleClickSave}>Save</Button>
                  <Button className="mx-2" variant="secondary">
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </S_Layout>
  );
}

export default S_UserInfo;
