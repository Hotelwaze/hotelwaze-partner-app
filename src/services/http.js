import axios from 'axios';
import Config from 'react-native-config';

const getApiUrl = () => Config.API_URL;

const queryStringFromObject = object => {
  const qry = [];
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in object) {
    const item = object[key];
    if (Array.isArray(item)) {
      item.forEach(value => {
        qry.push(`${key}[]=${value}`);
      });
    } else {
      qry.push(`${key}=${item}`);
    }
  }
  if (qry.length === 0) {
    return '';
  }
  return `?${qry.join('&')}`;
};

const getCars = (token, partnerId) =>
  axios.get(`${getApiUrl()}/partners/${partnerId}/cars`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

const httpService = {
  getCars,
};

export default httpService;
