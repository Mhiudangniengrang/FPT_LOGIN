import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { useData } from "../../context/DataContext";

import axios from "../../Services/customizeAxios";
import Style from '../../assets/style/dashboard.module.scss'
const RelatedCourse = () => {

    const [loading, isLoading] = useState(true)
    const [related, setRelated] = useState([])
    const { loginUser } = useData()
    const [purpose, setPurpose] = useState(null)
    const [err, setErr] = useState("")

    useEffect(() => {
        axios.get(`/api/v1/students/${loginUser.userId}/subjects/lecturers`
        )
            .then(res => {
                setRelated(res)
                isLoading(false)
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error Status:', error.response.status);
                    if (error.response.data && error.response.data.message) {
                        console.log('Error Message:', error.response.data.message);
                        setErr(error.response.data.message)
                    }
                } else {
                    console.log('Error:', error.message);
                }
                isLoading(false)
            })
    }, [])

    const handleRequest = async (e, subjectId, lecturerId) => {
        e.preventDefault();
        isLoading(true)
        await axios.post(`/api/v1/requests/student/${loginUser.userId}`, {
            lecturerId: lecturerId,
            subjectId: subjectId,
            requestContent: purpose
        }).then(res => {
            isLoading(false)
            window.alert("Send request successfully!")
            console.log(res)
        }).catch(err => {
            isLoading(false)
            console.log(err)
        })
    }
    return (
        <Row>
            {loading ? (
                <Spinner />
            ) : (
                err === "" ? (
                    related.map((course, i) => (
                        <Col key={i} md={4}
                            style={{
                                minHeight: '200px',
                            }}
                        >
                            <div className={`${Style.cardContainer}`}
                            >
                                <Card
                                    className={`${Style.cardSendRequest}`}
                                >
                                    <Card.Body className="border-top">
                                        <Card.Title>{course.subjectId} - {course.subjectName}</Card.Title>
                                        <Card.Text>Instructor: {course.lecturerName}</Card.Text>
                                        <form onSubmit={(e) => handleRequest(e, course.subjectId, course.lecturerId)}>
                                            <label htmlFor="purpose">Purpose</label><span style={{ color: "red" }}>*</span><span>:</span><br></br>
                                            <textarea id='purpose'
                                                rows="4"
                                                maxLength='200'
                                                placeholder='Enter your purpose (200 words)'
                                                style={{
                                                    width: '70%',
                                                    maxHeight: '100px'
                                                }}
                                                onChange={(e) => {
                                                    setPurpose(e.target.value);
                                                }}
                                                required
                                            >
                                            </textarea>
                                            <br></br>
                                            <input type="submit" value={"Send request"}
                                            />
                                            <button
                                            >
                                                <a href={`/student/lecturer/profile/${course.lecturerId}`}>View profile</a>
                                            </button>
                                        </form>
                                    </Card.Body>
                                </Card>
                            </div>

                        </Col>
                    ))
                ) : (
                    <Col
                        style={{
                            minHeight: '200px',
                        }}
                    >
                        {console.log(err)}
                        <div className={`${Style.cardContainer}`}
                        >
                            <p
                                style={{
                                    textAlign: 'center',
                                    margin: 'auto 0'
                                }}
                            >{err}</p>
                        </div>
                    </Col>
                )

            )}
        </Row>
    )
}

export default RelatedCourse