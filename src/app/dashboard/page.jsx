"use client";

import { useContext, useEffect, useState } from "react";
import ArticleGestionnary from "../components/Article/ArticleGestionnary/ArticleGestionnary";
import Menu from "../components/Menu/Menu";
import { getArticleList } from "../components/Article/ArticleGestionnary/removeArticleAction";
import Header from "../components/Header/Header";
import { UserInfoContext } from "../components/UserInfoProvider/UserInfoProvider";

import "./styles.css";

const Dashboard = () => {
	const { userID } = useContext(UserInfoContext);

  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Fetch user ID and article list
      setIsLoading(true);
      const newArticleList = await getArticleList(userID);
      setArticleList(newArticleList);
      setIsLoading(false);
    };
    if(!userID) return;
    fetchData();
  }, [userID]);

  return (
    <>
      <Header hasConnectedToken={true} displayAccountButton={true} />
      <Menu current="/dashboard" />
      <div className="bandeau-rangement">
        <div className="mainContainer" id="dashboardMainContainer">
          <h1 className="formTitle">Liste des articles enregistrés</h1>
          <ArticleGestionnary
            articleList={articleList}
            setArticleList={setArticleList}
            userID={userID}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
