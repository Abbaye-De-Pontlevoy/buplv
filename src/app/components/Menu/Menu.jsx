"use client"

import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../UserInfoProvider/UserInfoProvider";

import "./styles.css";

const Menu = ({ current, hasAdminCookie }) => {
	const { isAdmin } = useContext(UserInfoContext);

  const menuContent = [
    { name: "Comment faire ?", path: "/details", accessibility: "all" },
    { name: "Mes articles", path: "/dashboard", accessibility: "all" },
    { name: "Administration", path: "/admin-panel", accessibility: "admin" },
  ];

  return (
    <span className="menuSpan">
      {menuContent.map((item, index) => {
        if (item.accessibility === "admin" && !(isAdmin || hasAdminCookie)) return null;
        return (
          <a
            key={index}
            href={item.path}
            className={current === item.path ? "active" : ""}
          >
            {item.name}
          </a>
        );
      })}
    </span>
  );
};

export default Menu;
