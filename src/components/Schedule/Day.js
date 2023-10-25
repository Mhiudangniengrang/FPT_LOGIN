import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";
import Style from '../../assets/style/month.module.scss'


export default function Day({ day, rowIdx }) {

    const {
        role,
        selectedSlot,
        setShowSlotModal,
        setDaySelected,
        setSelectedSlot,
    } = useContext(GlobalContext);

    function getCurrentDayClass() {
        const isCurrentDay =
            day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");

        return isCurrentDay ? Style.dayCurr : '';
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
                    className={`${Style.day}  ${getCurrentDayClass()}`}
                >
                    {day.format("DD")}
                </p>
            </header>
            <div
                className={Style.daySelect}
                onClick={() => {
                    setDaySelected(new Date(day));
                    setShowSlotModal(true)
                }}
            >
                ngu
            </div>
        </div>
    );
}