import React, { useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import GlobalContext from '../../context/GlobalContext';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { format, addDays, startOfWeek } from 'date-fns';
import { getDaysInWeek, getStartOfWeekFormatted, } from '../../Utils/dateUtils';
import BookPublicOverlay from './BookPublicOverlay';
import { useEffect } from 'react';
import BookPrivateOverlay from './BookPrivateOverlay';


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
    const { setSelectedSlot, showSlotModal, setShowSlotModal, setDaySelected, savedSlots } = useContext(GlobalContext);

    console.log(savedSlots)
    const [selectedDate, setSelectedDate] = useState(new Date());

    function getDateForCell(day) {
        const dayStart = startOfWeek(selectedDate);
        const currentDate = addDays(dayStart, day);
        return currentDate;
    }
    const handleDayClick = (day, timeSlot) => {

        let i = daysOfWeek.indexOf(day);
        let j = timeSlots.indexOf(timeSlot);
        let currDate = getDateForCell(i);

        setShowSlotModal(true);
        const value = slotTime.find(item => item.slot == j + 1)
        let time = `${value.start} - ${value.end}`
        setSelectedSlot(() => ({
            'slot': {
                teacher: 'hungld',
                slot: j + 1,
                date: format(currDate, 'dd/MM/yyy'),
                time: `${time}`,
                room: '610 - NVH',
                purpose: '',
                duration: 30,
                status: 'wait',
            }
        }));

    };

    return (
        <div>
            {showSlotModal && <BookPublicOverlay />}
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
                    {timeSlots.map(slot => (
                        <tr key={slot}>
                            <td>{slot}</td>
                            {daysOfWeek.map(day => (
                                <td
                                    onClick={() => handleDayClick(day, slot)}
                                    key={day}>
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
