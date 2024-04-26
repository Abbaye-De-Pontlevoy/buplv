"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import QRCodeReader from "./QRCodeReader";

import "./styles.css";

// Set the root element for the modal
Modal.setAppElement("#root");

const QRCodeReaderModal = ({ onQRCodeRead, disabled }) => {
  // Initialize state variables
  const [showModal, setShowModal] = useState(false);

  // Function to handle the modal close
  const handleModalClose = async (value) => {
    if (value)
      await onQRCodeRead(value);
    setShowModal(false);
  };

  return (
    <div>
      {/* Display the button to open the modal */}
      <button onClick={() => setShowModal(true)} disabled={disabled}>
        Scanner un article
      </button>

      {/* Modal to display the QR code reader */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Scan Articles"
        id="qrModal"
      >
        <QRCodeReader onQRCodeRead={handleModalClose} />
        <button id="qrModalButton" onClick={() => setShowModal(false)}>
          Fermer
        </button>
      </Modal>
    </div>
  );
};

export default QRCodeReaderModal;
