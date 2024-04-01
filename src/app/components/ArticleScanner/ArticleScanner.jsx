"use client";

import { useState } from "react";
import Modal from "react-modal";
import { getArticleState, updateArticleField } from "./scanActions";
import QRCodeReader from "../QRCodeReader/QRCodeReader";

import "./styles.css"

Modal.setAppElement("#root");

const ArticleScanner = () => {
  const [showModal, setShowModal] = useState(false);
  const [qrCodeData, setQRCodeData] = useState({});

  const displayModal = async (qrCode) => {
    qrCode = JSON.parse(qrCode);

    const state = await getArticleState(qrCode.id);

    qrCode.state = parseInt(state);

    setQRCodeData(qrCode);
  };

  const handleQRCodeRead = (qrCode) => {
    displayModal(qrCode);
    setShowModal(true);
  };

  const closeModal = () => {
    setQRCodeData({});
    setShowModal(false);
  };

  return (
    <div>
      {!showModal && <QRCodeReader onQRCodeRead={handleQRCodeRead} />}

      <Modal
        className="scannerModal"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="QR Code Modal"
      >
        <h2>Article scanné !</h2>
        <ul>
          <li>
            Article : {qrCodeData.name ? qrCodeData.name : "chargement..."}
          </li>
          <li>
            Marque : {qrCodeData.brand ? qrCodeData.brand : "chargement..."}
          </li>
          <li>
            Prix :{" "}
            {qrCodeData.price ? qrCodeData.price + " €" : "chargement..."}
          </li>
          <li>
            Etat :{" "}
            {qrCodeData.state != null
              ? qrCodeData.state === 2
                ? "Vendu"
                : qrCodeData.state === 1
                ? "Inventorié"
                : "Non inventorié"
              : "chargement..."}
          </li>
        </ul>

        {qrCodeData.state > 0 && (
          <button
            onClick={() => {
              updateArticleField(qrCodeData.id, "state", qrCodeData.state - 1);
              closeModal();
            }}
          >
            {qrCodeData.state === 1
              ? "Enlever de l'inventaire"
              : qrCodeData.state === 2
              ? "Annuler la vente"
              : ""}
          </button>
        )}

        {qrCodeData.state === 0 && (
          <button
            onClick={() => {
              updateArticleField(qrCodeData.id, "state", qrCodeData.state + 1);
              closeModal();
            }}
          >
            Inventorier
          </button>
        )}
        <button onClick={() => setShowModal(false)}>Retour</button>
      </Modal>
    </div>
  );
};

export default ArticleScanner;
