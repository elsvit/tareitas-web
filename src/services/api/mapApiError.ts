import type { IError } from '~/types/IError';

import { ApiError } from './client';

export function mapApiError(error: unknown): IError {
  if (error instanceof ApiError) {
    return {
      code: 'API_ERROR',
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'Something went wrong',
  };
}
