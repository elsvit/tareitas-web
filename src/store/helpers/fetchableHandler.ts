import type { Action } from '@redux-saga/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, type ForkEffect } from 'redux-saga/effects';

import { mapApiError } from '~/services/api/mapApiError';
import type { Saga } from '~/store/types';
import {
  setError,
  setLoaded,
  setLoading,
  type ActionApiT,
} from '~/store/common';

export function* captureError(_error: unknown, _context?: unknown) {
  // Future: add notification / error tracking here.
}

export const withFetchable = ({
  saga,
  onError,
  context,
  actionType,
}: {
  saga: Saga;
  onError?: unknown;
  context?: unknown;
  actionType: ActionApiT;
}) =>
  function* withFetchableSaga(action: PayloadAction<unknown>) {
    try {
      yield put(setLoading({ actionType: actionType.type }));
      yield call(saga, action);
      yield put(setLoaded({ actionType: actionType.type }));
    } catch (error: unknown) {
      yield captureError(error, context);

      yield put(
        setError({
          actionType: actionType.type,
          error: mapApiError(error),
        }),
      );

      if (onError != null) {
        yield onError;
      }
    }
  };

export function takeLatestWithFetchable(
  actionType: ActionApiT,
  saga: Saga,
  options?: { onError?: unknown; context?: unknown },
): ForkEffect<never> {
  const { onError, context } = options ?? {};
  const wrappedSaga = withFetchable({
    saga,
    onError,
    context,
    actionType,
  });

  return takeLatest(actionType.type, wrappedSaga as Saga);
}
