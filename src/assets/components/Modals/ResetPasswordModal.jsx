import { Button, Modal } from "react-bootstrap";

function ResetPasswordModal({ show, handleClose, email, handleOnClick }) {
  return (
    <Modal show={show} onHide={handleClose} centered className="w-100">
      <Modal.Header closeButton>
        <Modal.Title>Reset Admin password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        We will send a reset link to your email: <strong>{email}</strong>{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleOnClick}>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordModal;
