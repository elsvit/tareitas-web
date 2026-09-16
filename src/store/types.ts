import type { IStateCommon } from './common/types';
import type { EStateName } from './enums';
import type { IStateSettings } from './settings/types';

export interface IState {
  [EStateName.common]: IStateCommon;
  [EStateName.settings]: IStateSettings;
}

export type Saga = (...args: unknown[]) => Generator<unknown, unknown, unknown>;
