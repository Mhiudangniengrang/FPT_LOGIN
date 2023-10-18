
import React from "react";
const GlobalContext = React.createContext({
    daySelected: null,
    setDaySelected: (day) => { },
    showSlotModal: false,
    setShowSlotModal: () => { },
    dispatchCalSlot: ({ type, payload }) => { },
    savedSlots: [],
    selectedSlot: null,
    setSelectedSlot: () => { },
});

export default GlobalContext;