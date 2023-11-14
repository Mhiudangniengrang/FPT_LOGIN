import React, { useContext, useEffect, useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import StudentOverlay from "../Schedule/StudentOverlay";

function Requested() {
    const [loading, isLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [pageContent, setPageContent] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const { setSelectedSlot, setShowSlotModal, showSlotModal } = useContext(GlobalContext)
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
            console.log(res.content)
            setPageContent(res.content)
            setTotalPage(res.totalPage)
        }).catch(error => {
            toast.update(`${error.message}`);

            isLoading(false)
            console.log("Error at getting request:", error)
        })
    }, [page])

    const handlePageChange = (value) => {
        setPage(value)
    }

    const handleDelete = (item) => {
        console.log(item)
        const id = toast.loading("Delete request...")
        axios
            .delete(`/api/v1/requests/${item.meetingRequestId}/student/${loginUser.userId}`)
            .then(res => {
                console.log(res)
                toast.update(id, { render: "Delete successfully", type: "success", isLoading: false, autoClose: true });
            }).catch(error => {
                console.log("error at cancel request", error)
                toast.update(id, { render: `${error.response.data.message}`, type: "error", isLoading: false, autoClose: true });
            })
    }
    const navigate = useNavigate()
    const handleSeeDetail = (item) => {
        console.log(item)
        navigate("/student/viewschedule")
    }
    return (

        <div
            id="requests"
            style={{
                marginTop: '40px',
                minHeight: '20vh'
            }}
        >
            {showSlotModal && <StudentOverlay />}
            <ToastContainer />
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
            <Row>
                {loading ? (
                    <Spinner style={{ margin: '40px auto' }} />
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
                                    <div className="mb-0">
                                        <p>Instructor: {item.lecturerName}</p>
                                        <p> Status: <span
                                            style={{
                                                padding: '5px 10px',
                                                borderRadius: '10px',
                                                textTransform: 'lowercase',
                                                fontWeight: '600',
                                                backgroundColor: (() => {
                                                    if (item.requestStatus === "PENDING") {
                                                        return "rgba(255, 222, 16, 0.8)";
                                                    } else if (item.requestStatus === "APPROVED") {
                                                        return "#07d730";
                                                    } else {
                                                        return "rgba(255, 15, 0, 0.8)";
                                                    }
                                                })(),
                                            }}
                                        >
                                            {item.requestStatus}
                                        </span>
                                        </p>
                                    </div>
                                    <Card.Subtitle>
                                        <p style={{ fontWeight: 'normal' }}>Purpose: {item.requestContent}</p>
                                    </Card.Subtitle>
                                    {item.requestStatus === "PENDING" && (
                                        <Stack direction="horizontal" gap={3}>

                                            <button
                                                className={Style.button} id={Style.cancel}
                                                onClick={() => handleDelete(item)}
                                            >Cancel</button>
                                            <button className={Style.button} id={Style.update}>Update</button>
                                        </Stack>
                                    )}
                                    {item.requestStatus === "APPROVED" && item.emptySlotId !== null && (
                                        <Stack direction="horizontal" gap={3}>

                                            <button
                                                className={Style.button} id={Style.seeDetail}
                                                onClick={() => handleSeeDetail(item)}
                                            >See slot detail</button>
                                        </Stack>
                                    )}
                                    {item.requestStatus === "APPROVED" && item.emptySlotId === null && (
                                        <span
                                            style={{
                                                color: 'red',
                                                fontSize: '12px'
                                            }}
                                        >Please wait for your lecturer assign to empty slot</span>
                                    )}
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
                        <Pagination.Item key={index} onClick={() => handlePageChange(index)}
                            active={page === index}
                        >
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
