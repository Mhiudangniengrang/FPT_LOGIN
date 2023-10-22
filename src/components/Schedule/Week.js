import React, { useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import GlobalContext from '../../context/GlobalContext';
import axios from '../../Services/customizeAxios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { getDaysInWeek, getFullDaysInWeek } from '../../Utils/dateUtils';
import { useEffect } from 'react';


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

function WeeklyCalendar() {

    const [emptySlot, setEmptySlot] = useState([])
    useEffect(() => {
        axios
            .get("/api/v1/students/emptySlot/lecturer/2")
            .then((response) => {
                response.map((slot) => {
                    setEmptySlot(() => ([
                        ...emptySlot,
                        {
                            lecturerId: slot.lecturerId,
                            lecturerName: slot.lecturerName,
                            dateStart: slot.dateStart,
                            status: slot.status,
                            timeStart: slot.timeStart,
                            duration: slot.duration,
                            roomId: slot.roomId,
                        },
                    ]))
                })
            })
            .catch(error => {
                console.log("Error at Week.js" + error)
            })
    }, [])

    const { role, selectedSlot, setSelectedSlot, setShowSlotModal, setDaySelected, savedSlots } = useContext(GlobalContext);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDayClick = (day, timeSlot, subjectSlot, purposeSlot) => {

        let j = timeSlots.indexOf(timeSlot);

        setShowSlotModal(true);
        const value = slotTime.find(item => item.slot == j + 1)
        let time = `${value.start} - ${value.end}`
        setSelectedSlot(() => ({
            'slot': {
                slot: j + 1,
                date: day,
                time: `${time}`,
                subject: subjectSlot,
                purpose: purposeSlot,
            }
        }));

    };
    const handleCreateClick = (day, timeSlot) => {

        let j = timeSlots.indexOf(timeSlot);

        setShowSlotModal(true);
        const value = slotTime.find(item => item.slot == j + 1)
        let time = `${value.start} - ${value.end}`
        setSelectedSlot(() => ({
            'slot': {
                slot: j + 1,
                date: day,
                time: `${time}`,
            }
        }));

    };

    return (
        <div>
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th rowSpan={'2'}
                            style={{ width: '200px' }}
                        >
                            <h6>Choose date</h6>
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
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                    <tr>
                        {
                            getDaysInWeek(selectedDate).map((day, index) => (
                                <th key={index}>{day}</th>
                            ))
                        }

                    </tr>

                </thead>
                <tbody >
                    {timeSlots.map((slot, idx) => (
                        <tr key={idx}>
                            <td>{slot}</td>
                            {getFullDaysInWeek(selectedDate).map((day) => (
                                <td
                                    key={`${day}-${slot}`}
                                    onClick={() => handleCreateClick(day, slot)}
                                >
                                    {
                                        emptySlot.map((meeting) => {
                                            (meeting.dateStart === day && 1 + 1 == 2) && (
                                                <>

                                                </>
                                            )
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
