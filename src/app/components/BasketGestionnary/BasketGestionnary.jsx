"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import ArticleList from "../Article/ArticleList/ArticleList";
import QRCodeReaderModal from "../QRCodeReader/QRCodeModal";
import { getArticleData, validateBasket } from "./basketAction";
import { getSettings } from "@/app/config/settingsActions";
import ArticleSearch from "../ArticleSearch/ArticleSearch";

import "./styles.css";

const BasketGestionnary = ({className}) => {
  // Form ref
  const formRef = useRef(null);

  // Initialize state variables
  const [basket, setBasket] = useState([]);
  const [validatingBasket, setValidatingBasket] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentModalStep, setPaymentModalStep] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState("");
  const [error, setError] = useState("");

  // Add sound effects used for success and error while scanning
  const audioSuccess = new Audio(
    "https://lasonotheque.org/UPLOAD/mp3/1417.mp3"
  );
  const audioError = new Audio("https://lasonotheque.org/UPLOAD/mp3/1684.mp3");

  // Fetch payment methods when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const settings = await getSettings();
      setPaymentMethods(settings.paymentMethods);
    };
    fetchData();
  }, []);

  // Function to check if the article is valid
  // article is a JSON string received from the QR code scanner
  const checkArticle = async (article) => {
    // Check if the article JSON is valid
    // if not valid, display an error message
    try {
      article = await JSON.parse(article);
    } catch (e) {
      audioError.play();
      alert("QR code invalide.");
      return false;
    }

    // At this point the article JSON is valid and converted to an object
    try {
      // if article in basket, display an error message
      for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === article.id)
          throw new Error("Article déjà dans le panier.");
      }

      // article is a not in basket
      // get the article data from the database
      const articleData = await getArticleData(article.id);
      if (!articleData) throw new Error("Article non trouvé.");

      // reassign the article object with the article data
      // it prevents possible errors
      // and allows to add the article to the basket using just the id (from the search bar)
      article.name = articleData.name;
      article.brand = articleData.brand;
      article.price = articleData.price;
      article.state = articleData.state;

      switch (articleData.state) {
        // if article inventoried => add to basket
        case 2:
          setBasket([...basket, article]);
          audioSuccess.play();
          return true;
        // if article sold or not inventoried => display an error message
        case 3:
          throw new Error("Article déjà vendu.");
        default:
          throw new Error("Article non inventorié.");
      }
    } catch (e) {
      audioError.play();
      setError(e.message);
      return false;
    }
  };

  // Function to remove an article from the basket
  const removeArticle = (toremoveId) => {
    const newBasket = basket.filter((article) => article.id !== toremoveId);
    setBasket(newBasket);
  };

  // Function to validate the basket
  const handleValidate = async (e) => {
    e.preventDefault();

    // Disable the validate button to prevent multiple submissions
    e.target.disabled = true;

    // Get the payment method from the form
    const paymentMethod = e.target.paymentMethod.value;

    // Validate the basket
    // Block the UI while validating
    // If the validation is successful, empty the basket
    // If not, display an error message
    setValidatingBasket(true);
    const result = await validateBasket(basket, paymentMethod);
    if(result.success)
      setBasket([]);
    else
      alert(result.msg);
    setValidatingBasket(false);

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div className={className}>
      {/* Display the basket content */}
      <div className="overFlowXSlider width-full">
        <ArticleList
          articleList={basket}
          callAfterDelete={removeArticle}
          displayTotal={true}
          enabledRemoveButton={true}
          className="padding-bottom-10"
        />
      </div>

      {/* Display the "by ID" search bar */}
      <div style={{ width: "100%" }}>
        <ArticleSearch
          placeholder="Ajouter par ID"
          buttonText="Ajouter"
          onArticleSearch={(e) => checkArticle(JSON.stringify(e))}
        />
      </div>

      {/* Display the error message */}
      <p className="error">{error}</p>

      {/* Display the validate and scan buttons */}
      <span className="margin-top-10 sideToSideButton">
        {/* QR code reader button*/}
        <QRCodeReaderModal onQRCodeRead={checkArticle} className="sideToSideButton" />

        {/* Validate basket button */}
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={basket.length === 0 || validatingBasket}
          className="greenButton  sideToSideButton"
        >
          Valider le panier
        </button>
      </span>

      {/* Display the modal to select the payment method */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Valider le panier"
          id="validateBasketModal"
        >
          {paymentModalStep === 0 ?
            <>
              <h2 className="text-center">Encaissement</h2>
              <p className="error margin-top-20 text-center"> {"L'encaissement de " + basket.reduce((acc, article) => acc + article.price, 0) + " € a t'il bien été effectué ?"}</p>
              <span className="margin-top-20 sideToSideButton">
                <button onClick={() => {setPaymentMethods(0); setIsModalOpen(false)}} className="width-full redButton">Non</button>
                <button onClick={() => setPaymentModalStep(1)} className="width-full">Oui</button>
              </span>
            </>
            :
            (<>
                <h2>Sélectionnez un moyen de paiement</h2>
                <form ref={formRef} onSubmit={handleValidate}>
                  <table className="margin-top-10 margin-bottom-10">
                    <tbody>
                      {paymentMethods.map((method, index) => (
                        <tr key={index}>
                          <td>
                            <label>
                              {method.charAt(0).toUpperCase() + method.slice(1)}
                            </label>
                          </td>
                          <td>
                            <input type="radio" name="paymentMethod" value={method} checked="checked" onChange={(e) => {
                              if(e.target.checked)
                                e.target.checked = true;
      
                            }}/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
      
                  <button type="submit" disabled={validatingBasket} className="width-full">
                    Valider
                  </button>
                  
                </form>
            </>)
          }

        </Modal>
      )}
    </div>
  );
};

export default BasketGestionnary;
