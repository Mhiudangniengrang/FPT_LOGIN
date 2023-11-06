import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";
import Style from '../../assets/style/month.module.scss'

export default function Day({ day, rowIdx, slots }) {
    const {
        setShowSlotModal,
        setDaySelected,
        setSelectedSlot,
    } = useContext(GlobalContext);

    function getCurrentDayClass() {
        const isCurrentDay =
            day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
        return isCurrentDay ? Style.dayCurr : '';
    }
    const checkDate = (day) => {
        let currDay = new Date();
        let year = dayjs(currDay).year().toString()
        const [date, month] = day.split('/').map(String)
        let selectDate = new Date(year + "/" + month + "/" + date)

        if (selectDate >= currDay) { return true }
        return false;
    }

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
                    className={`${Style.day} ${getCurrentDayClass()}`}
                    onClick={() => {
                        setDaySelected(new Date(day));
                        setShowSlotModal(true)
                    }}
                >
                    {day.format("DD")}
                </p>
            </header>
            <div
                className={Style.daySelect}
            >
                {slots &&
                    slots.map(slot => (
                        <div
                            className={Style.dayEvent}

                            onClick={() => {
                                setDaySelected(new Date(day));
                                setShowSlotModal(true)
                                setSelectedSlot(slot)
                            }}
                        >
                            start {slot.timeStart} - room {slot.roomId}
                        </div>

                    ))
                }
            </div>
        </div>
    );
}