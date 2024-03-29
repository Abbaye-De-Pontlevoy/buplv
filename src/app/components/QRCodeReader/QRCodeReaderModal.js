"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import QRCodeReader from "./QRCodeReader";


const QRCodeReaderModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");

  const handleModalClose = (value) => {
    setShowModal(false);
    if (value) {
      setQRCodeValue(value);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open QR Code Reader</button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="QR Code Reader Modal"
      >
        <QRCodeReader onClose={handleModalClose} />
      </Modal>
      <p>QR Code Value: {qrCodeValue}</p>
    </div>
  );
};

export default QRCodeReaderModal;
