import { createSelector } from '@reduxjs/toolkit';

import { EStateName } from '~/store/enums';
import type { IState } from '~/store/types';

export const selectSettingsState = (state: IState) =>
  state[EStateName.settings];

export const selectLanguage = createSelector(
  selectSettingsState,
  settings => settings.language,
);
