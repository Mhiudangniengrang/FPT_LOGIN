import { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import axios from "../Services/customizeAxios";

export default function ContextWrapper(props) {
    console.log("Context moi'")
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showSlotModal, setShowSlotModal] = useState(false)
    const [daySelected, setDaySelected] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [lecturerId, setLecturerId] = useState(null)
    const [selectedLecturer, setSelectedLecturer] = useState(null)
    const [emptySlots, setEmptySlots] = useState(null)

    const accessToken = typeof window !== null ? localStorage.getItem('accessToken') : null

    useEffect(() => {
        const expiresIn = 3600;
        const tokenExpirationTimestamp = Date.now() + expiresIn * 1000;
        if (Date.now() >= tokenExpirationTimestamp) {
            console.log('Access token has expired');
            localStorage.clear
        }
    }, [accessToken]);

    useEffect(() => {
        if (!showSlotModal) {
            setSelectedSlot(null);
        }
    }, [showSlotModal]);

    const getEmptySlots = async () => {
        if (lecturerId != null) {
            await axios
                .get(`/api/v1/user/emptySlot/lecturer/${lecturerId}`)
                .then((response) => {
                    console.log(response)
                    response.map((slot) => {
                        setEmptySlots((prevSlot) => ([
                            ...prevSlot,
                            slot
                        ]))
                    })
                })
                .catch(error => {
                    console.log("Error at Week.js " + error)
                })
        }
    }

    useEffect(() => {
        getEmptySlots
    }, [lecturerId, setLecturerId])

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
                lecturerId,
                setLecturerId,
                selectedLecturer,
                setSelectedLecturer,
                emptySlots,
                setEmptySlots
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}