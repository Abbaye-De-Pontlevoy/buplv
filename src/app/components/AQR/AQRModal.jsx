"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import AQR from "./AQR";

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
        <AQR onQRCodeRead={handleModalClose} />
      </Modal>
    </div>
  );
};

export default AQRModal;
