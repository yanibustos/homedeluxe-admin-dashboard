import React from "react";
import { Button, Modal } from "react-bootstrap";

function RemoveModal({ show, handleClose, item, handleOnClick }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete {item}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleOnClick}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveModal;
