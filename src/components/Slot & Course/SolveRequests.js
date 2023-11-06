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
                                                {filter === "PENDING" ? (
                                                    <td>
                                                        <div
                                                            style={{
                                                                background: 'rgba(255,255,0,0.5)',
                                                                color: '#7781ff',
                                                                fontWeight: '600',
                                                            }}
                                                        >Pending</div>

                                                    </td>
                                                ) : (
                                                    <td>
                                                        <div
                                                            style={{
                                                                background: 'rgb(0 255 52 / 50%)',
                                                                color: 'rgb(4 62 1)',
                                                                fontWeight: '600',
                                                            }}
                                                        >Approved</div>
                                                    </td>
                                                )}
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col >
                    <Card className="text-center">
                        <Card.Body>
                            {filter === "PENDING" && (
                                <SmallCalendar emptySlot={emptySlot} selectedSlot={selectedSlot} />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>

    );
}

export default SolveRequests;
