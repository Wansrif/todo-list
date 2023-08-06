import axios from 'axios';

const urls = {
  countryList: 'https://restcountries.com/v3.1/all',
};

export const callAPI = async (endpoint, method, headers = {}, params = {}, data = {}) => {
  const options = {
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return axios(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const getCountryList = () => callAPI(urls.countryList, 'get');
