import {get} from 'lodash';
import {API_SECRET_KEY} from '~/constants';

const BASE_URL = 'https://maps.googleapis.com/maps/api';

export const googleServices = {
  autoComplete: async (query: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/place/autocomplete/json?input=${query}&key=${API_SECRET_KEY}`,
        {
          method: 'GET',
        },
      ).then((response) => {
        console.log('🚀 ~ response:', response.json(), response);
      });

      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getDetail: async (placeId?: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/place/details/json?place_id=${placeId}&key=${API_SECRET_KEY}`,
        {
          method: 'GET',
          mode: 'no-cors',
        },
      );

      const data = await response.json();

      return get(data, 'result', {});
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
