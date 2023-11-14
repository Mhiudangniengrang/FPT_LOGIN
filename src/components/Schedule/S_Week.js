import React, { useState, useContext, useMemo } from 'react';
import Style from '../../assets/style/schedule.module.scss'
import { Stack, Table, Spinner } from 'react-bootstrap';
import GlobalContext from '../../context/GlobalContext';
import axios from '../../Services/customizeAxios';

import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { getDaysInWeek, getFullDaysInWeek } from '../../Utils/dateUtils';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useData } from '../../context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import ExcelReader from '../Excel/ExcelReader';
import DownloadButton from '../Excel/DownloadExcel';


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

function S_WeeklyCalendar({ activeTab }) {
    const { loginUser } = useData()
    const [bookedSlot, setBookedSlot] = useState([])
    const [emptySlot, setEmptySlot] = useState([])
    const { setShowSlotModal, setDaySelected, setSelectedSlot, selectedSlot } = useContext(GlobalContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { lecturerId } = useParams()
    useEffect(() => {
        if (lecturerId !== undefined) {
            if (activeTab === 'meeting') {
                const id = toast.loading("Please wait...")
                axios
                    .get(`/api/v1/user/emptySlot/lecturer/${lecturerId}`)
                    .then((response) => {
                        console.log("emptySlot", response)
                        setEmptySlot(response)
                        toast.update(id, { render: "Get lecturer's empty slots complete", type: "success", isLoading: false, autoClose: true });
                    })
                    .catch(error => {
                        toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });
                        console.log("Error at Week.js " + error)
                    })
            } else {
                const id = toast.loading("Please wait...")
                axios
                    .get(`/api/v1/user/lecturer/${lecturerId}`)
                    .then((response) => {
                        console.log("emptySlot", response)
                        setEmptySlot(response)
                        toast.update(id, { render: "Get lecturer's empty slots complete", type: "success", isLoading: false, autoClose: true });
                    })
                    .catch(error => {
                        toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });
                        console.log("Error at Week.js " + error)
                    })
            }
        }
    }, [activeTab, lecturerId])
    useEffect(() => {
        if (lecturerId == undefined) {
            const id = toast.loading("Please wait...")
            console.log("schedule")
            axios.get(`/api/v1/students/bookedSlot/homePage/${loginUser.userId}`
            )
                .then(res => {
                    setBookedSlot(res)
                    toast.update(id, { render: "Get slots complete", type: "success", isLoading: false, autoClose: true });
                })
                .catch(error => {
                    console.log("error at getting booked slot: " + error)
                    toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });
                })
        }
    }, [])
    const handleDayClick = (meeting) => {
        console.log("asdasd")
        setSelectedSlot(meeting)
        setShowSlotModal(true)
    }

    return (
        <div>
            <ToastContainer />
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
                                    <span>{day}</span>
                                </th>
                            ))
                        }

                    </tr>

                </thead>
                <tbody >

                    {timeSlots.map((slot, idx) => (
                        <tr key={idx}>
                            <td style={{ display: 'block' }}>{slot}</td>
                            {getFullDaysInWeek(selectedDate).map((day) => (
                                <td className={Style.days} key={`${day}-${slot}`}>
                                    {lecturerId !== undefined ? (
                                        emptySlot.map((meeting) => {
                                            if (meeting.dateStart === day && meeting.slotTimeId == slot.charAt(5) && meeting.status === "OPEN") {
                                                return (
                                                    <div
                                                        key={meeting.slotId}
                                                        className={Style.slot}
                                                        style={{ border: "4px solid green" }}
                                                        onClick={() => handleDayClick(meeting)}
                                                    >
                                                        <span>{(meeting.duration).slice(3, 5)} minutes at room {meeting.roomId} </span>
                                                        <p> ({meeting.timeStart})</p>
                                                    </div>
                                                );
                                            } else if (meeting.dateStart === day && meeting.slotTimeId == slot.charAt(5) && meeting.status === "BOOKED" && meeting.studentId === loginUser.userId) {
                                                return (
                                                    <div
                                                        key={meeting.slotId}
                                                        className={Style.slot}
                                                        style={{ border: "4px solid red" }}
                                                        onClick={() => handleDayClick(meeting)}
                                                    >
                                                        <span>{meeting.subjectId}</span><br></br>
                                                        <span>{(meeting.duration).slice(3, 5)} minutes at room {meeting.roomId} </span>
                                                        <p> ({meeting.timeStart})</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })
                                    ) : (
                                        bookedSlot.map((booked, index) => {
                                            if (booked.dateStart === day && booked.slotTimeId == slot.charAt(5)) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={Style.slot}
                                                        onClick={() => handleDayClick(booked)}
                                                        style={{ border: "4px solid #333" }}
                                                    >
                                                        <span> </span>
                                                        <span>Room {booked.roomId} -</span>
                                                        <span> {booked.timeStart}</span>
                                                        <br />
                                                        <span> Duration {(booked.duration).slice(3, 5)} minutes</span>
                                                    </div>
                                                )
                                            }
                                            return null;
                                        })
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        </div >
    );
}

export default S_WeeklyCalendar;
