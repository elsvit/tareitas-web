import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { commonSlice } from './common/slice';
import deleteAccountSagas from './deleteAccount/sagas';
import { deleteAccountSlice } from './deleteAccount/slice';
import { EStateName } from './enums';
import settingsSagas from './settings/sagas';
import { settingsSlice } from './settings/slice';
import type { IState } from './types';

function* rootSaga() {
  yield all([...settingsSagas, ...deleteAccountSagas]);
}

const sagaMiddleware = createSagaMiddleware();
let sagasStarted = false;

function startSagasOnce() {
  if (!sagasStarted) {
    sagaMiddleware.run(rootSaga);
    sagasStarted = true;
  }
}

function configureAppStore() {
  return configureStore({
    reducer: combineReducers({
      [EStateName.common]: commonSlice.reducer,
      [EStateName.settings]: settingsSlice.reducer,
      [EStateName.deleteAccount]: deleteAccountSlice.reducer,
    }),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: {
          ignoredActionPaths: ['payload.onSuccess'],
        },
      }).concat(sagaMiddleware),
    devTools: import.meta.env.DEV,
  });
}

export const store = configureAppStore();

startSagasOnce();

export type RootStateT = IState;
export type AppDispatch = typeof store.dispatch;
