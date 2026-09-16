const DEFAULT_API_URL = 'https://api.tareitas.net';

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL ?? DEFAULT_API_URL,
};
