import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.interceptors.response.use(function (response) {
    // console.log(response);
    return response
}, function (error) {
    // return Promise.reject(error);
    // console.log(Promise.reject(error))
    const statusCode = error.response.status;
    return statusCode;
});

export default instance;