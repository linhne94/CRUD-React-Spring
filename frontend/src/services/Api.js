import axios from "./axios";

const fetchProject = () => {
    return axios.get("/projects");
}

const fetchProjectTest = (param) => {
    return axios.get(`/projectsne?${param}`);
}

const fetchDept = () => {
    return axios.get("/depts");
}

const fetchProjectSearch = (name) => {
    return axios.get(`/projects/search?name=${name}`);
}

const postCreateProject = (project) => {
    return axios.post("/projects", project);
}

const postUpdateProject = (project, id) => {
    return axios.put(`/editproject/${id}`, project);
}

const deleteProject = (id) => {
    return axios.delete(`/deleteProject/${id}`);
}

export { fetchProject, fetchProjectTest, fetchProjectSearch, postCreateProject, fetchDept, postUpdateProject, deleteProject };