import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../context/DataContext";
import axios from "../../Services/customizeAxios";
import Style from '../../assets/style/dashboard.module.scss'

function BookedSlot() {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [loading, isLoading] = useState(true)
    const [bookedSlot, setBookedSlot] = useState([])
    const [filteredSlot, setFilteredSlot] = useState([])

    const { loginUser } = useData()

    useEffect(() => {
        axios.get(`/api/v1/students/bookedSlot/homePage/${loginUser.userId}`
        )
            .then(res => {
                isLoading(false)
                setBookedSlot(res)
            })
            .catch(error => {
                isLoading(false)
                console.log("error at getting booked slot: " + error)
            })
    }, [])

    useEffect(() => {
        setFilteredSlot(getFilterBookedSlot)
    }, [currentDate, bookedSlot])

    function nextDate() {
        const newDate = currentDate.add(1, "day");
        setCurrentDate(newDate);
    }

    function previousDate() {
        const newDate = currentDate.subtract(1, "day");
        setCurrentDate(newDate);
    }

    const getFilterBookedSlot = () => {
        const date = dayjs(currentDate).format("YYYY-MM-DD")
        const matchingSlots = bookedSlot.reduce((accumulator, slot) => {
            if (slot.dateStart === date) {
                return [...accumulator, slot];
            }
            return accumulator;
        }, []);
        return matchingSlots;
    }
    return (
        <div
            id="booked_slot" >
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
                    }}>Booked slot</h3>
            </div>
            <Card className="text-center"
                style={{
                    minHeight: '40vh'
                }}
            >

                <Card.Body>

                    <div className="d-flex justify-content-between align-items-center">
                        <Button variant="secondary" onClick={previousDate}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Button>{" "}
                        <h2>{dayjs(currentDate).format("dddd, DD/MM/YYYY")}</h2>
                        <Button variant="secondary" onClick={nextDate}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </Button>
                    </div>

                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Lecture</th>
                                <th>Date</th>
                                <th>Time Start</th>
                                <th>Slot</th>
                                <th>Room</th>
                                <th>Subject</th>
                                <th>Duration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <tbody>
                                {filteredSlot.length > 0 ? (
                                    filteredSlot.map((record, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{record.lecturerName}</td>
                                                <td>{record.dateStart}</td>
                                                <td>{record.timeStart}</td>
                                                <td>{record.slotTimeId}</td>
                                                <td>{record.roomId}</td>
                                                <td>{record.subjectId}</td>
                                                <td>{record.duration}</td>
                                                <td>
                                                    {record.status === "BOOKED" && (
                                                        <span className="text-success">Booked</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={9}>
                                            <p
                                                style={{
                                                    margin: '100px',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                There are no events in this day yet.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        )}
                    </table>

                    {/* ... (your pagination code) */}
                </Card.Body>
            </Card>
        </div>

    );

}

export default BookedSlot
