import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { postUpdateProject, fetchDept } from '../../services/Api';
import ModalConfirmUpdate from './ModalConfirmUpdate';

const ModalUpdateP = (props) => {
    const { show, handleClose, getProject, dataProject } = props;
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [version, setVersion] = useState("");
    const [did, setDid] = useState("");
    const [listDept, setListDept] = useState([]);


    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const handleCloseConfirm = () => {
        setShowModalConfirm(false)
    }

    useEffect(() => {
        getDept();
        console.log("efD1")
    }, []);

    const getDept = async () => {
        let res = await fetchDept();

        if (res) {
            setListDept(res.data)
        }
        console.log(res.data)
        console.log("fetch2")
    }

    useEffect(() => {
        if (show) {
            setName(dataProject.name);
            setDifficulty(dataProject.difficulty);
            setVersion(dataProject.version);
            setDid(dataProject.did);
        }
    }, [dataProject, show])

    const handleUpdate = async () => {
        const Project = { name, did, difficulty, version }

        // const isNameExists = listProject.some(item => item.name === name);
        // console.log(Project)
        if (name !== '' && did !== '' && difficulty !== '' && version !== '') {
            let res = await postUpdateProject(Project, dataProject.id);
            console.log(res)
            if (res) {
                if (res === 500) {
                    toast.error("The name of project already exists");
                    setShowModalConfirm(false);
                }
                else {
                    handleClose();
                    // handleCloseInfo();
                    handleCloseConfirm();
                    getProject();
                    toast.success("Update succeed")
                }
            }
            else {
                toast.error("Error")
            }
        }
    }

    const handleClickUpdate = () => {
        setShowModalConfirm(true);
    }

    return (<>
        <Modal show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <select className="form-select" aria-label="Default select example" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value='e' >Easy</option>
                            <option value='n' >Normal</option>
                            <option value='h' >Hard</option>
                        </select>
                    </div>
                    <div className="form-group mb-2">
                        <input type="text" className="form-control" placeholder="Enter version"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <select className="form-select" aria-label="Default select example" value={did} onChange={(e) => setDid(e.target.value)}>
                            {listDept && listDept.length > 0 &&
                                listDept.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id} >{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClickUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
        {showModalConfirm &&
            <ModalConfirmUpdate
                show={showModalConfirm}
                handleCloseConfirm={handleCloseConfirm}
                handleUpdate={handleUpdate}
            // prevDataProject={dataProject}
            />}
    </>);
}

export default ModalUpdateP;