import dayjs from "dayjs";
import React, { useContext, useEffect, useState, useMemo } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getMonth } from "../../Utils/dateUtils";
import Style from "../../assets/style/month.module.scss"
export default function SmallCalendar({ emptySlot, selectedSlot }) {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(
        dayjs().month()
    );
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    const {
        monthIndex,
        setDaySelected,
        daySelected,
        setShowSlotModal
    } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }
    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }
    function getDayClass(day) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = dayjs(daySelected).format(format);
        if (nowDay === currDay) {
            return Style.smallDayCurr;
        } else if (currDay === slcDay) {
            return Style.smallDaySlc;
        } else {
            return "";
        }
    }

    const getDot = (day) => {
        const date = day.format("YYYY-MM-DD");
        let flag = false;
        emptySlot.map((slot) => {
            if (slot.dateStart === date && slot.status === "OPEN") {
                flag = true
            }
        })
        return flag ? (<div className={`${Style.smallDot}`}></div>) : ""
    }

    const fillteredSlot = useMemo(() => {
        console.log("usememo ne")
        const date = dayjs(daySelected).format("YYYY-MM-DD");
        const matchingSlots = emptySlot.reduce((accumulator, slot) => {
            if (slot.dateStart === date && slot.status === "OPEN") {
                return [...accumulator, slot];
            }
            return accumulator;
        }, []);
        return matchingSlots;

    }, [daySelected])

    const handleAssignSlot = (slot) => {
        console.log(slot)
    }
    return (
        <>
            <h5>Assign to empty slot</h5>
            <div className={Style.content}>
                <div className={`mt-9 ${Style.calendar}`}>
                    <header className={Style.smallHeader}>

                        <button onClick={handlePrevMonth}>
                            <span className={Style.prev}>{`<`}</span>
                        </button>
                        <p className={Style.smallDays}>
                            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                                "MMMM YYYY"
                            )}
                        </p>
                        <button onClick={handleNextMonth}>
                            <span className={Style.next}>{`>`}</span>
                        </button>
                    </header>
                    <div className={Style.smallDayRow}>
                        {currentMonth[0].map((day, i) => (
                            <span key={i} className={Style.smallDaySpan}>
                                {day.format("dd").charAt(0)}
                            </span>
                        ))}
                        {currentMonth.map((row, i) => (
                            <React.Fragment key={i}>
                                {row.map((day, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setDaySelected(new Date(day));
                                        }}
                                        className={`${getDayClass(day)} ${Style.smallDayBtn} `}
                                    >
                                        <span className={`${Style.smallDaySpan} `} >
                                            {day.format("D")}
                                            {getDot(day)}
                                        </span>
                                    </button>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className={Style.smallContent}>
                    <h5>Empty slot</h5>
                    {fillteredSlot.length === 0 ? (
                        <p>There is no empty slot for {dayjs(daySelected).format("DD-MM")}</p>
                    ) : (
                        fillteredSlot.map((slot) => (
                            <div className={Style.smallSlot} key={slot.slotTimeId}>
                                <p>Date: {slot.dateStart}</p>
                                <p>Duration: {(slot.duration).slice(3, 5)} minutes</p>
                                <p>Slot: {slot.slotTimeId}</p>
                                <span>Room: {slot.roomId} </span>
                                <span>
                                    {slot.roomId.includes("NVH") ? "\u00A0at Nha van hoa sinh vien" : "\u00A0at FPTU campus"}
                                </span>
                                <div className={Style.assignDiv}>
                                    {selectedSlot && (
                                        <button className={Style.assignBtn}
                                            onClick={() => handleAssignSlot(selectedSlot)}
                                        >Assign to this slot</button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {
                        daySelected >= new Date() && (
                            <button
                                className={Style.createBtn}
                                onClick={() => setShowSlotModal(true)}
                            >
                                Create empty slot
                            </button>
                        )
                    }
                </div>
            </div>
        </>
    );
}