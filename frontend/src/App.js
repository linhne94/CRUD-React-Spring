import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import ListTable from './components/ListTable/ListTable';
import CreateNewProject from './components/ListTable/CreateNewProject';
import { ToastContainer } from 'react-toastify';
import { fetchProject } from './services/Api';
import { Route, Routes } from 'react-router-dom';


function App() {

  const [listProject, setListProject] = useState([])

  useEffect(() => {
    getProject();
    console.log("ef1")
  }, []);

  const getProject = async () => {
    let res = await fetchProject();

    if (res.data) {
      setListProject(res.data.sort((a, b) => new Date(b.insDate) - new Date(a.insDate)))
    }
    console.log(res)
    console.log("fetch1")
  }

  return (
    <>
      <Header
        listProject={listProject}
        getProject={getProject}
      />

      <Routes>
        <Route path='/' element={<ListTable
          getProject={getProject}
          listProject={listProject}

        />} />
        <Route path='/register' element={<CreateNewProject listProject={listProject} getProject={getProject} />} />
      </Routes>

      {/* <ListTable
        getProject={getProject}
        listProject={listProject}

      /> */}


      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
