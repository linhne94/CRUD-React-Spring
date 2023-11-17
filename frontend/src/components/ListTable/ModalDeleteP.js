import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteProject } from '../../services/Api';

const ModalDeleteP = (props) => {
    const { show, handleClose, getProject, dataProject } = props;

    const handleDelete = async () => {
        await deleteProject(dataProject.id);
        handleClose();
        getProject();
        toast.success("Xoa thanh cong!")
        // console.log("res: ", res);

    }

    return (<>
        <Modal  show={show} 
                onHide={handleClose} 
                backdrop="static"
                keyboard={false}
                >
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>Bạn có chắc chắn muốn xóa không?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default ModalDeleteP;