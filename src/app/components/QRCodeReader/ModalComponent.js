"use client";

import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ModalComponent = ({
  showModal,
  setShowModal,
  qrCodeData,
  articleState,
  updateArticleField,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      contentLabel="QR Code Modal"
    >
      <h2>Article scanné !</h2>
      <ul>
        <li>Article : {qrCodeData.name}</li>
        <li>Marque : {qrCodeData.brand}</li>
        <li>Prix : {qrCodeData.price}€</li>
      </ul>

      {articleState > 0 && (
        <button
          onClick={() => {
            updateArticleField(qrCodeData.id, "state", articleState - 1);
            setShowModal(false);
          }}
        >
          {articleState === 1
            ? "Enlever de l'inventaire"
            : articleState === 2
            ? "Annuler la vente"
            : ""}
        </button>
      )}

      {articleState < 2 && (
        <button
          onClick={() => {
            updateArticleField(qrCodeData.id, "state", articleState + 1);
            setShowModal(false);
          }}
        >
          {articleState === 0
            ? "Inventorier"
            : articleState === 1
            ? "Vendre"
            : ""}
        </button>
      )}
      <button onClick={() => setShowModal(false)}>Annuler</button>
    </Modal>
  );
};

export default ModalComponent;
