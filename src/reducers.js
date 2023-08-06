import { combineReducers } from 'redux';

import appReducer from '@containers/App/reducer';
import languageReducer, { storedKey as storedLangState } from '@containers/Language/reducer';
import themeReducer, { storedKey as storedThemeState } from '@containers/Theme/reducer';
import tasksReducer, { storedKey as storedTasksState } from '@containers/Task/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  language: { reducer: languageReducer, whitelist: storedLangState },
  theme: { reducer: themeReducer, whitelist: storedThemeState },
  tasks: { reducer: tasksReducer, whitelist: storedTasksState },
};

const temporaryReducers = {
  app: appReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
