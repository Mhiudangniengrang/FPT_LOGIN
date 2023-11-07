import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../Services/customizeAxios';
import GlobalContext from './GlobalContext';
import PageLoading from "../components/PageLoad";
const DataContext = createContext();

export const DataProvider = ({ children, role }) => {
    const [rooms, setRooms] = useState([]);
    const [emptySlots, setEmptySlots] = useState([]);
    const [authorize, setAuthorize] = useState(false);
    const [loading, setLoading] = useState(true);
    const accessToken = typeof window !== null ? localStorage.getItem('accessToken') : null
    const [loginUser, setLoginUser] = useState({})

    useEffect(async () => {
        await axios
            .get("/api/v1/user/userId", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then(res => {
                setLoginUser(res)
                setLoading(false)

            }).catch(error => {
                setLoading(false)
                console.log("Erorr at getting user ", error)
            })
    }, [])

    useEffect(() => {
        if (loginUser.roleName === role) {
            setAuthorize(true)
        } else setAuthorize(false)
    }, [loginUser])

    useEffect(() => {
        axios
            .get(`/api/v1/slots/lecturer/room`)
            .then((response) => {
                setRooms(response)
            }).catch(error => {
                console.log('Error at Data Context:', error)
            })
    }, [])

    if (loading) {
        return <PageLoading />;
    }
    return (
        <DataContext.Provider value={{
            rooms,
            emptySlots,
            setEmptySlots,
            authorize,
            loginUser,
            accessToken,
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