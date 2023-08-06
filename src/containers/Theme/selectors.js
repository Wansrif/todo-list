import { createSelector } from 'reselect';
import { initialState } from '@containers/Theme/reducer';

const selectTheme = (state) => state.theme || initialState;

export const selectThemeMode = createSelector(selectTheme, (state) => state.theme);
