import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { fetchDept, postCreateProject, fetchProject } from '../../services/Api';

const ModalAddNewP = (props) => {
    const { show, handleClose, getProject } = props;
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [did, setDid] = useState("");
    const [listDept, setListDept] = useState([]);

    useEffect(() => {
        getDept();
        console.log("efD1")
    }, []);

    const getDept = async () => {
        let res = await fetchDept();

        if (res && res.data) {
            setListDept(res.data)
        }
        console.log(res)
        console.log("fetch2")
    }

    const handleAddProject = async () => {
        const Project = { name, did, difficulty }
        // const isNameExists = listProject.some(item => item.name === name);
        // console.log(Project)

        if (name !== '' && did !== '' && difficulty !== '') {
            // if (isNameExists) {
            //     toast.error("The name of project already exists")
            // }
            // else {

            let res = await postCreateProject(Project);
            console.log(res)
            if (res.data && res.data.id) {
                if (res === 500) {
                    toast.error("The name of project already exists or length > 30 character");
                }
                else {

                    setDifficulty('');
                    setName('');
                    setDid('');
                    fetchProject();
                    handleClose();
                    toast.success("The project was created successfully");
                    getProject();
                }
            }
            // }
        }
        else {
            toast.error("Please enter complete information")
        }

        // console.log(">> check res: ", res)
        // console.log("Name: " + name + "email: " + email + "phone:" +phone);
    }

    return (<>
        <Modal show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new Project</Modal.Title>
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
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setDifficulty(e.target.value)}>
                            <option>Select difficulty for project</option>
                            <option value='e'>Easy</option>
                            <option value='n'>Normal</option>
                            <option value='h'>Hard</option>
                        </select>
                    </div>
                    <div className="form-group mb-2">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setDid(e.target.value)}>
                            <option>Select Department for project</option>
                            {listDept && listDept.length > 0 &&
                                listDept.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name} - {item.id}</option>
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
                <Button variant="primary" onClick={handleAddProject}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default ModalAddNewP;