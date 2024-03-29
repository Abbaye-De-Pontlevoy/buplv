"use client";

import { useState } from "react";
import ArticleList from "../components/Article/ArticleList/ArticleList";
import AQRModal from "../components/QRCodeReader/QRCodeModal";
import { getArticleData, validateBasket } from "./basketAction";
import MenuButton from "../components/Button/MenuButton/MenuButton";

const QRCodePage = () => {
  const [basket, setBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
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
        setTotalPrice(totalPrice + articleData.price);
        return true;
    }
  };

  const removeArticle = (toremoveId) => {
    setTotalPrice(
      totalPrice - basket.find((article) => article.id === toremoveId).price
    );
    const newBasket = basket.filter((article) => article.id !== toremoveId);
    setBasket(newBasket);
  };

  const handleValidate = async (e) => {
    e.preventDefault();
    setValidatingBasket(true);
    await validateBasket(basket);
    setBasket([]);
    setTotalPrice(0);
    setValidatingBasket(false);
  };

  return (
    <div>
      <h1>Panier</h1>
      <ArticleList articleList={basket} callAfterDelete={removeArticle} />
      <AQRModal onQRCodeRead={checkArticle} disabled={validatingBasket}/>
      <p>Price : {totalPrice} €</p>

      <form onSubmit={handleValidate}>
        <button type="submit" disabled={validatingBasket}>Valider</button>
      </form>
      <MenuButton />
    </div>
  );
};

export default QRCodePage;
