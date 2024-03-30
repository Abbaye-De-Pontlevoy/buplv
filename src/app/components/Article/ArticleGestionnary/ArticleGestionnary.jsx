"use client";

import { useEffect, useState } from "react";
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";
import removeArticleAction, {
  getArticleList,
} from "./removeArticleAction";
import { getUserID } from "@/app/helpers/getUserID";
import QRCodePDFGenerator from "../../QRCodePDFGenerator/QRCodePDFGenerator";

const ArticleGestionnary = () => {
  const [userID, setUserID] = useState("");
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticleList = async () => {
      setIsLoading(true);

      const newUserID = await getUserID();
      const newArticleList = await getArticleList(newUserID);

      setUserID(newUserID);
      setArticleList(newArticleList);

      setIsLoading(false);
    };

    fetchArticleList();
  }, []);

  const updateArticleList = async () => {
    const newArticleList = await getArticleList(userID);
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
            callAfterDelete={async (articleId) => {
              await removeArticleAction({ id: articleId });
              updateArticleList();
            }}
          />

          <ArticleForm
            title="Ajouter un article"
            callAfterSubmit={updateArticleList}
          />

          {articleList.length != 0 && <QRCodePDFGenerator data={articleList} />}
        </>
      )}
    </>
  );
};

export default ArticleGestionnary;
