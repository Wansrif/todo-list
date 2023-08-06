import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_COUNTRY_LIST } from '@containers/App/constants';
import { setCountryList } from '@containers/App//actions';
import { getCountryList } from '@domain/api';

export function* doGetCountryList() {
  try {
    const countryList = yield call(getCountryList);
    if (countryList) {
      yield put(setCountryList(countryList.slice(0, 10)));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

export default function* appSaga() {
  yield takeLatest(GET_COUNTRY_LIST, doGetCountryList);
}
