
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
    setRole: () => { },
    role: null
});

export default GlobalContext;