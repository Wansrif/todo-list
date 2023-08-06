// reducer.js
import { SET_TASKS } from '@containers/Task/constants';
import { produce } from 'immer';
// import { uid } from 'uid';

// const tasks = [
//   {
//     id: uid(),
//     text: 'Complete online JavaScript course',
//     completed: true,
//   },
//   {
//     id: uid(),
//     text: 'Jog around the park 3x',
//     completed: false,
//   },
//   {
//     id: uid(),
//     text: '10 minutes meditation',
//     completed: false,
//   },
//   {
//     id: uid(),
//     text: 'Read for 1 hour',
//     completed: false,
//   },
//   {
//     id: uid(),
//     text: 'Pick up groceries',
//     completed: false,
//   },
//   {
//     id: uid(),
//     text: 'Complete Todo App on Frontend Mentor',
//     completed: false,
//   },
// ];

export const initialState = {
  tasks: [],
};

export const storedKey = ['tasks'];

// eslint-disable-next-line default-param-last
const tasksReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_TASKS:
        draft.tasks = action.tasks;
        break;
      default:
        break;
    }
  });

export default tasksReducer;
