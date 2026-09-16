import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { EStateName } from '~/store/enums';

import type { DeleteAccountStep, IStateDeleteAccount } from './types';

const initialState: IStateDeleteAccount = {
  step: 'credentials',
  email: '',
  familyName: null,
  deletionToken: null,
};

export const deleteAccountSlice = createSlice({
  name: EStateName.deleteAccount,
  initialState,
  reducers: {
    requestDeletion: (
      state,
      action: PayloadAction<{ email: string; pin: string }>,
    ) => {
      state.email = action.payload.email.trim().toLowerCase();
    },
    requestDeletionSuccess: (
      state,
      action: PayloadAction<{ familyName: string }>,
    ) => {
      state.familyName = action.payload.familyName;
      state.step = 'verify';
    },
    verifyDeletion: (_state, _action: PayloadAction<{ code: string }>) => {},
    verifyDeletionSuccess: (
      state,
      action: PayloadAction<{ deletionToken: string; familyName: string }>,
    ) => {
      state.deletionToken = action.payload.deletionToken;
      state.familyName = action.payload.familyName;
      state.step = 'confirm';
    },
    confirmDeletion: () => {},
    confirmDeletionSuccess: state => {
      state.step = 'complete';
      state.deletionToken = null;
    },
    setStep: (state, action: PayloadAction<DeleteAccountStep>) => {
      state.step = action.payload;
    },
    resetDeleteAccount: () => initialState,
  },
});

export const {
  requestDeletion,
  requestDeletionSuccess,
  verifyDeletion,
  verifyDeletionSuccess,
  confirmDeletion,
  confirmDeletionSuccess,
  setStep,
  resetDeleteAccount,
} = deleteAccountSlice.actions;
