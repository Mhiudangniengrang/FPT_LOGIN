import React, { useContext, useState, useEffect } from "react";
import { format } from 'date-fns'
import GlobalContext from "../context/GlobalContext";
import Style from '../../assets/style/month.module.scss'

export default function Day({ day, rowIdx }) {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        setDaySelected,
        setShowEventModal,
        setSelectedEvent,
    } = useContext(GlobalContext);
    function getCurrentDayClass() {
        const isCurrentDay =
            format(day, 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy');

        return isCurrentDay ? Style.dayCurr : '';
    }

    return (
        <div className={Style.container}>
            <header className={Style.header}>
                {rowIdx === 0 && (
                    <p className={Style.dayRow}>
                        {format(day, 'dd').toUpperCase()}
                    </p>
                )}
                <p
                    id="dateCurr"
                    className={`${Style.day}  ${getCurrentDayClass()}`}
                >
                    {format(day, 'DD')}
                </p>
            </header>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
            >
                {dayEvents.map((evt, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedEvent(evt)}
                        className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                    >
                        {evt.title}
                    </div>
                ))}
            </div>
        </div>
    );
}