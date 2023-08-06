import { SET_LOCAL, SET_MESSAGES } from '@containers/Language/constants';

export function setLocale(locale) {
  return {
    type: SET_LOCAL,
    locale,
  };
}

export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    messages,
  };
}
