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
  Spinner,
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
import { useData } from "../../context/DataContext";
function S_UserInfo() {
  const history = useHistory();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [loading, isLoading] = useState(true);
  const { loginUser } = useData();

  console.log(loginUser);
  useEffect(() => {
    axios
      .get("/api/v1/student/searching/majors")
      .then((response) => {
        setMajors(response);
      })
      .catch((error) => {
        console.error("Error fetching majors:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedMajor) {
      const item = majors.find((major) => major.majorName === selectedMajor);

      console.log(item);

      axios
        .get(`/api/v1/student/searching/subjects/major/${item.majorId}`)
        .then((res) => {
          setSubjects(res);
          // console.log(res);
        })
        .catch((error) => {
          console.error("Error", error);
        })
        .finally(() => {
          isLoading(false);
        });
    }
  }, [selectedMajor]);

  const saveSelectedSubjects = () => {
    try {
      const selectedSubjectsStr = selectedSubjects
        .map((subject) => `${subject.subjectId} - ${subject.lecturerName}`)
      history.push({
        pathname: `/student/viewprofile`,
        state: {
          selectedSubjects: selectedSubjectsStr,
        },
      });
      // console.log(selectedSubjectsStr);
    } catch (err) {
      console.error("Error creating URL:", err);
    }
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
  const handleClickSubject = (item) => {
    setSelectedSubjects((prevSubjects) => {
      if (prevSubjects.includes(item)) {
        return prevSubjects.filter((subject) => subject !== item);
      } else {
        return [...prevSubjects, item];
      }
    });
  };

  const isActive = (item) => {
    if (selectedSubjects.some((subject) => subject === item)) {
      return "active";
    }
    return "";
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
                      value={selectedMajor}
                      onChange={(e) => {
                        setSelectedMajor(e.target.value);
                      }}
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
                  {subjects.length > 0 && (
                    <div className="my-3">
                      <strong>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCalendarDays}
                          className="mx-2"
                        />
                        {selectedMajor.majorName}
                      </strong>
                      <div className="my-2">
                        <ListGroup>
                          {subjects.map((result) => (
                            <ListGroupItem
                              onClick={() => handleClickSubject(result)}
                              className={`${isActive(result)}`}
                            >
                              {result.subjectId} - {result.lecturerName}
                              <FontAwesomeIcon
                                className="mx-2"
                                icon={faCircleCheck}
                              />
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </div>
                    </div>
                  )}

                  <Button onClick={saveSelectedSubjects}>Save</Button>
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
