"use client";

import { useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { UserInfoContext } from "../../UserInfoProvider/UserInfoProvider";

import "./styles.css";

// AccountButton component
const AccountButton = ({ className }) => {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <div className={className} id="accountDiv">
      {userInfo.isConnected ? (
        // If user is connected, display link to profile
        <a href="/profil">
          <span id="accountSpan">
            Mon compte
            <MdAccountCircle size={32} />
          </span>
        </a>
      ) : (
        // If user is not connected, display link to login
        <a href="/login">
          <span id="accountSpan">
            Me connecter
            <MdAccountCircle size={32} />
          </span>
        </a>
      )}
    </div>
  );
};

export default AccountButton;
