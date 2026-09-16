import type { IError } from '~/types/IError';

export enum ECommonActions {
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  RESET = 'RESET',
  RESET_ALL = 'RESET_ALL',
}

export type ActionApiT = { type: string };

export interface IActionTypePayload {
  actionType: string;
}

export interface IErrorPayload {
  actionType: string;
  error?: IError;
  message?: string;
}

export interface IStateCommon {
  [ECommonActions.LOADING]: RecordType<boolean>;
  [ECommonActions.LOADED]: RecordType<boolean>;
  [ECommonActions.ERROR]: RecordType<IError>;
}
