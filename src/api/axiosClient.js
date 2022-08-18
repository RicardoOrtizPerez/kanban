import axios from 'axios'
import queryString from 'query-string'

/* The base url for the api. */
const baseUrl = 'http://localhost:3000/api/'
/**
 * It returns the value of the token key in localStorage.
 */
const getToken = () => localStorage.getItem('token')

/* Creating a new axios instance with a base url and a params serializer. */
const axiosClient = axios.create({
    baseURL: baseUrl,
    paramsSerializer: params => queryString.stringify({params})
})

/* Adding a header to the request. */
axiosClient.interceptors.request.use(async config => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }
})

/* Intercepting the response and returning the data. */
axiosClient.interceptors.response.use(response => {
    if (response && response.data) return response.data
    return response
}, err => {
    if (!err.response) {
        return alert(err)
    }
    throw err.response
})

export default axiosClient