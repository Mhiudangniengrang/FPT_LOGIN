import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, subDays, format, eachDayOfInterval, addDays } from 'date-fns';
import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix;
}

export function addDaysByOne(date) {
    return addDays(date, 1);
}
export function subDaysByOne(date) {
    return subDays(date, 1)
}

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


