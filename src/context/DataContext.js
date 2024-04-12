import { createContext, useContext, useState, useEffect } from "react";
import axios from "../Services/customizeAxios";
import GlobalContext from "./GlobalContext";
import PageLoading from "../components/PageLoad";
import { useNavigate } from "react-router-dom";
import { AccessExpired } from "../components/AlertExpired";
import dayjs from "dayjs";
const DataContext = createContext();

export const DataProvider = ({ children, role }) => {
  const [rooms, setRooms] = useState([]);
  const [emptySlots, setEmptySlots] = useState([]);
  const [authorize, setAuthorize] = useState(false);
  const [loading, setLoading] = useState(true);

  const accessToken =
    typeof window !== null ? localStorage.getItem("accessToken") : null;

  const loginTime = typeof window !== 'undefined' ? sessionStorage.getItem('loginTime') : null;

  function isTokenExpired() {
    return dayjs(Date.now()) > dayjs(loginTime).add(1, 'hours');
  }

  const navigate = useNavigate()

  const savedUser = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem("user")) : null
  let loginUser = {};
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
  } else if (savedUser === null) {
    console.log("unauthor")
    // navigate("/unauthorize")
  }
  useEffect(() => {
    try {
      if (loginUser.roleName === role) {
        setAuthorize(true);
        setLoading(false)
      } else if (loginUser.roleName === null || loginUser.roleName !== role) {
        setLoading(false)
        setAuthorize(false)
        // navigate("/unauthorize")
      };
    } catch (error) {
      setLoading(false)
      setAuthorize(false)
      // navigate("/unauthorize")
    }
  }, [loginUser]);

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
      {isTokenExpired() ? (
        <AccessExpired />
      ) : null}
      {children}
    </DataContext.Provider>
  );
};
export const useDataCourse = () => {
  return useContext(DataContext);
};
export const useData = () => {
  const contextValue = useContext(DataContext);
  if (contextValue === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return contextValue;
};
