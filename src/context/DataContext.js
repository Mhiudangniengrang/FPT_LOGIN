import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../Services/customizeAxios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const DataContext = createContext();

export const DataProvider = ({ children, loginUser }) => {
    console.log("Data context ne")
    const [accessToken, setAccessToken] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [lecturerId, setLecturerId] = useState(null);
    const [emptySlots, setEmptySlots] = useState([]);
    const history = useHistory()

    useEffect(() => {
        const expiresIn = 3600;

        const tokenExpirationTimestamp = Date.now() + expiresIn * 1000;

        if (Date.now() >= tokenExpirationTimestamp) {
            console.log('Access token has expired');
            setAccessToken(null)
        }
    }, []);

    useEffect(() => {
        console.log("check access")
        console.log(accessToken)
        if (accessToken == null) {
            console.log("return home")
            history.push("/")
        }
    }, [accessToken]);


    const setAccessTokenContext = (token) => {
        setAccessToken(token);
    };

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
            accessToken,
            setAccessTokenContext
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