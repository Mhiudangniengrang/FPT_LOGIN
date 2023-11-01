import React from "react";
const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  daySelected: new Date(),
  setDaySelected: (day) => {},
  showSlotModal: false,
  setShowSlotModal: () => {},
  dispatchCalSlot: ({ type, payload }) => {},
  savedSlots: [],
  selectedSlot: null,
  setSelectedSlot: () => {},
  emptySlots: [],
  dispatchEmptySlot: ({ type, payload }) => {},
  setRole: () => {},
  role: null,
  search: null,
  setSearch: () => {},
});

export default GlobalContext;
