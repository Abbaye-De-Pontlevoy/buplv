"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import QRCodeReader from "./QRCodeReader";

Modal.setAppElement("#root");

const AQRModal = ({onQRCodeRead, disabled}) => {
  const [showModal, setShowModal] = useState(false);
  const [qrCodeValue, setQRCodeValue] = useState("");

  const handleModalClose = (value) => {
    setShowModal(false);
    if (value) {
      setQRCodeValue(value);
      onQRCodeRead(value);
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)} disabled={disabled}>Scanner un article</button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Scan Articles"
      >
        <QRCodeReader onQRCodeRead={handleModalClose} />
        <button onClick={() => handleModalClose(null)}>Fermer</button>
      </Modal>
    </div>
  );
};

export default AQRModal;
