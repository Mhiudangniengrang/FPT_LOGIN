import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { useData } from "../context/DataContext";

import { useHistory } from "react-router-dom";
import axios from "../Services/customizeAxios";
import Style from '../assets/style/dashboard.module.scss'
import GlobalContext from "../context/GlobalContext";
const RelatedCourse = () => {

    const [loading, isLoading] = useState(true)
    const [related, setRelated] = useState([])
    const { loginUser } = useData()
    const [purpose, setPurpose] = useState(null)
    const { setLecturerId } = useContext(GlobalContext)

    useEffect(() => {
        axios.get(`/api/v1/students/${loginUser.userId}/subjects/lecturers`
        )
            .then(res => {
                isLoading(false)
                setRelated(res)
            })
            .catch(error => {
                isLoading(false)
                console.log("error at getting booked slot: " + error)
            })
    }, [])

    const history = useHistory();
    const handleClickProfile = (course) => {
        setLecturerId(course.lecturerId)
        sessionStorage.setItem("lecturerId", course.lecturerId)
        history.push("/student/search/profileteacher");
    };

    const handleRequest = async (subjectId, lecturerId) => {

        await axios.post(`/api/v1/requests/student/${loginUser.userId}`, {
            lecturerId: lecturerId,
            subjectId: subjectId,
            requestContent: purpose
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <Row>
            {loading ? (
                <Spinner />
            ) : (
                related.map((course, i) => (
                    <Col key={i} md={4}
                        style={{
                            minHeight: '230px',
                        }}
                    >
                        <div className={`${Style.cardContainer}`}
                        >
                            <Card
                                className={`${Style.cardSendRequest}`}
                            // Pass the course to the function
                            >
                                <Card.Body className="border-top">
                                    <Card.Title>{course.subjectId} - {course.subjectName}</Card.Title>
                                    <Card.Text>Instructor: {course.lecturerName}</Card.Text>
                                    <form onSubmit={() => handleRequest(course.subjectId, course.lecturerId)}>
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
                                            onClick={() => handleClickProfile(course)}
                                        >View profile</button>
                                    </form>
                                </Card.Body>
                            </Card>
                        </div>

                    </Col>
                ))
            )}

        </Row>
    )
}

export default RelatedCourse