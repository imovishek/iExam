import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

export const apiLogin = async (email, password) => {
    return axios.post(`${apiUrl}/auth/login`, { email, password });
};

export const getCourses = async (courseIDs) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    console.log(config);
    return axios.get(`${apiUrl}/courses`, config).then(res => res.data);
};

export const requestApiAndGetResponse = (url, method = 'get', body = {}, query = {}) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    console.log(config);
    return axios[method.toLowerCase()](`${apiUrl}${url}`, body, config);
}

const api = {
    apiLogin,
    getCourses,
    requestApiAndGetResponse,
};

export default api;