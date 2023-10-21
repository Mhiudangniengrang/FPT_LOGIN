import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory

import L_Layout from "../../Layouts/L_Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  CardBody,
} from "react-bootstrap";

function L_UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    campus: "",
    role: "",
  });
  const history = useHistory(); // Initialize useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chuyển hướng đến trang UserInfo và truyền dữ liệu qua state
    history.push("/l_user_info", { formData: formData });
  };

  return (
    <L_Layout>
      <Container className="py-2">
        <Row className="justify-content-center align-items-center">
          <Col md={5}>
            <div className="py-1 text-center m-0">
              <div className="d-flex align-items-center justify-content-center">
                <FontAwesomeIcon className="h5 px-2" icon={faUser} />
                <h3 className=" ">User Form</h3>
              </div>
            </div>
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Campus</Form.Label>

                    <Form.Control
                      as="select"
                      name="campus"
                      value={formData.campus}
                      onChange={handleChange}
                    >
                      <option value="">Select Campus</option>
                      <option value="FPT_DN">FPT_DN</option>
                      <option value="FPT_HCM">FPT_HCM</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="">Select Role</option>
                      <option value="Student">Student</option>
                      <option value="Lecture">Lecture</option>
                    </Form.Control>
                  </Form.Group>
                  <Button className="my-2" variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </L_Layout>
  );
}

export default L_UserForm;
