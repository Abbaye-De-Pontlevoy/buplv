"use client";

import { useEffect, useState } from "react";
import ArticleForm from "../ArticleForm/ArticleForm";
import ArticleList from "../ArticleList/ArticleList";
import { getArticleList } from "../ArticleList/removeArticleAction";
import { getUserID } from "@/app/helpers/getUserID";

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
            articleJSON={articleList}
            callAfterSubmit={updateArticleList}
          />

          <ArticleForm title={<h2>Ajouter un article</h2>} callAfterSubmit={updateArticleList} />
        </>
      )}
    </>
  );
};

export default ArticleGestionnary;