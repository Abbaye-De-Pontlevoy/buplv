"use client";

import { useState } from "react";
import Menu from "../components/Menu/Menu";
import Header from "../components/Header/Header";
import SettingsForm from "../components/SettingsForm/SettingsForm";
import RapportsGenerator from "../components/RapportsGenerator/RapportsGenerator";
import TabsMenu from "../components/TabsMenu/TabsMenu";

import "./styles.css";
import ArticleModifier from "../components/ArticleModifier/ArticleModifier";

const SiteSettings = () => {
  // List of tabs and their contents
  const tabList = ["Paramètres", "Rapports", "Recherche d'article"];
  const tabsContents = [
    <>
      <h1 className="formTitle">Paramètres du site</h1>
      <SettingsForm />
    </>,
    <>
      <h1 className="formTitle">Rapports</h1>
      <RapportsGenerator />
    </>,
    <>
      <h1>Rechercher un article</h1>
      <ArticleModifier/>
    </>,
  ];

  const [activeTab, setActiveTab] = useState(tabList[0]);
  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={true} />
      <Menu current="/admin-panel"/>
      <div className="bandeau-rangement">
        <div className="mainContainer" id="settingsContainer">
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

export default SiteSettings;
