// Services
import axios from 'axios';

// Constants
import {API_SECRET_KEY} from '~/constants';

// export const instance = axios.create({
//   baseURL: 'https://pokeapi.co/api/v2/',
// })

export const googleApiInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

googleApiInstance.interceptors.request.use((config) => {
  config.params.key = API_SECRET_KEY;

  return config;
});
