import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../Services/customizeAxios';
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    console.log("Data context ne")
    const [rooms, setRooms] = useState([]);
    const [lecturerId, setLecturerId] = useState(null);
    const [emptySlots, setEmptySlots] = useState([]);
    useEffect(async () => {
        await axios
            .get(`/api/v1/slots/lecturer/room`)
            .then((response) => {
                console.log(response)
                setRooms(response)
            }).catch(error => {
                console.log('Error at Data Context:', error)
            })
    }, [])

    useEffect(async () => {
        if (lecturerId != null) {
            await axios
                .get(`/api/v1/user/emptySlot/lecturer/${lecturerId}`)
                .then((response) => {
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
    }, [setLecturerId, setEmptySlots])


    return (
        <DataContext.Provider value={{
            axios,
            rooms,
            emptySlots,
            setEmptySlots,
            lecturerId,
            setLecturerId
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);