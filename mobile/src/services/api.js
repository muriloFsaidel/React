import axios from 'axios';

//criar uma conexão do servidor expo com o servidor backend(3333)
const api = axios.create({
    baseURL: 'http://192.168.0.12:3333',
});

export default api;