import React, { useState, useContext, useMemo } from 'react';
import Style from '../../assets/style/schedule.module.scss'
import { Stack, Table } from 'react-bootstrap';
import GlobalContext from '../../context/GlobalContext';
import axios from '../../Services/customizeAxios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { getDaysInWeek, getFullDaysInWeek } from '../../Utils/dateUtils';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useData } from '../../context/DataContext';


const slotTime = [
    {
        slot: "1",
        start: "7:00",
        end: "9:15",
    },
    {
        slot: "2",
        start: "9:30",
        end: "11:45",
    },
    {
        slot: "3",
        start: "12:30",
        end: "14:45",
    },
    {
        slot: "4",
        start: "15:00",
        end: "17:15",
    },
    {
        slot: "5",
        start: "17:30",
        end: "19:45",
    },
    {
        slot: "6",
        start: "20:00",
        end: "22:15",
    },
];

const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const timeSlots = ["Slot 1", "Slot 2", "Slot 3", "Slot 4", "Slot 5", "Slot 6"];

function WeeklyCalendar({ isDisable = false }) {
    const lecturerId = typeof window != null ? sessionStorage.getItem("lecturerId") : null
    const role = typeof window != null ? sessionStorage.getItem("role") : null
    const [rooms, setRooms] = useState([]);
    const [emptySlot, setEmptySlot] = useState([])
    const [bookedSlot, setBookedSlot] = useState([])
    const { loginUser } = useData()

    const { setShowSlotModal, setDaySelected, setSelectedSlot, selectedSlot } = useContext(GlobalContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log(selectedSlot)
    const getBookedSlot = () => {
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
    }

    const getRoom = () => {
        axios
            .get(`/api/v1/slots/lecturer/room`)
            .then((response) => {
                setRooms(response)
            }).catch(error => {
                console.log('Error at Data Context:', error)
            })
    }
    useEffect(() => {
        if (!isDisable) {
            axios
                .get(`/api/v1/user/emptySlot/lecturer/${lecturerId}`)
                .then((response) => {
                    setEmptySlot(response)
                    getRoom()
                    console.log(response)
                })
                .catch(error => {
                    console.log("Error at Week.js " + error)
                })
        }
    }, [lecturerId])


    const handleStudentDayClick = (meeting) => {
        console.log(meeting)
        setShowSlotModal(true);
        setSelectedSlot(meeting);
    };

    const handleCreateClick = (day) => {
        let year = dayjs(selectedDate).year().toString()
        const [date, month] = day.split('/').map(String)
        if (!isDisable) {
            setShowSlotModal(true);
            setDaySelected(new Date(`${year}/${month}/${date}`))
        }
    };

    const checkDate = (day) => {
        let currDay = new Date();
        let year = dayjs(currDay).year().toString()
        const [date, month] = day.split('/').map(String)
        let selectDate = new Date(year + "/" + month + "/" + date)

        if (selectDate >= currDay) { return true }
        return false;
    }

    const handleDayClick = (meeting) => {
        setSelectedSlot(meeting)
        setShowSlotModal(true)
    }

    return (
        <div>
            <Table responsive striped bordered>
                <thead
                    className={Style.thead}
                >
                    <tr>
                        <th rowSpan={'2'}
                            style={{ width: '130px' }}
                        >
                            <Stack direction='horizontal' gap='3'
                                style={{
                                    padding: '10px 0',
                                }}
                            >
                                <div>
                                    <h6
                                        style={{
                                            margin: '0',
                                            paddingBottom: '5px',
                                        }}
                                    >Choose date</h6>
                                    <button onClick={() => setSelectedDate(new Date())}
                                        style={{
                                            padding: '0 15px',
                                            border: '1px solid #333'
                                        }}
                                    >now</button>
                                </div>
                            </Stack>
                            <DatePicker
                                onChange={(date) => {
                                    setShowSlotModal(false),
                                        setSelectedDate(date),
                                        setDaySelected(date)
                                }}
                                value={selectedDate}
                                selected={selectedDate}
                                dateFormat={'dd/MM/yyyy'}
                            />
                        </th>
                        {daysOfWeek.map(day => (
                            <th key={day}
                            >{day}</th>
                        ))}
                    </tr>
                    <tr>
                        {
                            getDaysInWeek(selectedDate).map((day, index) => (
                                <th key={index}
                                    className={Style.createContain}
                                >
                                    {(role === "LECTURER" && checkDate(day)) && (
                                        <span
                                            className={Style.create}
                                            onClick={() => {
                                                if (role === "LECTURER") handleCreateClick(day)
                                            }}
                                        ></span>
                                    )}
                                    <span>{day}</span>
                                </th>
                            ))
                        }

                    </tr>

                </thead>
                <tbody >
                    {timeSlots.map((slot, idx) => (
                        <tr key={idx}>
                            <td
                                style={{
                                    display: 'block',
                                }}
                            >{slot}</td>
                            {getFullDaysInWeek(selectedDate).map((day) => (
                                <td
                                    className={Style.days}
                                    key={`${day}-${slot}`}
                                >
                                    {
                                        emptySlot.map((meeting) => {
                                            {
                                                if (meeting.dateStart === day && meeting.slotTimeId == slot.charAt(5)) {
                                                    switch (role) {
                                                        case "STUDENT":
                                                            {
                                                                return (
                                                                    meeting.status === "OPEN" ? (
                                                                        <div
                                                                            key={meeting.slotId}
                                                                            className={Style.slot}
                                                                            onClick={() => handleStudentDayClick(meeting)}
                                                                            style={{
                                                                                border: "4px solid green"
                                                                            }}
                                                                        >
                                                                            <span> </span>
                                                                            <span>Room {meeting.roomId} -</span>
                                                                            <span> {meeting.timeStart}</span><br></br>
                                                                            <span> Duration {meeting.duration}</span>
                                                                        </div>
                                                                    ) : <div
                                                                        key={meeting.slotId}
                                                                        className={Style.slot}
                                                                        style={{
                                                                            border: "4px solid red"
                                                                        }}
                                                                    // onClick={() => handleDayClick()}
                                                                    >
                                                                        <span> SWP -</span>
                                                                        <span>room 104 -</span>
                                                                        <span> (7:30-8:00)</span>
                                                                    </div>
                                                                )
                                                                break;
                                                            }
                                                        case "LECTURER":
                                                            {
                                                                return (
                                                                    meeting.status === "OPEN" ? (
                                                                        <div
                                                                            key={meeting.slotId}
                                                                            className={Style.slot}
                                                                            style={{
                                                                                border: "4px solid green"
                                                                            }}
                                                                            onClick={() => handleDayClick(meeting)}
                                                                        >
                                                                            <span> </span>
                                                                            <span>Room {meeting.roomId} -</span>
                                                                            <span> {meeting.timeStart}</span><br></br>
                                                                            <span> Duration {meeting.duration}</span>
                                                                        </div>
                                                                    ) : <div
                                                                        key={meeting.slotId}
                                                                        className={Style.slot}
                                                                        style={{
                                                                            border: "4px solid red"
                                                                        }}
                                                                    // onClick={() => handleDayClick()}
                                                                    >
                                                                        <span>Subject {meeting.subjectId} -</span>
                                                                        <span>Room {meeting.roomId} -</span>
                                                                        <span> {meeting.timeStart}</span><br></br>
                                                                        <span> Duration {meeting.duration}</span>
                                                                    </div>
                                                                )
                                                                break;
                                                            }
                                                    }
                                                } return null
                                            }
                                        })
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    );
}

export default WeeklyCalendar;
