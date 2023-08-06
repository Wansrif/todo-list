import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectAppState = (state) => state.app || initialState;

const selectGreetings = createSelector(selectAppState, (state) => state.greetings);
const selectCountryList = createSelector(selectAppState, (state) => state.countryList);

export { selectGreetings, selectCountryList };
