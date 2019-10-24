import axios from 'axios';

//Online
// const endereco = 'https://quebra-galho-backend.herokuapp.com';

//Home
const endereco = 'http://192.168.0.172:3001';

//MY NTBK
// const endereco = 'http://192.168.137.1:3001';

const api = axios.create({
  baseURL: endereco,
});

export default api;
