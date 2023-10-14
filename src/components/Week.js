import React from 'react';
import { Table } from 'react-bootstrap';

function WeeklyCalendar() {
    // Array of days for the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Define time slots for the day
    const timeSlots = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4', 'Slot 5', 'Slot 6'];

    // Sample event data
    const eventData = [
        { day: 'Monday', slot: 'Slot 2', event: 'Meeting 1' },
        { day: 'Wednesday', slot: 'Slot 4', event: 'Presentation 1' },
        // Add more events
    ];

    return (
        <div>
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th></th>
                        {daysOfWeek.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody >
                    {timeSlots.map(slot => (
                        <tr key={slot}>
                            <td>{slot}</td>
                            {daysOfWeek.map(day => (
                                <td key={day}>
                                    {eventData.map(item => {
                                        if (item.day === day && item.slot === slot) {
                                            return <div key={item.event}>{item.event}</div>;
                                        }
                                        return null;
                                    })}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default WeeklyCalendar;
