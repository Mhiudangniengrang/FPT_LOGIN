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
function WeeklyCalendar() {

    const { setShowSlotModal, setSelectedSlot } = useContext(GlobalContext);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [clickedCells, setClickedCells] = useState({});

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const timeSlots = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5', 'Slot 6'];

    function getDateForCell(day) {
        const dayStart = startOfWeek(selectedDate);
        const currentDate = addDays(dayStart, day);
        return currentDate;
    }

    const handleDayClick = (day, timeSlot) => {
        const cellKey = `${day}-${timeSlot}`;

        // Toggle the clicked state for the cell
        setClickedCells((prevClickedCells) => ({
            ...prevClickedCells,
            [cellKey]: !prevClickedCells[cellKey],
        }));


        let i = daysOfWeek.indexOf(day);
        let j = timeSlots.indexOf(timeSlot);
        let currDate = getDateForCell(i);
        setSelectedDate(currDate);
        setSelectedSlot((prevSlot) => ({
            ...prevSlot,
            'slot': {
                teacher: 'hungld',
                slot: j + 1,
                date: selectedDate,
                time: '7:00 - 7:30',
                room: '610 - NVH',
                duration: 30,
                status: 'wait',
            }

        }));

        setShowSlotModal(true);
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
                                onChange={(date) => setSelectedDate(date)}
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
                                    {clickedCells[`${day}-${slot}`] && <BookPublicOverlay />}
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
