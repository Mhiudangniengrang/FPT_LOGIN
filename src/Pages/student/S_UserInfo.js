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
import S_Layout from "../../Layouts/S_Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../../Services/customizeAxios";
import { useData } from "../../context/DataContext";
import { toast } from "react-toastify";
function S_UserInfo() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [loading, isLoading] = useState(true);
  const { loginUser } = useData();
  const navigate = useNavigate();

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
          console.log(res);
        })
        .catch((error) => {
          console.error("Error", error);
        })
        .finally(() => {
          isLoading(false);
        });
    }
  }, []);

  const saveSubjects = async () => {
    try {
      const selectedSubjectsData = selectedSubjects.map((subject) => ({
        lecturerId: subject.lecturerId,
        studentId: loginUser.userId,
        subjectId: subject.subjectId,
      }));
      await axios.post(
        "/api/v1/students/profile/subject",
        selectedSubjectsData
      );
      console.log(selectedSubjectsData);
      toast.success("Save information success");
      navigate("/student/viewprofile", selectedSubjectsData);
    } catch (err) {
      console.error("Error creating URL:", err);
      toast.error(err.response.data.message);
    }
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
                  <Form.Label>Your Name: {loginUser.userName}</Form.Label>

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
                      <option value="" disabled selected>
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
                        {selectedMajor}
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

                  <Button onClick={saveSubjects}>Save</Button>
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
