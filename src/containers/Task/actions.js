import { SET_TASKS } from '@containers/Task/constants';

// Action Creators
export const setTasks = (tasks) => ({
  type: SET_TASKS,
  tasks,
});
