
import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => { },
    daySelected: new Date(),
    setDaySelected: (day) => { },
    showSlotModal: false,
    setShowSlotModal: () => { },
    selectedSlot: null,
    setSelectedSlot: () => { },
    setLoginUser: () => { },
    loginUser: null,
    accessToken: null,
    lecturerId: null,
    setLecturerId: () => { },
    selectedLecturer: null,
    setSelectedLecturer: () => { },
    emptySlots: null,
    setEmptySlots: () => { }
});

export default GlobalContext;