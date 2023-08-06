import { SET_GREETINGS, GET_COUNTRY_LIST, SET_COUNTRY_LIST } from '@containers/App/constants';

export const setGreetings = (greetings) => ({
  type: SET_GREETINGS,
  greetings,
});

export const getCountryList = () => ({
  type: GET_COUNTRY_LIST,
});

export const setCountryList = (countryList) => ({
  type: SET_COUNTRY_LIST,
  countryList,
});
