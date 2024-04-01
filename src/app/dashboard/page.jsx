"use client";

import { useEffect, useState } from "react";
import ArticleGestionnary from "../components/Article/ArticleGestionnary/ArticleGestionnary";
import Menu from "../components/Menu/Menu";
import TabsMenu from "../components/TabsMenu/TabsMenu";
import { isUserAdmin } from "../helpers/isUserAdmin";
import BasketGestionnary from "../components/BasketGestionnary/BasketGestionnary";
import ArticleScanner from "../components/ArticleScanner/ArticleScanner";

import "./styles.css";

const Dashboard = () => {
  const tabList = ["Articles enregistrés", "Panier acheteur", "Scanner"];

  const [displayTab, setDisplayTab] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const fecthData = async () => {
      const isAdmin = await isUserAdmin();
      if (isAdmin) {
        setDisplayTab(true);
        setActiveTab(tabList[0]);
      }
    };
    fecthData();
  }, []);

  return (
    <>
      <Menu current="/dashboard" />

      <div className="bandeau-rangement">
        <div className="mainContainer" id="dashboardMainContainer">
          {displayTab && (
            <TabsMenu
              tabs={tabList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "" && (
            <>
              <h1>Tableau de bord</h1>
              <p>Chargement...</p>
            </>
          )}

          {activeTab === tabList[0] && (
            <>
              <h1 className="formTitle">Liste des articles enregistrés</h1>
              <ArticleGestionnary />
            </>
          )}

          {activeTab === tabList[1] && (
            <>
              <h1 className="formTitle">Création de paniers</h1>
              <BasketGestionnary />
            </>
          )}

          {activeTab === tabList[2] && (
            <>
              <h1 className="formTitle">Scanner</h1>
              <ArticleScanner />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
