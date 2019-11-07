import axios from 'axios';

//Online
// const endereco = 'http://quebra-galho-backend.herokuapp.com';
// export const BASEURL = 'http://quebra-galho-backend.herokuapp.com';
// export const BASEURLIMG = 'http://quebra-galho-backend.herokuapp.com/images/';
// export const BASEURLIMGAVATARUSER =
// 'http://quebra-galho-backend.herokuapp.com/images/avatar/user';

//Home
export const endereco = 'http://192.168.0.173:3001';
export const BASEURL = 'http://192.168.0.173:3001';
export const BASEURLIMG = 'http://192.168.0.173:3001/images/';
export const BASEURLIMGAVATARUSER =
  'http://192.168.0.173:3001/images/avatar/user';

//MY NTBK
// const endereco = 'http://192.168.137.1:3001';
// export const BASEURL = 'http://192.168.137.1:3001';
// export const BASEURLIMG = 'http://192.168.137.1:3001/images/';
// export const BASEURLIMGAVATARUSER = 'http://192.168.137.1:3001/images/avatar/user';

const api = axios.create({
  baseURL: endereco,
});

export default api;
