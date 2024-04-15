"use client";

import { useState } from "react";
import Modal from "react-modal";
import { getArticleState, updateArticleField } from "./scanActions";
import QRCodeReader from "../QRCodeReader/QRCodeReader";
import ArticleSearch from "../ArticleSearch/ArticleSearch";

import "./styles.css";

Modal.setAppElement("#root");

const ArticleScanner = () => {
  const [showModal, setShowModal] = useState(false);
  const [qrCodeData, setQRCodeData] = useState({});

  const displayModal = async (qrCode) => {
    setShowModal(true);
    try {
      qrCode = JSON.parse(qrCode);
      const state = await getArticleState(qrCode.id);
      qrCode.state = parseInt(state);
      setQRCodeData(qrCode);
      return true;
    } catch (e) {
      alert("Erreur lors de la lecture du QR Code.");
      closeModal();
      return false;
    }
  };

  const closeModal = () => {
    setQRCodeData({});
    setShowModal(false);
  };

  return (
    <div>
      {!showModal && <QRCodeReader onQRCodeRead={displayModal} />}

      <ArticleSearch onArticleSearch={(e) => displayModal(JSON.stringify(e))} />

      <Modal
        className="scannerModal"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="QR Code Modal"
      >
        <h2>Article scanné !</h2>
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

        <div id="buttonDiv">
          {qrCodeData.state >= 2 && (
            <button
              onClick={() => {
                updateArticleField(
                  qrCodeData.id,
                  "state",
                  qrCodeData.state - 1
                );
                closeModal();
              }}
            >
              {qrCodeData.state === 2
                ? "Enlever de l'inventaire"
                : qrCodeData.state === 3
                ? "Annuler la vente"
                : ""}
            </button>
          )}

          {qrCodeData.state <= 1 && (
            <button
              onClick={() => {
                updateArticleField(qrCodeData.id, "state", 2);
                closeModal();
              }}
            >
              Inventorier
            </button>
          )}

          {qrCodeData.state >= 1 && qrCodeData.state <= 2 && (
            <button
              onClick={() => {
                updateArticleField(qrCodeData.id, "state", -1);
                closeModal();
              }}
            >
              Déclarer invendable
            </button>
          )}
        </div>

        <button onClick={() => setShowModal(false)}>Retour</button>
      </Modal>
    </div>
  );
};

export default ArticleScanner;
