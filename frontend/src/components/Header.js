import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import { fetchProject } from '../services/Api';
import '../Search.css';
import ModalInfo from './ListTable/ModalInfo';


const Header = (props) => {
    const { listProject, getProject } = props;
    const [searchInput, setSearchInput] = useState('');
    // const [dataProject, setDataProject] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);
    const [showInfo, setShowInfo] = useState(false)
    const [infoProject, setInfoProject] = useState({})

    const basicAutocomplete = useRef(null);

    // useEffect(() => {
    //     const getProject = async () => {
    //         const data = await fetchProject();
    //         if (data && data.data) {
    //             setDataProject(data.data);
    //         }
    //     };
    //     getProject();
    //     console.log("fetch header")
    // }, []);

    useEffect(() => {
        setDataFilter(listProject.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase())));
    }, [listProject, searchInput]);

    // console.log(dataFilter);

    const handleShowInfo = (project) => {
        setShowInfo(true);
        setInfoProject(project);
        setSearchInput('');
    }

    const handleCloseInfo = () => {
        setShowInfo(false);
    }

    // console.log(searchInput)

    return (<>
        <Navbar expand="lg" className="bg-secondary">
            <Container fluid>
                <Navbar.Brand href="#">Project Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">Login</Nav.Link>
                        <NavDropdown title="Link" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <div className='search-ne'>
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    ref={basicAutocomplete}
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </div>
                            <div className="search-results ">
                                {searchInput && searchInput.length > 0 && dataFilter && dataFilter.length > 0 && (
                                    <ul className='p-0'>
                                        {dataFilter.map((item, index) => (
                                            <li className="search-result-item" key={index}
                                                onClick={() => handleShowInfo(item)}
                                            >{item.name}<br /></li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {showInfo &&
            <ModalInfo
                show={showInfo}
                handleCloseInfo={handleCloseInfo}
                infoProject={infoProject}
                getProject={getProject}
            />}

    </>)
}

export default Header;