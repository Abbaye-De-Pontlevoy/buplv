import React, { useState } from "react";
import Modal from "react-modal";

function ChoiceWindowModal({ isOpen, closeModal, title, buttons }) {
  const handleButtonClick = async (action) => {
    console.log("Action:", action);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <h2>{title}</h2>
      {buttons.map((button, index) => (
        <button key={index} onClick={() => handleButtonClick(button.action)}>{button.title}</button>
      ))}
    </Modal>
  );
}

export default ChoiceWindowModal;
