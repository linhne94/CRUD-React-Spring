import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ModalAddNewP from './ModalAddNewP';
import ModalUpdateP from './ModalUpdateP';
import ModalDeleteP from './ModalDeleteP';
import { Pagination } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const itemsPerPage = 5;

const ListTable = (props) => {
    const { listProject, getProject } = props;
    // const [listProject, setListProject] = useState([]);
    const [dataProject, setDataProject] = useState([]);

    const [showModalAddNewP, setshowModelAddNewP] = useState(false);
    const [showModalUpdateP, setshowModelUpdateP] = useState(false);
    const [showModalDeleteP, setshowModelDeleteP] = useState(false);

    const [projectList, setProjectList] = useState([]);
    const [sortDate, setSortDate] = useState(false)

    useEffect(() => {
        setProjectList(listProject)

    }, [listProject])


    const handleClickInsDate = () => {
        setSortDate(!sortDate);
        sortData(sortDate)
    }

    const handleClose = () => {
        setshowModelAddNewP(false);
        setshowModelUpdateP(false);
        setshowModelDeleteP(false);
    }

    const handleEditProject = (project) => {
        setshowModelUpdateP(true);
        setDataProject(project);
    }

    const handleDeleteProject = (project) => {
        setshowModelDeleteP(true);
        setDataProject(project);

    }
    /////// pagination 
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = projectList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(projectList.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    /////////////////////

    const sortData = (sortDate) => {
        if (sortDate) {
            setProjectList(projectList.sort((a, b) => new Date(b.insDate) - new Date(a.insDate)))
        } else {
            setProjectList(projectList.sort((a, b) => new Date(a.insDate) - new Date(b.insDate)))
        }
    };


    return (<>
        <div className="container position-relative">
            <div className='my-3'>
                <span className='fs-1'>List Project</span>
            </div>
            <div>
                <div>

                    {/* <button type="button"
                            className="btn btn-success mb-3"
                            onClick={() => { setshowModelAddNewP(true) }}
                        >Register</button> */}
                    <NavLink to="/register"><button type="button"
                        className="btn btn-success mb-3"
                        onClick={() => { setshowModelAddNewP(true) }}
                    >Register</button></NavLink>
                </div>

                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Project ID</th>
                            <th>Project Name</th>
                            <th>Difficulty</th>
                            <th>Department</th>
                            <th>Version</th>
                            <th>Insert Date
                                <button className='border rounded'
                                    onClick={handleClickInsDate}><i className="fa-solid fa-up-down"></i>
                                </button>
                            </th>
                            <th>Update Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems && currentItems.length > 0 &&
                            currentItems.map((item, index) => {
                                const formattedInsDate = new Date(item.insDate).toLocaleDateString('en-GB');
                                const formattedUpdDate = new Date(item.updDate).toLocaleDateString('en-GB');

                                return (
                                    <tr key={`project-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.difficulty === 'e' ? 'Easy' :
                                            item.difficulty === 'n' ? 'Normal' :
                                                item.difficulty === 'h' ? 'Hard' : item.difficulty
                                        }
                                        </td>
                                        <td>{item.dept.name}</td>
                                        <td>{item.version}</td>
                                        <td>{formattedInsDate}</td>
                                        <td>{formattedUpdDate}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary mx-2" onClick={() => { handleEditProject(item) }}>Edit</button>
                                            <button type="button" className="btn btn-danger " onClick={() => { handleDeleteProject(item) }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div className='container d-flex justify-content-center'>
                    <nav>
                        <Pagination>
                            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>{index + 1}</Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        </Pagination>
                    </nav>
                    {/* <Pagination>
                        <Pagination.Prev />
                        <Pagination.Item>{index + 1}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination> */}
                </div>

            </div>
            {showModalAddNewP &&
                <ModalAddNewP
                    listProject={listProject}
                    show={showModalAddNewP}
                    handleClose={handleClose}
                    getProject={getProject}
                />}
            {showModalUpdateP &&
                <ModalUpdateP
                    show={showModalUpdateP}
                    handleClose={handleClose}
                    getProject={getProject}
                    dataProject={dataProject}
                />}
            {showModalDeleteP &&
                <ModalDeleteP
                    show={showModalDeleteP}
                    handleClose={handleClose}
                    getProject={getProject}
                    dataProject={dataProject}
                />}
        </div>
    </>)
}

export default ListTable;