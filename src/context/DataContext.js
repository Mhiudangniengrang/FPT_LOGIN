import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../Services/customizeAxios';
import GlobalContext from './GlobalContext';
const DataContext = createContext();

export const DataProvider = ({ children, role }) => {
    const [rooms, setRooms] = useState([]);
    const [lecturerId, setLecturerId] = useState(null);
    const [emptySlots, setEmptySlots] = useState([]);
    const [authorize, setAuthorize] = useState(null);

    const { loginUser } = useContext(GlobalContext)
    const accessToken = typeof window !== null ? localStorage.getItem('accessToken') : null
    console.log("data")
    console.log(loginUser)
    console.log(role)
    useEffect(() => {
        if (loginUser != null && (loginUser.roleName === role)) {
            setAuthorize(true)
        } else setAuthorize(false)
    })
    const getRoom = () => {
        axios
            .get(`/api/v1/slots/lecturer/room`)
            .then((response) => {
                setRooms(response)
            }).catch(error => {
                console.log('Error at Data Context:', error)
            })
    }


    const getEmptySlots = async () => {
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
    }

    useEffect(() => {
        setEmptySlots([])
        getEmptySlots()
    }, [lecturerId])


    return (
        <DataContext.Provider value={{
            rooms,
            emptySlots,
            setEmptySlots,
            lecturerId,
            setLecturerId,
            authorize
        }}>
            {children}
        </DataContext.Provider >
    );
};

export const useData = () => {
    const contextValue = useContext(DataContext);
    if (contextValue === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return contextValue;
};