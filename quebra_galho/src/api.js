import axios from 'axios';

// Online -> Heroku(Diogo)
// const endereco = 'http://quebra-galho-backend.herokuapp.com';
// export const BASEURL = 'http://quebra-galho-backend.herokuapp.com';
// export const BASEURLIMG = 'http://quebra-galho-backend.herokuapp.com/images/';
// export const BASE_URL_IMG_AVATAR_USER =
//   'http://quebra-galho-backend.herokuapp.com/images/user/avatar';

// Home -> Diogo
export const endereco = 'http://192.168.0.173:3001';
export const BASE_URL = 'http://192.168.0.173:3001';
export const BASE_URL_IMG = 'http://192.168.0.173:3001/images/';
export const BASE_URL_IMG_AVATAR_USER =
  'http://192.168.0.173:3001/images/user/avatar';

// MY NTBK -> Diogo
//  const endereco = 'http://192.168.25.13:3001';
//  export const BASEURL = 'http://192.168.25.13:3001';
//  export const BASEURLIMG = 'http://192.168.25.13:3001/images/';
//  export const BASE_URL_IMG_AVATAR_USER =
//    'http://192.168.25.13:3001/images/user/avatar';

// Home -> Rafael
// export const endereco = 'http://192.168.25.14:3001';
// export const BASE_URL = 'http://192.168.25.14:3001';
// export const BASE_URL_IMG = 'http://192.168.25.14:3001/images/';
// export const BASE_URL_IMG_AVATAR_USER =
//   'http://192.168.25.14:3001/images/user/avatar';

// Home -> Gustavo
// export const endereco = 'http://192.168.15.7:3001';
// export const BASE_URL = 'http://192.168.15.7:3001';
// export const BASE_URL_IMG = 'http://192.168.15.7:3001/images/';
// export const BASE_URL_IMG_AVATAR_USER =
//   'http://192.168.15.7:3001/images/user/avatar';

const api = axios.create({
  baseURL: endereco,
});

export default api;
