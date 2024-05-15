"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import QRCodeReader from "./QRCodeReader";

import "./styles.css";

// Set the root element for the modal
Modal.setAppElement("#root");

const QRCodeReaderModal = ({ onQRCodeRead, disabled, className }) => {
  // Initialize state variables
  const [showModal, setShowModal] = useState(false);

  // Function to handle the modal close
  const handleModalClose = async (value) => {
    if (value)
      await onQRCodeRead(value);
    setShowModal(false);
  };

  return (
    <div className={className}>
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
        <button className="margin-top-10 width-full" onClick={() => setShowModal(false)}>
          Fermer
        </button>
      </Modal>
    </div>
  );
};

export default QRCodeReaderModal;
