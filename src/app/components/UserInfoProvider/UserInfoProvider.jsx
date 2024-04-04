"use client";

import { getConnexionInfo } from "@/app/helpers/getConnexionInfo";
import React, { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext(null);

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    isConnected: false,
    isAdmin: false,
    userID: null,
  
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConnexionInfo();
      setUserInfo({
        isConnected: data.connected,
        isAdmin: data.admin,
        userID: data.id
      });
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <UserInfoContext.Provider value={userInfo}>
      {!isLoading && children}
    </UserInfoContext.Provider>
  );
};
