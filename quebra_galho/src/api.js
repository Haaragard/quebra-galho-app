import axios from 'axios';

//Online
const endereco = 'http://quebra-galho-backend.herokuapp.com';

//Home
// const endereco = 'http://192.168.0.173:3001';

//MY NTBK
// const endereco = 'http://192.168.137.1:3001';

const api = axios.create({
  baseURL: endereco,
});

export default api;
