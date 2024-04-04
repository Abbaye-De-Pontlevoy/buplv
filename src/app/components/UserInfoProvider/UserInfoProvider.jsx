"use client";

import { getConnexionInfo } from "@/app/helpers/getConnexionInfo";
import React, { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext(null);

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    isConnected: false,
    isAdmin: false,
    userID: null,
    key: 0,
  })

  const [isLoaded, setIsLoaded] = useState(false);

  const refresh = () => {
    setUserInfo(userInfo => ({...userInfo, key: userInfo.key + 1}));
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConnexionInfo();
      setUserInfo({
        isConnected: data.connected,
        isAdmin: data.admin,
        userID: data.id,
        refresh: refresh
      });
      setIsLoaded(true);
    };
    fetchData();
  }, [userInfo.key]);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {isLoaded && children}
    </UserInfoContext.Provider>
  );
};
