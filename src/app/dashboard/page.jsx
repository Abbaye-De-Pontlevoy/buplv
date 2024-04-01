"use client";

import { useEffect, useState } from "react";
import ArticleGestionnary from "../components/Article/ArticleGestionnary/ArticleGestionnary";
import Menu from "../components/Menu/Menu";
import TabsMenu from "../components/TabsMenu/TabsMenu";
import { isUserAdmin } from "../helpers/isUserAdmin";
import BasketGestionnary from "../components/BasketGestionnary/BasketGestionnary";
import ArticleScanner from "../components/ArticleScanner/ArticleScanner";
import { getUserID } from "../helpers/getUserID";
import { getArticleList } from "../components/Article/ArticleGestionnary/removeArticleAction";

import "./styles.css";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [displayTab, setDisplayTab] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const [userID, setUserID] = useState("");
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tabList = ["Articles enregistrés", "Panier acheteur", "Scanner"];
  const tabsContents = [
    <>
      <h1 className="formTitle">Liste des articles enregistrés</h1>
      <ArticleGestionnary
        articleList={articleList}
        setArticleList={setArticleList}
        userID={userID}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>,
    <>
      <h1 className="formTitle">Création de paniers</h1>
      <BasketGestionnary />
    </>,
    <>
      <h1 className="formTitle">Scanner</h1>
      <ArticleScanner />
    </>,
  ];

  useEffect(() => {
    const fecthData = async () => {
      // fetch if admin for display tabs
      const isAdmin = await isUserAdmin();
      if (isAdmin) {
        setIsAdmin(true);
        setDisplayTab(true);
        setActiveTab(tabList[0]);
      }

      // fetch article list
      setIsLoading(true);

      const newUserID = await getUserID();
      const newArticleList = await getArticleList(newUserID);

      setUserID(newUserID);
      setArticleList(newArticleList);

      setIsLoading(false);
    };
    fecthData();
  }, []);

  return (
    <>
      <Menu current="/dashboard" />

      <div className="bandeau-rangement">
        <div className="mainContainer" id="dashboardMainContainer">
          {isAdmin ? (
            <TabsMenu
              tabs={tabList}
              tabsContents={tabsContents}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : (
            <>
              <h1 className="formTitle">Liste des articles enregistrés</h1>
              <ArticleGestionnary
                articleList={articleList}
                setArticleList={setArticleList}
                userID={userID}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
