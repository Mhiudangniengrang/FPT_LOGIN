import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Row, Col, Stack, Spinner, Pagination } from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../context/DataContext";
import axios from "../../Services/customizeAxios";
import Style from '../../assets/style/dashboard.module.scss'

function Requested() {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [loading, isLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [pageContent, setPageContent] = useState([])
    const [totalPage, setTotalPage] = useState(1)

    const { loginUser } = useData()

    useEffect(async () => {
        isLoading(true)
        await axios.get(`/api/v1/requests/homepage/students/${loginUser.userId}`,
            {
                params: {
                    pageNo: page,
                    pageSize: 4,
                }
            }
        ).then(res => {
            isLoading(false)
            setPageContent(res.content)
            setTotalPage(res.totalPage)
        }).catch(error => {
            isLoading(false)
            console.log("Error at getting request:", error)
        })
    }, [page])

    const handlePageChange = (value) => {
        setPage(value)
    }


    return (

        <div
            id="requests"
            style={{
                marginTop: '40px',
                minHeight: '20vh'
            }}
        >
            <div>
                <div
                    style={{
                        border: "1px dashed rgb(194 164 164)",
                        marginBottom: '10px'
                    }}
                ></div>
                <Stack direction="horizontal"
                    style={{
                        paddingBottom: '20px'
                    }}
                >
                    <h3
                    >Requests</h3>
                </Stack>
            </div>
            {/* 4 items next for next page */}
            <Row>
                {loading ? (
                    <Spinner />
                ) : (
                    pageContent.map((item, i) => (
                        <Col key={i} md={3} className="mb-3">
                            <Card>
                                <Card.Body
                                    className="border-top"
                                    style={{
                                        minWidth: '200px',
                                        maxWidth: '300px',
                                    }}
                                >
                                    <Card.Title>{item.subjectId}</Card.Title>
                                    <Card.Text className="mb-0">
                                        <p>Instructor: {item.lecturerName}</p>
                                        <p> Status: {item.requestStatus}</p>
                                    </Card.Text>
                                    <Card.Subtitle>
                                        <p>Purpose: {item.requestContent}</p>
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
            <div
                style={{
                    textAlign: "center"
                }}
            >

                <Pagination
                    style={{
                        justifyContent: 'center'
                    }}
                >
                    <Button variant="link" onClick={() => setPage(prev => prev - 1)}
                        style={{
                            marginRight: '10px'
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                    {Array.from({ length: totalPage }).map((_, index) => (
                        <Pagination.Item key={index} onClick={() => handlePageChange(index)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Button variant="link" onClick={() => setPage(prev => prev + 1)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </Pagination>
            </div>
        </div>
    );

}

export default Requested
