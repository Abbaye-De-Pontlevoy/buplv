"use client";

import { useContext, useEffect, useState } from "react";
import { getSettings } from "@/app/config/settings";
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";
import removeArticleAction, { getArticleList } from "./removeArticleAction";
import QRCodePDFGenerator from "../../QRCodePDFGenerator/QRCodePDFGenerator";
import { UserInfoContext } from "../../UserInfoProvider/UserInfoProvider";

const ArticleGestionnary = ({ articleList, setArticleList, isLoading }) => {
  // Initialize state variables
  const [settings, setSettings] = useState({});
  const { userInfo } = useContext(UserInfoContext);

  // Fetch settings data when component mounts
  // Settings are used to determine
  //  => if the user can add articles
  //  => the APEL part
  useEffect(() => {
    const fetchData = async () => {
      const settingsData = await getSettings();
      setSettings(settingsData);
    };
    fetchData();
  }, []);

  // Function to update the article list
  // Used after adding or removing an article
  const updateArticleList = async () => {
    const newArticleList = await getArticleList(userInfo.userID);
    setArticleList(newArticleList);
  };

  return (
    <>
      {isLoading ? (
        "Chargement..."
      ) : (
        <>
          {/* Display the article list */}
          <ArticleList
            articleList={articleList}
            enabledRemoveButton={
              settings.allowArticleRegistration || userInfo.isAdmin
            }
            callAfterDelete={async (articleId) => {
              await removeArticleAction({ id: articleId });
              updateArticleList();
            }}
            priceFactor={userInfo.isBenevole ? 1 : 1 - settings.APELPart}
          />

          {/* Display the article form if the user is allowed to add articles */}
          {/* Display an error message if the user is not allowed to add articles */}
          {settings.allowArticleRegistration || userInfo.isAdmin ? (
            <ArticleForm
              title="Ajouter un article"
              callAfterSubmit={updateArticleList}
            />
          ) : (
            <p className="error">
              Periode d'ajout/modification des articles terminée.
            </p>
          )}

          {articleList.length != 0 && <QRCodePDFGenerator data={articleList} />}
        </>
      )}
    </>
  );
};

export default ArticleGestionnary;
