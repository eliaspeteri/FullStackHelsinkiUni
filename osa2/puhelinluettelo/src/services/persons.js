import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(url)
}

const create = newObject => {
    return axios.post(url, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${url}/${id}`,newObject)
}

export default { getAll, create, update }