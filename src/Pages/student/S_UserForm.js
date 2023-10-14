import React, { useState } from "react";
import S_Layout from "../../Layouts/S_Layout";
import { Container, Row, Col, Card, Button, Form, CardBody, Accordion } from "react-bootstrap";

function S_UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    campus: "", // Initialize campus
    role: "",   // Initialize role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can access the form data in the formData object.
    console.log(formData);
    // Add your logic to submit the form data or perform other actions.
  };

  return (
    <S_Layout>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
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

                  <Accordion>
                    <Form.Group>
                      <Accordion.Toggle as={Button} eventKey="0">
                        Campus
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Form.Control
                          as="select"
                          name="campus"
                          value={formData.campus}
                          onChange={handleChange}
                        >
                          <option value="">Select Campus</option>
                          <option value="FPT_HCM">FPT HCM</option>
                          <option value="FPT_DN">FPT DN</option>
                        </Form.Control>
                      </Accordion.Collapse>
                    </Form.Group>

                    <Form.Group>
                      <Accordion.Toggle as={Button} eventKey="1">
                        Role
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Form.Control
                          as="select"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="">Select Role</option>
                          <option value="Student">Student</option>
                          <option value="Lecture">Lecturer</option>
                        </Form.Control>
                      </Accordion.Collapse>
                    </Form.Group>
                  </Accordion>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </S_Layout>
  );
}

export default S_UserForm;
