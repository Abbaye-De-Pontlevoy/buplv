"use client";

import { useContext, useEffect, useState } from "react";
import { getSettings } from "@/app/config/settings";
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";
import removeArticleAction, { getArticleList } from "./removeArticleAction";
import QRCodePDFGenerator from "../../QRCodePDFGenerator/QRCodePDFGenerator";
import { UserInfoContext } from "../../UserInfoProvider/UserInfoProvider";

const ArticleGestionnary = ({
  articleList,
  setArticleList,
  isLoading,
  setIsLoading,
}) => {
  const [settings, setSettings] = useState({});
	const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    const fetchData = async () => {
      const settingsData = await getSettings();
      setSettings(settingsData);
    };
    fetchData();
  }, []);

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
          <ArticleList
            articleList={articleList}
            enabledRemoveButton={settings.allowArticleRegistration || userInfo.isAdmin}
            callAfterDelete={async (articleId) => {
              await removeArticleAction({ id: articleId });
              updateArticleList();
            }}
          />

          {(settings.allowArticleRegistration || userInfo.isAdmin) ? (
            <ArticleForm
              title="Ajouter un article"
              callAfterSubmit={updateArticleList}
            />
          ): <p className="error">Periode d'ajout/modification des article terminée.</p>}

          {articleList.length != 0 && <QRCodePDFGenerator data={articleList} />}
        </>
      )}
    </>
  );
};

export default ArticleGestionnary;
