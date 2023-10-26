
import React from "react";
const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => { },
    daySelected: new Date(),
    setDaySelected: (day) => { },
    showSlotModal: false,
    setShowSlotModal: () => { },
    setRole: () => { },
    role: null
});

export default GlobalContext;