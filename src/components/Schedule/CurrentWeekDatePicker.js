import React, { useState } from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';

function CurrentWeekDatePicker() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Calculate the start and end dates of the current week
    const startOfCurrentWeek = startOfWeek(new Date());
    const endOfCurrentWeek = endOfWeek(new Date());

    // Format dates as strings in the format "yyyy-MM-dd"
    const formattedStartDate = format(startOfCurrentWeek, 'yyyy-MM-dd');
    const formattedEndDate = format(endOfCurrentWeek, 'yyyy-MM-dd');



    return (
        <div>
            <input
                type="date"
                value={format(selectedDate, 'yyyy-MM-dd')}
                min={formattedStartDate}
                max={formattedEndDate}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
        </div>
    );
}

export default CurrentWeekDatePicker;
