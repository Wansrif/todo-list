import { createSelector } from 'reselect';
import { initialState } from '@containers/Task/reducer';

const selectTask = (state) => state.tasks || initialState;

export const selectTasks = createSelector(selectTask, (state) => state.tasks);
