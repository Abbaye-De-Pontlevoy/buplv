"use client";

import { useState } from "react";
import Modal from "react-modal";
import {
  cancelArticleSell,
  getArticleState,
  updateArticleField,
} from "./scanActions";
import QRCodeReader from "../QRCodeReader/QRCodeReader";
import ArticleSearch from "../ArticleSearch/ArticleSearch";

import "./styles.css";

// Set the root element for the modal
Modal.setAppElement("#root");

const ArticleScanner = ({className}) => {
  // Initialize state variables
  const [showModal, setShowModal] = useState(false);
  const [qrCodeData, setQRCodeData] = useState({});
  const [modalError, setModalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to display the modal when a QR code is read
  const displayModal = async (qrCode) => {
    try {
      // Parse the QR code data and get the state of the article
      qrCode = JSON.parse(qrCode);
      const state = await getArticleState(qrCode.id);
      qrCode.state = parseInt(state);

      // Set the state variables
      setQRCodeData(qrCode);
      setShowModal(true);

      return true;
    } catch (e) {
      alert("Erreur lors de la lecture du QR Code.");
      closeModal();
      return false;
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setQRCodeData({});
    setShowModal(false);
  };

  return (
    <div className={className}>
      {/* Display the QR code reader */}
      {!showModal && <QRCodeReader onQRCodeRead={displayModal} />}

      {/* Display the article search component to search an article by ID */}
      <ArticleSearch onArticleSearch={(e) => displayModal(JSON.stringify(e))} />

      {/* Modal to display the article data and actions */}
      <Modal
        className="scannerModal"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="QR Code Modal"
      >
        <h2>Article scanné !</h2>

        {/* Display the article data */}
        <ul>
          <li>Article : {qrCodeData.name || "chargement..."}</li>
          <li>Marque : {qrCodeData.brand || "chargement..."}</li>
          <li>
            Prix :{" "}
            {qrCodeData.price ? qrCodeData.price + " €" : "chargement..."}
          </li>
          <li>
            Etat :{" "}
            {qrCodeData.state != null
              ? qrCodeData.state === 3
                ? "Vendu"
                : qrCodeData.state === 2
                ? "Inventorié"
                : qrCodeData.state === 1
                ? "Non inventorié"
                : qrCodeData.state === -1
                ? "Invendable"
                : "Supprimé"
              : "chargement..."}
          </li>
        </ul>

        {/* Display the action buttons */}
        <div className="flex-column gap-10 width-full">
          {/* if article is inventoried */}
          {qrCodeData.state === 2 && (
            <button
              onClick={async () => {
                setIsLoading(true);
                const result = await updateArticleField(
                  qrCodeData.id,
                  "state",
                  1
                );
                if (result.success) closeModal();
                else setModalError(result.msg);
                setIsLoading(false);
              }}
              className="redButton width-full"
              disabled={isLoading}
            >
              Enlever de l'inventaire
            </button>
          )}

          {/* if article is sold */}
          {qrCodeData.state === 3 && (
            <button
              onClick={async () => {
                setIsLoading(true);
                const result = await cancelArticleSell(
                  qrCodeData.id,
                  qrCodeData.price
                );
                if (result.success) closeModal();
                else setModalError(result.msg);
                setIsLoading(false);
              }}
              className="redButton width-full"
              disabled={isLoading}
            >
              Annuler la vente
            </button>
          )}

          {/* if article is not inventoried / removed / unsellable */}
          {qrCodeData.state <= 1 && (
            <button
              onClick={async () => {
                setIsLoading(true);
                const result = await updateArticleField(
                  qrCodeData.id,
                  "state",
                  2
                );
                if (result.success) closeModal();
                else setModalError(result.msg);
                setIsLoading(false);
              }}
              className="greenButton width-full"
              disabled={isLoading}
            >
              Inventorier
            </button>
          )}

          {/* if article is registred or inventoried */}
          {qrCodeData.state === 1 ||
            (qrCodeData.state === 2 && (
              <button
                onClick={async () => {
                  setIsLoading(true);
                  const result = await updateArticleField(
                    qrCodeData.id,
                    "state",
                    -1
                  );
                  if (result.success) closeModal();
                  else setModalError(result.msg);
                  setIsLoading(false);
                }}
                className="redButton width-full"
                disabled={isLoading}
              >
                Déclarer invendable
              </button>
            ))}
        </div>

        {/* Display the error message */}
        <p className="error">{modalError}</p>

        {/* Display the close button */}
        <button onClick={() => setShowModal(false)} disabled={isLoading} className="width-full">
          Retour
        </button>
      </Modal>
    </div>
  );
};

export default ArticleScanner;
