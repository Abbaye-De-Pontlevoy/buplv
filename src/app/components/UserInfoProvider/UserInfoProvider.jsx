"use client";

import { isUserAdmin } from "@/app/helpers/isUserAdmin";
import { isUserConnected } from "@/app/helpers/isUserConnected";
import React, { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext(null);

export const UserInfoProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    isUserConnected().then((connected) => {
      if (connected) {
        isUserAdmin().then((admin) => {
          setIsAdmin(admin);
        });
      }
      setIsConnected(connected);
    });
  }, []);

  return (
    <UserInfoContext.Provider value={{ isConnected, isAdmin }}>
      {children}
    </UserInfoContext.Provider>
  );
};
