import { Button, Modal } from "react-bootstrap";
import React from 'react';

const ModalConfirmUpdate = (props) => {
    const { show, handleCloseConfirm, handleUpdate } = props;

    return (
        <Modal show={show} onHide={handleCloseConfirm}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to update?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirm}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmUpdate;