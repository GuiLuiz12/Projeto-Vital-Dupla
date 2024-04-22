import axios from 'axios'

//Declarar a porta da api
const portaApi = '4466'

//Declarar ip da maquina
const ip = '172.16.39.103'

const apiUrlLocal = `http://${ip}:${portaApi}/api`

export const api = axios.create({
    baseURL : apiUrlLocal
})

export default api;