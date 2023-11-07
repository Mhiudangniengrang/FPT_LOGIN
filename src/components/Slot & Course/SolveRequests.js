import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Row, } from "react-bootstrap";
import dayjs from "dayjs";
import axios from "../../Services/customizeAxios";
import { useData } from "../../context/DataContext";
import Style from "../../assets/style/form.module.scss"
import SmallCalendar from "../Schedule/SmallCalendar";

function SolveRequests({ emptySlot }) {
    const [requestSlot, setRequestSlot] = useState([])
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [filter, setFilter] = useState("PENDING")
    const { loginUser } = useData()
    useEffect(() => {
        axios.get(`/api/v1/requests/lecturer/${loginUser.userId}`)
            .then(res => {
                setRequestSlot(res)
            }).catch(error => {
                console.log("Error at lecturer home:", error)
            })
    }, [])



    return (

        <div id="requests"
            style={{
                marginTop: '40px',
                minHeight: '20vh'
            }}
        >
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

                                        (record.requestStatus === filter) && (
                                            <tr
                                                className={`${Style.tableRowOnClick} ${selectedSlot === record ? Style.active : ""}`}
                                                key={i}
                                                onClick={() => selectedSlot === record ? setSelectedSlot(null) : setSelectedSlot(record)}
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
                                                        <button className={Style.approveBtn}>Approve</button>
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
                    {filter === "APPROVED" && (
                        <Card className="text-center">
                            <Card.Body>
                                <SmallCalendar emptySlot={emptySlot} selectedSlot={selectedSlot} />
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </div>

    );
}

export default SolveRequests;
