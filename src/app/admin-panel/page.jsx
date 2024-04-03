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
import Header from "../components/Header/Header";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("");

  const [userID, setUserID] = useState("");
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    </>,
  ];

  // Effect to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setActiveTab(tabList[0]);

      // Fetch user ID and article list
      setIsLoading(true);
      const newUserID = await getUserID();
      const newArticleList = await getArticleList(newUserID);
      setUserID(newUserID);
      setArticleList(newArticleList);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={true} />
      <Menu current="/admin-panel" hasAdminCookie={true} />
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

export default AdminPanel;
