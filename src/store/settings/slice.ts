import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { EStateName } from '~/store/enums';

import type { IStateSettings } from './types';

const initialState: IStateSettings = {
  language: 'en',
};

export const settingsSlice = createSlice({
  name: EStateName.settings,
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = settingsSlice.actions;
