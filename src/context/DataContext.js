import { createContext, useContext, useState, useEffect } from "react";
import axios from "../Services/customizeAxios";
import GlobalContext from "./GlobalContext";
import PageLoading from "../components/PageLoad";
import { useNavigate } from "react-router-dom";
const DataContext = createContext();

export const DataProvider = ({ children, role }) => {
  const [rooms, setRooms] = useState([]);
  const [emptySlots, setEmptySlots] = useState([]);
  const [authorize, setAuthorize] = useState(false);
  const [loading, setLoading] = useState(true);
  const accessToken =
    typeof window !== null ? localStorage.getItem("accessToken") : null;
  let loginUser = null;
  // let savedUser = typeof window != null ? JSON.parse(sessionStorage.getItem("user")) : undefined;
  let savedUser = JSON.parse(sessionStorage.getItem("user"))
  if (savedUser !== null) {
    const decodedInfo = atob(savedUser.info);
    const userInfo = JSON.parse(decodedInfo);
    loginUser = {
      userName: savedUser.userName,
      userId: userInfo.userId,
      status: userInfo.status,
      majorId: userInfo.majorId,
      email: userInfo.email,
      roleName: userInfo.roleName,
    };

  }
  const navigate = useNavigate()
  useEffect(() => {
    try {
      if (loginUser.roleName === role) {
        setAuthorize(true);
        setLoading(false)
      } else if (loginUser.roleName === null || loginUser.roleName !== role) {
        setLoading(false)
        setAuthorize(false)
        navigate("/unauthorize")
      };
    } catch (error) {
      setLoading(false)
      setAuthorize(false)
      navigate("/unauthorize")
    }
  }, [loginUser]);

  useEffect(() => {
    axios
      .get(`/api/v1/slots/lecturer/room`)
      .then((response) => {
        setRooms(response)
      }).catch(error => {
        console.log('Error at Data Context:', error)
      })
  }, [])

  // if (loading && (loginUser.roleName === "LECTURER" || loginUser.roleName === "STUDENT")) {
  //   return <PageLoading />;
  // }
  return (
    <DataContext.Provider
      value={{
        rooms,
        emptySlots,
        setEmptySlots,
        authorize,
        loginUser,
        accessToken,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const contextValue = useContext(DataContext);
  if (contextValue === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return contextValue;
};
