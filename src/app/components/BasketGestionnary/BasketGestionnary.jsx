"use client";

import { useState } from "react";
import ArticleList from "../Article/ArticleList/ArticleList";
import AQRModal from "../QRCodeReader/QRCodeModal";
import { getArticleData, validateBasket } from "./basketAction";

import "./styles.css";

const BasketGestionnary = () => {
  const [basket, setBasket] = useState([]);
  const [validatingBasket, setValidatingBasket] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkArticle = async (article) => {
    article = JSON.parse(article);
    // if article in basket
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === article.id) {
        // article already in basket
        const remove = window.confirm(
          "Article déjà dans le panier, voulez-vous l'en enlever ?"
        );
        if (remove) removeArticle(article.id);
        return false;
      }
    }

    // article is a not in basket
    const articleData = await getArticleData(article.id);
    if (!articleData) {
      alert("Article non trouvé.");
      return false;
    }

    if(article.name === undefined){
      article.name = articleData.name;
      article.brand = articleData.brand;
      article.price = articleData.price;
      article.state = articleData.state;
    }

    switch (articleData.state) {
      case 1:
        alert("Article non inventorié.");
        return false;
      case 3:
        alert("Article déjà vendu.");
        return false;
      default:
        setBasket([...basket, article]);
        return true;
    }
  };

  const removeArticle = (toremoveId) => {
    const newBasket = basket.filter((article) => article.id !== toremoveId);
    setBasket(newBasket);
  };

  const handleValidate = async (e) => {
    e.preventDefault();

    const confirmValidation = window.confirm(
      "Êtes-vous sûr de vouloir valider le panier ?"
    );
    if (confirmValidation) {
      setValidatingBasket(true);
      await validateBasket(basket);
      setBasket([]);
      setValidatingBasket(false);
    }
  };

  return (
    <div className="overFlowSlider">
      <ArticleList
        articleList={basket}
        callAfterDelete={removeArticle}
        displayTotal={true}
        enabledRemoveButton={true}
      />

      <form
        id="addArticleManuallyForm"
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          await checkArticle(`{ "id": ${e.target.articleId.value} }`);
          e.target.articleId.value = "";
          setIsLoading(false);
        }}
      >
        <span>
          <input type="number" name="articleId" placeholder="Ajouter par ID" />
          <button type="submit" disabled={isLoading}>{isLoading ? "Chargement..." : 'Ajouter'}</button>
        </span>
      </form>

      <span id="validateAndScanSpan">
        <AQRModal onQRCodeRead={checkArticle} disabled={validatingBasket} />

        <form onSubmit={handleValidate}>
          <button
            type="submit"
            disabled={basket.length === 0 || validatingBasket}
          >
            Valider le panier
          </button>
        </form>
      </span>
    </div>
  );
};

export default BasketGestionnary;
