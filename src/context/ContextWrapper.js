import { useState, useEffect, useReducer } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import axios from "../Services/customizeAxios";

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showSlotModal, setShowSlotModal] = useState(false)
    const [daySelected, setDaySelected] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(true);

    const accessToken = typeof window !== null ? localStorage.getItem('accessToken') : null
    const [loginUser, setLoginUser] = useState(async () => {
        await axios
            .get("/api/v1/user/userId", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then((response) => {
                setLoginUser(response)
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log("Error getting user data:", error);
            });
    });

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

    if (loading) {
        return <div>Loading...</div>; // Display a loading message or spinner
    }
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
                loginUser,
                setLoginUser,
                accessToken,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}