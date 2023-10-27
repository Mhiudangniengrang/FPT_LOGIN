import { useState, useEffect, useReducer } from "react";
import GlobalContext from "./GlobalContext";

import dayjs from "dayjs";



const slotTime = [
    {
        name: '1',
        start: '07:00',
        end: '09:15'
    },
    {
        name: '2',
        start: '09:30',
        end: '11:45'
    },
    {
        name: '3',
        start: '12:30',
        end: '14:45'
    },
    {
        name: '4',
        start: '15:00',
        end: '17:15'
    },
    {
        name: '5',
        start: '17:30',
        end: '19:45'
    },
    {
        slot: '6',
        start: '20:00',
        end: '22:15'
    },
]


export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showSlotModal, setShowSlotModal] = useState(false)
    const [daySelected, setDaySelected] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [role, setRole] = useState(null)

    useEffect(() => {
        if (!showSlotModal) {
            setSelectedSlot(null);
        }
    }, [showSlotModal]);

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                showSlotModal,
                setShowSlotModal,
                daySelected,
                setDaySelected,
                selectedSlot,
                setSelectedSlot,
                role,
                setRole,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}