import axios from 'axios'
import store from '../store/index'

const APIUrl = 'http://localhost:8000'

const API = axios.create({
    baseURL: APIUrl,
    headers: {
        'Content-Type': 'application/json'
    },
})


API.interceptors.request.use(
    (request) => {
        let token = store.getters.token
        if (token) {
            request.headers = {
                'Authorization': `JWT ${token}`,
            }
        }
        return request
    }
);


API.interceptors.response.use(
    (response) => {
        return response
    },

    (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            store.dispatch('refreshAccessToken')
            return API(originalRequest)
        }

        return Promise.reject(error)
    })


export {API}