"use client";

import { useState } from "react";
import Menu from "../components/Menu/Menu";
import TabsMenu from "../components/TabsMenu/TabsMenu";
import BasketGestionnary from "../components/BasketGestionnary/BasketGestionnary";
import ArticleScanner from "../components/ArticleScanner/ArticleScanner";
import Header from "../components/Header/Header";

import "./styles.css";

const SalesPanel = () => {
    // List of tabs and their contents
    const tabList = ["Caisse", "Inventaire"];
    const tabsContents = [
      <>
        <h1 className="formTitle">Caisse</h1>
        <BasketGestionnary />
      </>,
      <>
        <h1 className="formTitle">Inventaire</h1>
        <ArticleScanner />
      </>
    ];

  const [activeTab, setActiveTab] = useState(tabList[0]);

  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={true} />
      <Menu current="/sales-panel" hasAdminCookie={true} />
      <div className="bandeau-rangement">
        <div className="mainContainer" id="dashboardMainContainer">
          <TabsMenu
            tabs={tabList}
            tabsContents={tabsContents}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </>
  );
};

export default SalesPanel;
