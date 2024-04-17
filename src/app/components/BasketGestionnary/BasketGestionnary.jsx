"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import ArticleList from "../Article/ArticleList/ArticleList";
import AQRModal from "../QRCodeReader/QRCodeModal";
import { getArticleData, validateBasket } from "./basketAction";
import { getSettings } from "@/app/config/settings";

import "./styles.css";
import ArticleSearch from "../ArticleSearch/ArticleSearch";

const BasketGestionnary = () => {
  const [basket, setBasket] = useState([]);
  const [validatingBasket, setValidatingBasket] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState("");

  const audioSuccess = new Audio(
    "https://lasonotheque.org/UPLOAD/mp3/1417.mp3"
  );
  const audioError = new Audio("https://lasonotheque.org/UPLOAD/mp3/1684.mp3");

  useEffect(() => {
    const fetchData = async () => {
      const settings = await getSettings();
      setPaymentMethods(settings.paymentMethods);
    };
    fetchData();
  }, []);

  const checkArticle = async (article) => {
    try {
      article = await JSON.parse(article);
    } catch (e) {
      audioError.play();
      alert("QR code invalide.");
      return false;
    }

    try {
      // if article in basket
      for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === article.id)
          throw new Error("Article déjà dans le panier.");
      }

      // article is a not in basket
      const articleData = await getArticleData(article.id);
      if (!articleData) throw new Error("Article non trouvé.");

      if (article.name === undefined) {
        article.name = articleData.name;
        article.brand = articleData.brand;
        article.price = articleData.price;
        article.state = articleData.state;
      }

      switch (articleData.state) {
        case 2:
          setBasket([...basket, article]);
          audioSuccess.play();
          return true;
        case 3:
          throw new Error("Article déjà vendu.");
        default:
          throw new Error("Article non inventorié.");
      }
    } catch (e) {
      audioError.play();
      alert(e.message);
      return false;
    }
  };

  const removeArticle = (toremoveId) => {
    const newBasket = basket.filter((article) => article.id !== toremoveId);
    setBasket(newBasket);
  };

  const handleValidate = async (e) => {
    e.preventDefault();

    e.target.disabled = true;

    const paymentMethod = e.target.paymentMethod.value;

    setValidatingBasket(true);
    await validateBasket(basket, paymentMethod);
    setBasket([]);
    setValidatingBasket(false);

    setIsModalOpen(false);
  };

  return (
    <>
      <div className="overFlowSlider">
        <ArticleList
          articleList={basket}
          callAfterDelete={removeArticle}
          displayTotal={true}
          enabledRemoveButton={true}
        />
      </div>

      <div style={{width:"100%"}}>
        <ArticleSearch
          placeholder="Ajouter par ID"
          buttonText="Ajouter"
          onArticleSearch={(e) => checkArticle(JSON.stringify(e))}
        />
      </div>

      <span id="validateAndScanSpan">
        <AQRModal onQRCodeRead={checkArticle} />

        <button
          onClick={() => setIsModalOpen(true)}
          disabled={basket.length === 0 || validatingBasket}
          className="greenButton"
        >
          Valider le panier
        </button>
      </span>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Valider le panier"
          id="validateBasketModal"
        >
          <h2>Sélectionnez un moyen de paiement</h2>

          <form onSubmit={handleValidate}>
            <table>
              <tbody>
                {paymentMethods.map((method, index) => (
                  <tr key={index}>
                    <td>
                      <label>
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </label>
                    </td>
                    <td>
                      <input type="radio" name="paymentMethod" value={method} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button type="submit" disabled={validateBasket}>
              Valider
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default BasketGestionnary;
