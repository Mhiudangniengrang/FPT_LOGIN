import React, { useState, useRef } from 'react';
import { Table } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function WeeklyCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    const endOfWeek = new Date(selectedDate);
    endOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 6);

    const [cellContents, setCellContents] = useState({});
    const [clickedCell, setClickedCell] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const timeSlots = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5', 'Slot 6'];

    const daysBetween = () => {
        var daysOfBetween = [];
        for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
            daysOfBetween.push(formatDate2(d));
        }
        return daysOfBetween;
    };
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-based, so we add 1
        const year = date.getFullYear();
        return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
    };
    const formatDate2 = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-based, so we add 1
        return `${day}/${month < 10 ? `0${month}` : month}`;
    };
    const daysInWeek = daysBetween();

    const handleDayClick = (day, timeSlot) => {
        // Update the content for the clicked day and time slot
        setCellContents((prevContents) => ({
            ...prevContents,
            [day]: {
                ...prevContents[day],
                [timeSlot]: 'Your Updated Content',
            },
        }));

        // Set the clicked cell for applying the animation
        setClickedCell({ day, timeSlot });
        setModalOpen(true);
    };
    const closeForm = () => {
        setModalOpen(false);
    };
    return (
        <div>
            <h3>{formatDate(startOfWeek) + ' - ' + formatDate(endOfWeek)}</h3>

            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th rowSpan={'2'}>
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
                            daysInWeek.map((day, index) => (
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
                                    {cellContents[day] && cellContents[day][slot] ? cellContents[day][slot] : ''}

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
