import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row, Stack, } from "react-bootstrap";
import dayjs from "dayjs";
import axios from "../../Services/customizeAxios";
import { useData } from "../../context/DataContext";
import Style from "../../assets/style/form.module.scss"
import SmallCalendar from "../Schedule/SmallCalendar";
import { ToastContainer, toast } from "react-toastify";

function SolveRequests({ emptySlot }) {
    const [requestSlot, setRequestSlot] = useState([])
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [filter, setFilter] = useState("PENDING")
    const [save, isSaving] = useState(false)
    const [complete, setComplete] = useState(false)
    const [process, setProcess] = useState("")
    const { loginUser } = useData()
    useEffect(() => {
        axios.get(`/api/v1/lecturer/${loginUser.userId}`)
            .then(res => {
                setRequestSlot(res)
            }).catch(error => {
                console.log("Error at lecturer home:", error)
                toast.error(`${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }, [complete])

    const handleApprove = (item, action) => {
        console.log(item)
        isSaving(true)
        axios
            .put(`/api/v1/lecturer/${item.meetingRequestId}/lecturer/${loginUser.userId}`,
                {
                    requestStatus: action
                })
            .then(res => {
                console.log(res)
                toast.success(`Approve successfully`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setComplete(true)
            })
            .catch(error => {
                console.log("Error at approve request", error)
                toast.error(`${error.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }).finally(() => {
                isSaving(false)
            })
    }

    const handleClickSelectedSlot = (item) => {
        console.log(item.requestStatus)
        if (item.requestStatus === "APPROVED") {
            setSelectedSlot(item)
        }
    }
    return (

        <div id="requests"
            style={{
                marginTop: '40px',
                minHeight: '20vh'
            }}
        >
            <ToastContainer />
            <div >
                <div
                    style={{
                        border: "1px dashed rgb(194 164 164)",
                        marginBottom: '10px'
                    }}
                ></div>
                <h3
                    style={{
                        paddingBottom: '20px'
                    }}>Requesting Events</h3>
            </div>
            <Row>
                <Col lg={7}>
                    <Card className="text-center">
                        <Card.Body>
                            <div
                                style={{
                                    textAlign: 'left'
                                }}
                                onClick={() => setSelectedSlot(null)}
                            >
                                <span>Filter by: </span>
                                <select
                                    onChange={e => setFilter(e.target.value)}
                                >
                                    <option value={"PENDING"}>Pending requests</option>
                                    <option value={"APPROVED"}>Approved requests</option>
                                </select>
                            </div>

                            <table className="table text-center">
                                <thead>

                                    <tr>
                                        <th>Student's name</th>
                                        <th>Subject</th>
                                        <th>Purpose</th>
                                        <th>Request at</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestSlot.map((record, i) => (

                                        (record.requestStatus === filter && record.emptySlotId === null) && (
                                            <tr
                                                className={`${Style.tableRowOnClick} ${selectedSlot === record ? Style.active : ""}`}
                                                key={i}
                                                onClick={() => selectedSlot === record ? setSelectedSlot(null) : handleClickSelectedSlot(record)}
                                            >
                                                <td>{record.studentName}</td>
                                                <td>{record.subjectId}</td>
                                                <td>{record.requestContent}</td>
                                                <td>{dayjs(record.createAt).format('DD-MM-YYYY')}</td>
                                                <td>
                                                    <div
                                                        style={{
                                                            background: filter === "PENDING" ? 'rgba(255, 255, 0, 0.5)' : 'rgb(0, 255, 52, 0.5)',
                                                            color: filter === "PENDING" ? '#7781ff' : 'rgb(4, 62, 1)',
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {filter === "PENDING" ? "Pending" : "Approved"}
                                                    </div>
                                                </td>
                                                <td>
                                                    {filter === "PENDING" ? (
                                                        <Stack direction="horizontal" gap={3}>
                                                            <button
                                                                className={Style.approveBtn}
                                                                onClick={() => { !save && handleApprove(record, "APPROVED") }}
                                                            >{save ? "Processing" : "Approve"}</button>
                                                            <button
                                                                className={Style.rejectBtn}
                                                                onClick={() => { !save && handleApprove(record, "REJECTED") }}
                                                            >{save ? "Processing" : "Reject"}</button>
                                                        </Stack>
                                                    ) : null}
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col >
                    {/* {filter === "APPROVED" && ( */}
                    <Card className="text-center">
                        <Card.Body>
                            <SmallCalendar emptySlot={emptySlot} selectedSlot={selectedSlot} />
                        </Card.Body>
                    </Card>
                    {/* )} */}
                </Col>
            </Row>
        </div>

    );
}

export default SolveRequests;
