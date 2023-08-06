import { produce } from 'immer';

import { SET_GREETINGS, SET_COUNTRY_LIST } from '@containers/App/constants';

export const initialState = {
  greetings: 'Hi from web!',
  countryList: [],
};

// eslint-disable-next-line default-param-last
const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_GREETINGS:
        draft.greetings = action.greetings;
        break;
      case SET_COUNTRY_LIST:
        draft.countryList = action.countryList;
        break;
      default:
        break;
    }
  });

export default appReducer;
