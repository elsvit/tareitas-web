import { apiFetch, parseApiJson } from './client';

export type RequestAccountDeletionPayload = {
  email: string;
  pin: string;
};

export type RequestAccountDeletionResponse = {
  success: boolean;
  familyName: string;
};

export type VerifyAccountDeletionPayload = {
  email: string;
  code: string;
};

export type VerifyAccountDeletionResponse = {
  success: boolean;
  deletionToken: string;
  familyName: string;
};

export type ConfirmAccountDeletionPayload = {
  deletionToken: string;
};

export type ConfirmAccountDeletionResponse = {
  success: boolean;
};

export async function requestAccountDeletion(
  payload: RequestAccountDeletionPayload,
) {
  const response = await apiFetch('/auth/delete-account/request', {
    method: 'POST',
    body: payload,
  });

  return parseApiJson<RequestAccountDeletionResponse>(response);
}

export async function verifyAccountDeletion(
  payload: VerifyAccountDeletionPayload,
) {
  const response = await apiFetch('/auth/delete-account/verify', {
    method: 'POST',
    body: payload,
  });

  return parseApiJson<VerifyAccountDeletionResponse>(response);
}

export async function confirmAccountDeletion(
  payload: ConfirmAccountDeletionPayload,
) {
  const response = await apiFetch('/auth/delete-account/confirm', {
    method: 'POST',
    body: payload,
  });

  return parseApiJson<ConfirmAccountDeletionResponse>(response);
}
