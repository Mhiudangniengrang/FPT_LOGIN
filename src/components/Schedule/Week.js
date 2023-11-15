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
import ExcelReader from '../Excel/ExcelReader';
import DownloadButton from '../Excel/DownloadExcel';
import { ToastContainer, toast } from 'react-toastify';


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
    const [emptySlot, setEmptySlot] = useState([])
    const [teachSlot, setTeachSlot] = useState([])
    const { loginUser } = useData()

    const handleTeaching = (item) => {
        setTeachSlot(item)
    }

    const { setShowSlotModal, setDaySelected, setSelectedSlot } = useContext(GlobalContext);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (!isDisable) {
            const id = toast.loading("Please wait...")

            axios
                .get(`/api/v1/user/emptySlot/lecturer/${loginUser.userId}`)
                .then((response) => {
                    console.log(response)
                    setEmptySlot(response)
                    toast.update(id, { render: "Get empty slots complete", type: "success", isLoading: false, autoClose: true });

                })
                .catch(error => {
                    toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });

                    console.log("Error at Week.js " + error)
                })
        } else {
            const id = toast.loading("Please wait...")

            axios
                .get(`/api/v1/user/lecturer/${loginUser.userId}`)
                .then((response) => {
                    console.log(response)
                    setTeachSlot(response)
                    toast.update(id, { render: "Get teaching slots complete", type: "success", isLoading: false, autoClose: true });

                })
                .catch(error => {
                    toast.update(id, { render: `${error.response.data.message}`, type: "info", isLoading: false, autoClose: true });
                    console.log("Error at Week.js " + error)
                })
        }
    }, [])

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
                                    {(checkDate(day) && !isDisable) && (
                                        <span
                                            className={Style.create}
                                            onClick={() => {
                                                handleCreateClick(day)
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
                                                            onClick={() => handleDayClick(meeting)}
                                                        >
                                                            <span>Subject {meeting.subjectId} -</span>
                                                            <span>Room {meeting.roomId} -</span>
                                                            <span> {meeting.timeStart}</span><br></br>
                                                            <span> Duration {meeting.duration}</span>
                                                        </div>
                                                    )
                                                } return null
                                            }
                                        })
                                    }
                                    {
                                        isDisable && (
                                            teachSlot.map(teaching => {
                                                {
                                                    if (teaching.dateStart === day && teaching.slotTimeId == slot.charAt(5)) {
                                                        return (
                                                            <div
                                                                key={teaching.slotTimeId}
                                                                className={Style.slot}
                                                                style={{
                                                                    border: "1px solid #333",
                                                                    fontWeight: '500'
                                                                }}
                                                            >
                                                                <span>{teaching.subjectId}</span><br></br>
                                                                <span>at {teaching.roomId}</span>
                                                                <span className='ms-2'>
                                                                    <a href={`${teaching.meetingUrl}`} target="_blank">Meet URL</a>
                                                                </span>
                                                            </div>
                                                        )
                                                    } return null
                                                }
                                            })
                                        )
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            {isDisable && (
                <div style={{
                    width: '500px',

                }}>
                    <div className='mb-2'>
                        <ExcelReader handleTeachSlot={handleTeaching} />
                    </div>
                    <div>
                        If you do not have the excel file yet. Click this:<DownloadButton />
                    </div>
                </div>
            )}
        </div >
    );
}

export default WeeklyCalendar;
