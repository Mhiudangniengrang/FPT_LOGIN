import { useState, useEffect, useReducer } from "react";
import GlobalContext from "./GlobalContext";

function savedSlotsReducer(state, { type, payload }) {
    switch (payload) {
        case "add":

            return [...state];
        case 'update':

            return state.map(slot => slot.id === payload.id ? payload : slot)

        case 'delete':
            return state.filter((slot => slot.id === payload.id ? payload : slot))

        default:
            throw new Error();

    }
}

function initSlots() {
    const storageSlots = localStorage.getItem('savedSlots')
    const parseSlots = storageSlots ? JSON.parse(storageSlots) : []
    return parseSlots
}



// useEffect(() => {
//     // Initialize the state using useReducer
//     const [state, dispatchCalSlot] = useReducer(reducer, initialState);

//     // Use the useEffect hook to initialize the state
//     useEffect(() => {
//         // Fetch data or perform any initial setup here
//         // For example, you can fetch data from an API and update the state based on the result
//         // Simulate a delayed API call with setTimeout
//         setTimeout(() => {
//             const initialCount = 10; // Replace this with your actual initial data
//             dispatchCalSlot({ type: 'SET_INITIAL_COUNT', payload: initialCount });
//         }, 1000); // Delayed initialization

//         // The empty dependency array ensures this effect runs only once on component mount
//     }, []);
// }, [])

export default function ContextWrapper(props) {
    const [showSlotModal, setShowSlotModal] = useState(false)
    const [daySelected, setDaySelected] = useState(null);
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