"use client"

import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../UserInfoProvider/UserInfoProvider";

import "./styles.css";

const Menu = ({ current, hasAdminCookie }) => {
	const { userInfo } = useContext(UserInfoContext);

  const menuContent = [
    { name: "Comment faire ?", path: "/details", accessibility: "all" },
    { name: "Mes articles", path: "/dashboard", accessibility: "all" },
    { name: "Ventes", path: "/sales-panel", accessibility: "admin" },
    { name: "Administration", path: "/admin-panel", accessibility: "admin"}
  ];

  return (
    <span className="menuSpan">
      {menuContent.map((item, index) => {
        if (item.accessibility === "admin" && !(userInfo.isAdmin || hasAdminCookie)) return null;
        return (
          <a
            key={index}
            href={item.path}
            className={current === item.path ? "item active" : "item"}
          >
            {item.name}
          </a>
        );
      })}
    </span>
  );
};

export default Menu;
