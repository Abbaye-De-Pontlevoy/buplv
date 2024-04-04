"use client";

import { useContext } from "react";
import { MdAccountCircle } from "react-icons/md";
import { UserInfoContext } from "../../UserInfoProvider/UserInfoProvider";

import "./styles.css";

const AccountButton = ({ className, hasConnectedToken }) => {
  const { isConnected } = useContext(UserInfoContext);

  return (
    <div className={className} id="accountDiv">
      {isConnected || hasConnectedToken ? (
        <a href="/profil">
          <span id="accountSpan">
            Mon compte
            <MdAccountCircle size={32} />
          </span>
        </a>
      ) : (
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
