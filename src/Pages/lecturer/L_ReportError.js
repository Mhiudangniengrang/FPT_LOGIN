import React, { useState } from "react";
import { Form, Button, Card, CardBody, Row, Col } from "react-bootstrap";
import { useData } from "../context/DataContext";
import axios from "../Services/customizeAxios";
import L_Layout from "../../Layouts/L_Layout";

const L_ReportError = () => {
    const [description, setDescription] = useState("");
    const [select, setSelect] = useState("");
    const { loginUser } = useData();
    const userId = loginUser.userId;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `/api/v1/report-error/user/${userId}`,
                null,
                {
                    params: {
                        reportError: select,
                    },
                }
            );

            console.log("Report submitted successfully", response);

            //   setDescription("");
            setSelect(response);
        } catch (error) {
            console.error("Error submitting report", error);
        }
    };

    return (
        <L_Layout>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <CardBody>
                            <Form>
                                <h3>Report an Error</h3>
                                <Form.Label>Your Name : {loginUser.userName}</Form.Label>
                                <Form.Group>
                                    <Form.Label>Select Error</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={select}
                                        onChange={(e) => setSelect(e.target.value)}
                                    >
                                        <option>Bug</option>
                                        <option>Send Request</option>
                                        <option>Update Profile</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    style={{ marginTop: "10px" }}
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </L_Layout>
    );
};

export default L_ReportError;