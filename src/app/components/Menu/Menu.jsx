"use client";

import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../UserInfoProvider/UserInfoProvider";

import "./styles.css";

const Menu = ({ current }) => {
  const { userInfo } = useContext(UserInfoContext);

  const menuContent = [
    {
      name: "Comment faire ?",
      path: "/details",
      accessibility: { public: true, benevole: true },
    },
    {
      name: "Mes articles",
      path: "/dashboard",
      accessibility: { public: true, benevole: false },
    },
    {
      name: "Ventes",
      path: "/sales-panel",
      accessibility: { public: false, benevole: true },
    },
    {
      name: "Administration",
      path: "/admin-panel",
      accessibility: { public: false, benevole: false },
    },
  ];

  return (
    <span className="menuSpan">
      {menuContent.map((item, index) => {
        if (!userInfo.isAdmin) {
          if (userInfo.isBenevole) {
            if (!item.accessibility.benevole) return null;
          } else {
            if (!item.accessibility.public) return null;
          }
        }
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
