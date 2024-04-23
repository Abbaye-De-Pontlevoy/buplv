"use client";

import { getConnexionInfo } from "@/app/helpers/getConnexionInfo";
import React, { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext(null);

export const UserInfoProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState({
    isConnected: false,
    isAdmin: false,
    isBenevole: false,
    userID: null,
  })

  const [isLoaded, setIsLoaded] = useState(false);

  const logout = () => {
    setUserInfo({
      isConnected: false,
      isAdmin: false,
      isBenevole: false,
      userID: null
    });
  }

  const login = (data) => {
    setUserInfo({
      isConnected: true,
      isAdmin: data?.admin,
      isBenevole: data?.benevole,
      userID: data?.id
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConnexionInfo();
      setUserInfo({
        isConnected: data?.connected,
        isAdmin: data?.admin,
        isBenevole: data?.benevole,
        userID: data?.id
      });
      setIsLoaded(true);
    };
    fetchData();
  }, []);

  return (
    <UserInfoContext.Provider value={{userInfo, logout, login}}>
      {isLoaded && children}
    </UserInfoContext.Provider>
  );
};
