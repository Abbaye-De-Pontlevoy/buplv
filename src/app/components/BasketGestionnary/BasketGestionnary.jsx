"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import ArticleList from "../Article/ArticleList/ArticleList";
import AQRModal from "../QRCodeReader/QRCodeModal";
import { getArticleData, validateBasket } from "./basketAction";

import "./styles.css";
import { getSettings } from "@/app/config/settings";

const BasketGestionnary = () => {
  const [basket, setBasket] = useState([]);
  const [validatingBasket, setValidatingBasket] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const settings = await getSettings();
      setPaymentMethods(settings.paymentMethods);
    };
    fetchData();
  }, []);

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

    if (article.name === undefined) {
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

    console.log(e.target.paymentMethod.value);

    const paymentMethod = e.target.paymentMethod.value;

    setValidatingBasket(true);
    await validateBasket(basket, paymentMethod);
    setBasket([]);
    setValidatingBasket(false);

    setIsModalOpen(false);
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Chargement..." : "Ajouter"}
          </button>
        </span>
      </form>

      <span id="validateAndScanSpan">
        <AQRModal onQRCodeRead={checkArticle} disabled={validatingBasket} />

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={basket.length === 0 || validatingBasket}
        >
          Valider le panier
        </button>
      </span>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <form onSubmit={handleValidate}>
            <h1>Sélectionnez un moyen de paiement</h1>
            {paymentMethods.map((method, index) => (
              <div>
                <input type="radio" name="paymentMethod" value={method} />
                <label>{method}</label>
              </div>
            ))}
            <button type="submit">Valider</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default BasketGestionnary;
