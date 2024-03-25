"use client"

import { useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import { setArticleAsInventoried } from './qrcodeReaderAction';

const QRCodeReader = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const checkQRCode = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const width = video.videoWidth;
        const height = video.videoHeight;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
        const imageData = context.getImageData(0, 0, width, height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
					const showQRCode = window.confirm('Voulez-vous afficher ce QR code dans la console ?');
					
					// Si l'utilisateur confirme, afficher le QR code dans la console
					if (showQRCode) {
						console.log('Contenu du QR code :', code.data);
            setArticleAsInventoried(code.data);
					}
				}
					
      }
      requestAnimationFrame(checkQRCode);
    };

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        video.srcObject = stream;
        video.play();
        checkQRCode();
      })
      .catch(error => console.error('Erreur lors de l\'accès à la caméra :', error));

    return () => {
      video.srcObject && video.srcObject.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default QRCodeReader;
