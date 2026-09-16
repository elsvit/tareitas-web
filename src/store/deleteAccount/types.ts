export type DeleteAccountStep =
  | 'credentials'
  | 'verify'
  | 'confirm'
  | 'complete';

export interface IStateDeleteAccount {
  step: DeleteAccountStep;
  email: string;
  familyName: string | null;
  deletionToken: string | null;
}

export const DELETE_ACCOUNT_ACTIONS = {
  REQUEST: 'deleteAccount/requestDeletion',
  VERIFY: 'deleteAccount/verifyDeletion',
  CONFIRM: 'deleteAccount/confirmDeletion',
} as const;
