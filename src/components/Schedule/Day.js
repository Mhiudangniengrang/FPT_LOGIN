import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";
import Style from '../../assets/style/month.module.scss'

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

export default function Day({ day, rowIdx }) {

    const {
        role,
        selectedSlot,
        savedSlots,
        setShowSlotModal,
        setSelectedSlot,
    } = useContext(GlobalContext);

    function getCurrentDayClass() {
        const isCurrentDay =
            day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");

        return isCurrentDay ? Style.dayCurr : '';
    }
    const handleDayClick = (day, timeSlot, subjectSlot, purposeSlot) => {
        setShowSlotModal(true);
        const value = slotTime.find(item => item.slot == 1)
        let time = `${value.start} - ${value.end}`
        setSelectedSlot(() => ({
            'slot': {
                teacher: 'hungld',
                slot: 1,
                date: day.format("DD-MM-YY"),
                time: `${time}`,
                room: '610 - NVH',
                duration: 30,
                status: 'wait',
            }
        }));
    };

    return (
        <div className={Style.container}>
            <header className={Style.header}>
                {rowIdx === 0 && (
                    <p className={Style.dayRow}>
                        {day.format("ddd").toUpperCase()}
                    </p>
                )}
                <p
                    id="dateCurr"
                    className={`${Style.day}  ${getCurrentDayClass()}`}
                >
                    {day.format("DD")}
                </p>
            </header>
            <div
                className={Style.daySelect}
                onClick={() => {
                    handleDayClick();
                }}
            >
                {/* {dayEvents.map((evt, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedSlot(evt)}
                        className={Style.dayEvent}
                    >
                        {evt.title}
                    </div>
                ))} */}
            </div>
        </div>
    );
}