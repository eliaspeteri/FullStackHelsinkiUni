import axios from 'axios'
const url = 'http://localhost:3001/api/persons'

const getAll = () => {
    console.log('Attempting "get"...')
    return axios.get(url)
}

const create = newObject => {
    console.log('Attempting "post"...')
    return axios.post(url, newObject)
}

const update = (id, newObject) => {
    console.log('Attempting "update"...')
    return axios.put(`${url}/${id}`,newObject)
}

export default { getAll, create, update }