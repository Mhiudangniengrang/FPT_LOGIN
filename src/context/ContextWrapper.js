import { useState, useEffect, useReducer } from "react";
import GlobalContext from "./GlobalContext";

import dayjs from "dayjs";
import { getCurentTime } from "../Utils/dateUtils";

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
  const storageSlots = localStorage.getItem("savedSlots");
  const parseSlots = storageSlots ? JSON.parse(storageSlots) : [];
  return parseSlots;
}

function initEmptySlots() {
  const storageSlots = localStorage.getItem("emptySlots");
  const parseSlots = storageSlots ? JSON.parse(storageSlots) : [];
  return parseSlots;
}

const slotTime = [
  {
    name: "1",
    start: "07:00",
    end: "09:15",
  },
  {
    name: "2",
    start: "09:30",
    end: "11:45",
  },
  {
    name: "3",
    start: "12:30",
    end: "14:45",
  },
  {
    name: "4",
    start: "15:00",
    end: "17:15",
  },
  {
    name: "5",
    start: "17:30",
    end: "19:45",
  },
  {
    slot: "6",
    start: "20:00",
    end: "22:15",
  },
];

function findTimeSlot(currentTime) {
  const currentHours = parseInt(currentTime[0] + currentTime[1], 10);
  const currentMinutes = parseInt(currentTime[3] + currentTime[4], 10);
  slotTime.map((slot) => {
    const startHours = parseInt(slot.start[0] + slot.start[1], 10);
    const startMinutes = parseInt(slot.start[3] + slot.start[4], 10);
    const endHours = parseInt(slot.end[0] + slot.end[1], 10);
    const endMinutes = parseInt(slot.end[3] + slot.end[4], 10);
    if (
      currentHours > startHours ||
      (currentHours === startHours && currentMinutes >= startMinutes)
    ) {
      if (
        currentHours < endHours ||
        (currentHours === endHours && currentMinutes <= endMinutes)
      ) {
        setCurrentSlot(slot.name);
      }
    }
  });
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [daySelected, setDaySelected] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [savedSlots, dispatchCalSlot] = useReducer(
    savedSlotsReducer,
    [],
    initSlots
  );
  const [emptySlots, dispatchEmptySlot] = useReducer(
    savedSlotsReducer,
    [],
    initEmptySlots
  );
  const [role, setRole] = useState(null);
  useEffect(() => {
    localStorage.setItem("savedSlots", JSON.stringify(savedSlots));
  }, [savedSlots]);
  useEffect(() => {
    localStorage.setItem("emptySlots", JSON.stringify(emptySlots));
  }, [emptySlots]);

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
        emptySlots,
        dispatchEmptySlot,
        role,
        setRole,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
