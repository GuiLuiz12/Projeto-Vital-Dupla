import axios from 'axios'

//Declarar a porta da api
const portaApi = '4466'

//Declarar ip da maquina
const ip = '192.168.21.128'

const apiUrlLocal = `http://${ip}:${portaApi}/api`

const api = axios.create({
    baseURL : apiUrlLocal
})

export default api;