import React, { Component } from "react";
import ReactModal from "react-modal";
import EntryForm from "../entry/EntryForm";

ReactModal.setAppElement("#root");

const EntryModal = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      marginRight: "-50%",
      minHeight: "500px",
      transform: "translate(-50%, -50%)",
      width: "70%",
    },
    overlay: {
      background: "rgba(1, 1, 1, 0.75)",
    },
  };

  const handleSuccessfulFormSubmission = (entry) => {
    props.handleSuccessfulFormSubmission(entry);
  };

  return (
    <ReactModal
      style={customStyles}
      onRequestClose={() => {
        props.handleModalClose();
      }}
      isOpen={props.modalIsOpen}
    >
      <EntryForm
        handleSuccessfulFormSubmission={handleSuccessfulFormSubmission}
      />
    </ReactModal>
  );
};

export default EntryModal;
