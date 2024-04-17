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

Modal.setAppElement("#root");

const ArticleScanner = () => {
  const [showModal, setShowModal] = useState(false);
  const [qrCodeData, setQRCodeData] = useState({});
  const [modalError, setModalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const displayModal = async (qrCode) => {
    try {
      qrCode = JSON.parse(qrCode);
      const state = await getArticleState(qrCode.id);
      qrCode.state = parseInt(state);
      setQRCodeData(qrCode);
      setShowModal(true);
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
              className="redButton"
              disabled={isLoading}
            >
              Enlever de l'inventaire
            </button>
          )}

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
              className="redButton"
              disabled={isLoading}
            >
              Annuler la vente
            </button>
          )}
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
              className="greenButton"
              disabled={isLoading}
            >
              Inventorier
            </button>
          )}
          {qrCodeData.state >= 1 && qrCodeData.state <= 2 && (
            <button
              onClick={async () => {
                setIsLoading(true);
                const result = await updateArticleField(qrCodeData.id, "state", -1);
                if (result.success) closeModal();
                else setModalError(result.msg);
                setIsLoading(false);
              }}
              className="redButton"
              disabled={isLoading}
            >
              Déclarer invendable
            </button>
          )}
        </div>

        <p className="error">{modalError}</p>

        <button onClick={() => setShowModal(false)} disabled={isLoading}>
          Retour
        </button>
      </Modal>
    </div>
  );
};

export default ArticleScanner;
