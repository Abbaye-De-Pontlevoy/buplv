"use client";

import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { getArticleState } from "./qrcodeReaderAction";

const QRCodeReader = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeData, setQRCodeData] = useState("");
  const [articleState, setArticleState] = useState(0);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          // Vérifiez que videoRef.current est défini
          videoRef.current.srcObject = stream;

          // Attendez que la vidéo soit chargée avant de tenter de la lire
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch((error) => {
              console.error("Error playing video:", error);
            });
          };
        } else {
          console.error("videoRef.current is null");
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    const checkQRCode = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d", { willReadFrequently: true }); // Utilisation de willReadFrequently

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        const data = await JSON.parse(code.data);
        const state = await getArticleState(data.id);
        setQRCodeData(data);
        setArticleState(state);
        onClose(data.value); // Passer la valeur lue au composant principal
      }
    };

    const intervalId = setInterval(checkQRCode, 300);

    // Fonction de nettoyage pour arrêter la caméra lorsque le composant est démonté
    return () => {
      clearInterval(intervalId);
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => {
            track.stop();
          });
        }
      }
    };
  }, [onClose]);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default QRCodeReader;
