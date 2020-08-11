import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then((response) => response.data)
}

const create = (personObj) => {
    const request = axios.post(baseURL, personObj)
    return request.then((response) => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseURL}/${id}`)
}

const update = (id, personObj) => {
    const request = axios.put(`${baseURL}/${id}`, personObj)
    return request.then((response) => response.data)
}

export default {getAll, create, remove, update}