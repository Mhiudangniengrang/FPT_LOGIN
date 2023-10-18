import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, getMonth, getYear, format, eachDayOfInterval, addDays } from 'date-fns';

// Get the current month and year formatted as 'dd/MM/yyyy'
export function getDateFormat(date) {
    return format(date, 'dd/MM/yyyy');
}

// Get the first day of the month formatted as 'dd/MM/yyyy'
export function getStartOfMonthFormatted(date) {
    return format(startOfMonth(date), 'dd/MM/yyyy');
}

// Get the last day of the month formatted as 'dd/MM/yyyy'
export function getEndOfMonthFormatted(date) {
    return format(endOfMonth(date), 'dd/MM/yyyy');
}

// Get the first day of the week for a given date formatted as 'dd/MM/yyyy'
export function getStartOfWeekFormatted(date) {
    return format(startOfWeek(date), 'dd/MM/yyyy');
}

// Get the last day of the week for a given date formatted as 'dd/MM/yyyy'
export function getEndOfWeekFormatted(date) {
    return format(endOfWeek(date), 'dd/MM/yyyy');
}

export function getDaysInWeek(date) {
    const startOfWeekDate = startOfWeek(date);
    const endOfWeekDate = addDays(startOfWeekDate, 6); // Assuming you want a week from Sunday to Saturday

    const daysInWeek = eachDayOfInterval({ start: startOfWeekDate, end: endOfWeekDate });

    // Format each date in 'dd/MM/yyyy' format
    const formattedDaysInWeek = daysInWeek.map((day) => format(day, 'dd/MM'));

    return formattedDaysInWeek;
}


