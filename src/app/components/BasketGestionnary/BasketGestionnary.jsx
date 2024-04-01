"use client";

import { useState } from "react";
import ArticleList from "../Article/ArticleList/ArticleList";
import AQRModal from "../QRCodeReader/QRCodeModal";
import { getArticleData, validateBasket } from "./basketAction";

import "./styles.css";

const BasketGestionnary = () => {
  const [basket, setBasket] = useState([]);
  const [validatingBasket, setValidatingBasket] = useState(false);

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

    switch (articleData.state) {
      case 0:
        alert("Article non inventorié.");
        return false;
      case 2:
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
    
    const confirmValidation = window.confirm("Êtes-vous sûr de vouloir valider le panier ?");
    if (confirmValidation) {
      setValidatingBasket(true);
      await validateBasket(basket);
      setBasket([]);
      setValidatingBasket(false);
    }
  };

  return (
    <div className="overFlowSlider">
      <h1>Panier</h1>
      <ArticleList
        articleList={basket}
        callAfterDelete={removeArticle}
        displayTotal={true}
      />

      <span id="validateAndScanSpan">
        <AQRModal onQRCodeRead={checkArticle} disabled={validatingBasket} />

        <form onSubmit={handleValidate}>
          <button type="submit" disabled={basket.length === 0 || validatingBasket}>
            Valider le panier
          </button>
        </form>
      </span>
    </div>
  );
};

export default BasketGestionnary;
