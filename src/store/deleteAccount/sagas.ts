import { call, put, select } from 'redux-saga/effects';

import {
  confirmAccountDeletion,
  requestAccountDeletion,
  verifyAccountDeletion,
} from '~/services/api/authApi';
import { takeLatestWithFetchable } from '~/store/helpers/fetchableHandler';
import type { Saga } from '~/store/types';

import {
  selectDeleteAccountDeletionToken,
  selectDeleteAccountEmail,
} from './selectors';
import {
  confirmDeletion,
  confirmDeletionSuccess,
  requestDeletion,
  requestDeletionSuccess,
  verifyDeletion,
  verifyDeletionSuccess,
} from './slice';

function* requestDeletionSaga(
  action: ReturnType<typeof requestDeletion>,
): Generator {
  const { email, pin } = action.payload;

  const result = (yield call(requestAccountDeletion, {
    email: email.trim().toLowerCase(),
    pin,
  })) as Awaited<ReturnType<typeof requestAccountDeletion>>;

  yield put(
    requestDeletionSuccess({
      familyName: result.familyName,
    }),
  );
}

function* verifyDeletionSaga(
  action: ReturnType<typeof verifyDeletion>,
): Generator {
  const email = (yield select(selectDeleteAccountEmail)) as string;
  const { code } = action.payload;

  const result = (yield call(verifyAccountDeletion, {
    email,
    code,
  })) as Awaited<ReturnType<typeof verifyAccountDeletion>>;

  yield put(
    verifyDeletionSuccess({
      deletionToken: result.deletionToken,
      familyName: result.familyName,
    }),
  );
}

function* confirmDeletionSaga(): Generator {
  const deletionToken = (yield select(
    selectDeleteAccountDeletionToken,
  )) as string | null;

  if (!deletionToken) {
    throw new Error('Missing deletion token');
  }

  yield call(confirmAccountDeletion, { deletionToken });
  yield put(confirmDeletionSuccess());
}

const deleteAccountSagas = [
  takeLatestWithFetchable(
    requestDeletion,
    requestDeletionSaga as Saga,
  ),
  takeLatestWithFetchable(
    verifyDeletion,
    verifyDeletionSaga as Saga,
  ),
  takeLatestWithFetchable(
    confirmDeletion,
    confirmDeletionSaga as Saga,
  ),
];

export default deleteAccountSagas;
