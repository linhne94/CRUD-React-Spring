import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalUpdateP from './ModalUpdateP';

const ModalInfo = (props) => {

    const { show, handleCloseInfo, infoProject, getProject } = props;

    const [showModalUpdateP, setshowModelUpdateP] = useState(false);

    const handleEditProject = () => {
        setshowModelUpdateP(true);
    }

    const handleClose = () => {
        setshowModelUpdateP(false);
        handleCloseInfo();
    }

    return (
        <div>
            <Modal show={show}
                onHide={handleCloseInfo}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Info Project#{infoProject.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Name: {infoProject.name}</span><br />
                    <span>Department: {infoProject.dept.name}</span><br />
                    <span>Difficulty: {infoProject.difficulty === 'h' ? "Hard" : infoProject.difficulty === 'e' ? "Easy" : infoProject.difficulty === 'n' ? "Nomal" : ""}</span><br />
                    <span>Version: {infoProject.version}</span><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleEditProject}>
                        Update
                    </Button>
                    <Button variant="secondary" onClick={handleCloseInfo}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {showModalUpdateP &&
                <ModalUpdateP
                    show={showModalUpdateP}
                    handleClose={handleClose}
                    getProject={getProject}
                    dataProject={infoProject}
                // handleCloseInfo={handleCloseInfo}
                />}
        </div>
    )
}

export default ModalInfo;