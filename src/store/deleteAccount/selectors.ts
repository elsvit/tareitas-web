import { ECommonActions } from '~/store/common/types';
import type { RootStateT } from '~/store/store';

import { DELETE_ACCOUNT_ACTIONS } from './types';

export const selectDeleteAccount = (state: RootStateT) =>
  state.deleteAccount;

export const selectDeleteAccountStep = (state: RootStateT) =>
  state.deleteAccount.step;

export const selectDeleteAccountEmail = (state: RootStateT) =>
  state.deleteAccount.email;

export const selectDeleteAccountFamilyName = (state: RootStateT) =>
  state.deleteAccount.familyName;

export const selectDeleteAccountDeletionToken = (state: RootStateT) =>
  state.deleteAccount.deletionToken;

export const selectDeleteAccountRequestLoading = (state: RootStateT) =>
  Boolean(
    state.common[ECommonActions.LOADING][
      DELETE_ACCOUNT_ACTIONS.REQUEST
    ],
  );

export const selectDeleteAccountVerifyLoading = (state: RootStateT) =>
  Boolean(
    state.common[ECommonActions.LOADING][
      DELETE_ACCOUNT_ACTIONS.VERIFY
    ],
  );

export const selectDeleteAccountConfirmLoading = (state: RootStateT) =>
  Boolean(
    state.common[ECommonActions.LOADING][
      DELETE_ACCOUNT_ACTIONS.CONFIRM
    ],
  );

export const selectDeleteAccountRequestError = (state: RootStateT) =>
  state.common[ECommonActions.ERROR][DELETE_ACCOUNT_ACTIONS.REQUEST] ??
  null;

export const selectDeleteAccountVerifyError = (state: RootStateT) =>
  state.common[ECommonActions.ERROR][DELETE_ACCOUNT_ACTIONS.VERIFY] ??
  null;

export const selectDeleteAccountConfirmError = (state: RootStateT) =>
  state.common[ECommonActions.ERROR][DELETE_ACCOUNT_ACTIONS.CONFIRM] ??
  null;
