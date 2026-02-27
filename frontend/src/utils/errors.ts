import axios from 'axios';

export const getErrorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as { message?: string } | undefined;
    return payload?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
