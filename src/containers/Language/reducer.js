import merge from 'lodash/merge';
import { produce } from 'immer';

import id from '@languages/id';
import en from '@languages/en';

import { SET_LOCAL, SET_MESSAGES } from '@containers/Language/constants';

export const initialState = {
  locale: 'id',
  messages: {
    id: { ...id },
    en: { ...en },
  },
};

export const storedKey = ['locale'];

// eslint-disable-next-line default-param-last
const languageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCAL:
        draft.locale = action.locale;
        break;
      case SET_MESSAGES:
        draft.messages = merge(draft.messages, action.messages);
        break;
      default:
        break;
    }
  });

export default languageReducer;
