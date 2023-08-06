import { TOGGLE_THEME } from '@containers/Theme/constants';

import { uid } from 'uid';

const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const tasks = [
  {
    id: uid(),
    text: 'Complete online JavaScript course',
    completed: true,
  },
  {
    id: uid(),
    text: 'Jog around the park 3x',
    completed: false,
  },
  {
    id: uid(),
    text: '10 minutes meditation',
    completed: false,
  },
  {
    id: uid(),
    text: 'Read for 1 hour',
    completed: false,
  },
  {
    id: uid(),
    text: 'Pick up groceries',
    completed: false,
  },
  {
    id: uid(),
    text: 'Complete Todo App on Frontend Mentor',
    completed: false,
  },
];

// Initial state
export const initialState = {
  theme: preferredTheme,
  tasks,
  // 'light' or 'dark' or 'preferedTheme'
};

export const storedKey = ['theme', 'tasks'];

// Reducer
// eslint-disable-next-line default-param-last
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export default themeReducer;
