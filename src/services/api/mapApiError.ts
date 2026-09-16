import type { IError } from '~/types/IError';

export function mapApiError(error: unknown): IError {
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
