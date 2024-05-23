"use client";

import { useContext, useEffect, useState } from "react";
import ArticleGestionnary from "../components/Article/ArticleGestionnary/ArticleGestionnary";
import Menu from "../components/Menu/Menu";
import { getArticleList } from "../components/Article/ArticleGestionnary/removeArticleAction";
import Header from "../components/Header/Header";
import { UserInfoContext } from "../components/UserInfoProvider/UserInfoProvider";

import "./styles.css";

/**
 * Dashboard component.
 * Renders the dashboard page with a list of saved articles.
 */
const Dashboard = () => {
  // Get user information from the context
  const { userInfo, login } = useContext(UserInfoContext);

  // Initialize state variables
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      if(!userInfo.userID){
        return;
      }
      // Fetch user ID and article list
      setIsLoading(true);
      const newArticleList = await getArticleList(userInfo.userID);
      setArticleList(newArticleList);
      setIsLoading(false);
    };
    fetchData();
  }, [userInfo.userID]);

  return (
    <>
      <Header  />
      <Menu current="/dashboard" />
      <div className="bandeau-rangement">
        <div className="main-container">
          <h1 className="padding-30">Liste des articles enregistrés</h1>
          <ArticleGestionnary
            articleList={articleList}
            setArticleList={setArticleList}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            className="width-full"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
