import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Spinner } from "react-bootstrap";
import axios from "../../Services/customizeAxios";
import { useData } from "../../context/DataContext";
import dayjs from "dayjs";

function L_DaySchedule(props) {
    const { currentDate } = props;
    const [loading, isLoading] = useState(true);
    const [filteredSlot, setFilteredSlot] = useState([]);

    const { loginUser } = useData();
    const lecturerId = loginUser.userId;
    useEffect(() => {
        axios
            .get(`/api/v1/user/emptySlot/lecturer/${lecturerId}`)
            .then((response) => {
                setFilteredSlot(response);
                isLoading(false);
                console.log(response);
            })
            .catch((error) => {
                console.log("Error at list: " + error);
                isLoading(false);
            });
    }, []);

    return (
        <div>
            <Card
                className="text-center"
                style={{
                    minHeight: "40vh",
                }}
            >
                <Card.Body>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Subject</th>
                                <th>Date Start</th>
                                <th>Date Booked</th>
                                <th>Slot </th>
                                <th>Description</th>
                                <th>Time Start</th>
                                <th>Duration</th>
                                <th>Room</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <tbody>
                                {filteredSlot.length > 0 ? (
                                    filteredSlot
                                        .filter((record) =>
                                            dayjs(record.dateStart).isSame(currentDate, "day")
                                        )
                                        .map((record, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{record.studentName}</td>
                                                    <td>{record.subjectId}</td>
                                                    <td>
                                                        {dayjs(record.dateStart).format("DD/MM/YYYY")}
                                                    </td>
                                                    <td>
                                                        {new Date(record.bookedDate).toLocaleString()}
                                                    </td>
                                                    <td>{record.slotTimeId}</td>
                                                    <td>{record.description}</td>
                                                    <td>{record.timeStart}</td>
                                                    <td>{record.duration}</td>
                                                    <td>{record.roomId}</td>
                                                    <td>{record.address}</td>
                                                </tr>
                                            );
                                        })
                                ) : (
                                    <tr>
                                        <td colSpan={9}>
                                            <p>There are no events in this day yet.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        )}
                    </table>
                </Card.Body>
            </Card>
        </div>
    );
}

export default L_DaySchedule;