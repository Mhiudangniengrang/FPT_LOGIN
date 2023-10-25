import React, { useState, useContext } from 'react';
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


const slotTime = [
    {
        slot: '1',
        start: '7:00',
        end: '9:15'
    },
    {
        slot: '2',
        start: '9:30',
        end: '11:45'
    },
    {
        slot: '3',
        start: '12:30',
        end: '14:45'
    },
    {
        slot: '4',
        start: '15:00',
        end: '17:15'
    },
    {
        slot: '5',
        start: '17:30',
        end: '19:45'
    },
    {
        slot: '6',
        start: '20:00',
        end: '22:15'
    },
]

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const timeSlots = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5', 'Slot 6'];

const lecturerId = 2
function WeeklyCalendar({ isDisable = false }) {

    const [emptySlot, setEmptySlot] = useState([])

    useEffect(() => {
        if (!isDisable) {
            axios
                .get(`/api/v1/user/emptySlot/lecturer/${lecturerId}`)
                .then((response) => {
                    response.map((slot) => {
                        setEmptySlot((prevSlot) => ([
                            ...prevSlot,
                            slot
                        ]))
                    })
                })
                .catch(error => {
                    console.log("Error at Week.js " + error)
                })
        }
    }, [])


    const { role, selectedSlot, setSelectedSlot, setShowSlotModal, setDaySelected } = useContext(GlobalContext);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDayClick = (day, timeSlot, subjectSlot, purposeSlot) => {

        let j = timeSlots.indexOf(timeSlot);

        setShowSlotModal(true);
        const value = slotTime.find(item => item.slot == j + 1)
        let time = `${value.start} - ${value.end}`
        setSelectedSlot(() => (
            {
                slotTimeId: j + 1,
                dateStart: day,
                timeStart: `${time}`,
                subjectId: subjectSlot,
                purpose: purposeSlot,
            }
        ));

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

    return (
        <div>
            {console.log(day)}
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
                                    padding: '10px',
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
                                    {(role === "lecturer" && checkDate(day)) && (
                                        <span
                                            className={Style.create}
                                            onClick={() => {
                                                if (role === "lecturer") handleCreateClick(day)
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
                                                        case "student":
                                                            {
                                                                return (
                                                                    <div>student meeting schedule</div>
                                                                )
                                                                break;
                                                            }
                                                        case "lecturer":
                                                            {
                                                                return (
                                                                    <div
                                                                        className={Style.slot}
                                                                    // onClick={() => handleDayClick()}
                                                                    >
                                                                        <span> SWP </span>
                                                                        <span>- room 104 -</span>
                                                                        <span> (7:30-8:00)</span>
                                                                    </div>)
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
