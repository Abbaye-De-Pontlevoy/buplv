"use client";

import ArticleGestionnary from "../components/Article/ArticleGestionnary/ArticleGestionnary";
import Menu from "../components/Menu/Menu";

import "./styles.css";

const Dashboard = () => {
  return (
    <>
      <Menu current="/dashboard" />

      <div id="bandeau-rangement">
        <div id="dashboardContainer" className="mainContainer">
          <div className="formContainer">
            <h1 className="formTitle">Liste des articles enregistrés</h1>

            <ArticleGestionnary />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
