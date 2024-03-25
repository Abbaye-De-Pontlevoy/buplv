"use client";

import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import jsQR from "jsqr";
import {
  getArticleState,
  setArticleAsInventoried,
  updateArticleField,
} from "./qrcodeReaderAction";

Modal.setAppElement("#root");

const QRCodeReader = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [qrCodeData, setQRCodeData] = useState("");
  const [articleState, setArticleState] = useState(0);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    const checkQRCode = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        const data = await JSON.parse(code.data);
        const state = await getArticleState(data.id);
        setQRCodeData(data);
        setArticleState(state);
        setShowModal(true);
      }
    };

    const intervalId = setInterval(checkQRCode, 1000); // Vérifier le QR code toutes les 1000 ms

    return () => clearInterval(intervalId); // Nettoyer l'intervalle lors du démontage du composant
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

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
    </div>
  );
};

export default QRCodeReader;
