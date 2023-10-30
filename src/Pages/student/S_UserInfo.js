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
  FormControl,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import S_Layout from "../../Layouts/S_Layout";
import S_SubjectList from "../../components/SubjectList_userinfo/S_SubjectList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "../../Services/customizeAxios";
function S_UserInfo() {
  const history = useHistory();
  const subjects = [
    { id: 1, name: "SWP391 - Lại Đức Hùng" },
    { id: 2, name: "PRN211 - Nguyễn Thế Hoàng" },
    { id: 3, name: "PRF192 - Lê Thanh Tùng" },
    { id: 4, name: "SWR302 - Đỗ Tấn Nhàn" },
    { id: 5, name: "CSD201 - Thân Văn Sử" },
    { id: 6, name: "CEA201 - Bùi Anh Tuấn" },
    { id: 7, name: "JPD113 - Trần Anh Kiều" },
    { id: 8, name: "JPD123 - Nguyễn Hoàng Hiếu" },
    // Add more subjects here
  ];
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [major, setMajor] = useState("Select Major");
  const [selectedSubjects, setSelectedSubjects] = useState("");
  const [enteredID, setEnteredID] = useState("");

  const [majors, setMajors] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/student/searching/majors")
      .then((response) => {
        setMajors(response);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching majors:", error);
      });
  }, []);
  const handleSearchSubject = async () => {
    const majorId = 2;
    axios
      .get(`/api/v1/student/searching/subjects/major/${majorId}`)

      .then((res) => {
        // res.map((subject) => {
        //   setSelectedSubjects((prev) => [...prev, subject]);
        // });
        console.log(res);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };

  const handleClickSave = () => {
    // Handle saving the selected subjects (e.g., send to server or another component)
    console.log("Selected Subjects:", selectedSubjects);

    // Truyền tên (name) từ formData sang trang S_ViewProfile
    history.push("/student/viewprofile", {
      selectedSubjects: selectedSubjects,
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
  const handleSearch = async (e) => {
    e.preventDefault();
    handleSearchSubject();
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
                        <option
                          key={majorOption.majorId}
                          value={majorOption.majorName}
                        >
                          {majorOption.majorName}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                  <p className="my-3">Your current subjects:</p>
                  <div className="d-flex align-items-center">
                    <FormControl
                      type="text"
                      className="w-75 my-3 "
                      placeholder="Search subjects..."
                      value={selectedSubjects}
                      onChange={(e) => setSelectedSubjects(e.target.value)}
                    />
                    <Button
                      className="mx-1 py-2 text-end"
                      variant="secondary"
                      onClick={handleSearch}
                    >
                      Submit
                    </Button>
                  </div>
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
