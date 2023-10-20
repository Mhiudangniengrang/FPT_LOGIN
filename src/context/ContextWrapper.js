import { useState, useEffect, useReducer } from "react";
import GlobalContext from "./GlobalContext";

import dayjs from "dayjs";

function savedSlotsReducer(state, { type, payload }) {
    switch (type) {
        case "push":
            return [...state, payload];
        case "update":
            return state.map((evt) =>
                evt.id === payload.id ? { ...evt, ...payload } : evt
            );
        case "delete":
            return state.filter((evt) => evt.id !== payload.id);
        default:
            throw new Error();
    }
}

function initSlots() {
    const storageSlots = localStorage.getItem('savedSlots')
    const parseSlots = storageSlots ? JSON.parse(storageSlots) : []
    return parseSlots
}

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showSlotModal, setShowSlotModal] = useState(false)
    const [daySelected, setDaySelected] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [savedSlots, dispatchCalSlot] = useReducer(savedSlotsReducer, [], initSlots);

    useEffect(() => {
        localStorage.setItem('savedSlots', JSON.stringify(savedSlots))
    }, [savedSlots])


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
                savedSlots,
                dispatchCalSlot,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}