"use client";

import { getConnexionInfo } from "@/app/helpers/getConnexionInfo";
import React, { createContext, useEffect, useState } from "react";

// Create a context to store the user information
export const UserInfoContext = createContext(null);

export const UserInfoProvider = ({ children }) => {
  // Initialize state variables
  const [userInfo, setUserInfo] = useState({
    isConnected: false,
    isAdmin: false,
    isBenevole: false,
    userID: null,
  })

  const [isLoaded, setIsLoaded] = useState(false);

  // Function to update the user information when the user logs out
  const logout = () => {
    setUserInfo({
      isConnected: false,
      isAdmin: false,
      isBenevole: false,
      userID: null
    });
  }

  // Function to update the user information when the user logs in
  const login = (data) => {
    setUserInfo({
      isConnected: true,
      isAdmin: data?.admin,
      isBenevole: data?.benevole,
      userID: data?.id
    });
  }

  // Fetch user information when component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Fetch user information
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
