import axios from 'axios';

const apiHost = window.location.hostname === '127.0.0.1' ? '127.0.0.1' : 'localhost';
const API_BASE_URL = `http://${apiHost}:5220/api`;

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = String(originalRequest?.url ?? '');

    if (error.response?.status !== 401 || originalRequest?._retry || requestUrl.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    refreshPromise ??= apiClient
      .post<{ accessToken?: string; token?: string }>('/auth/refresh', null, { withCredentials: true })
      .then((response) => response.data.accessToken ?? response.data.token ?? null)
      .catch(() => null)
      .finally(() => {
        refreshPromise = null;
      });

    const nextToken = await refreshPromise;
    setAccessToken(nextToken);

    if (!nextToken) {
      return Promise.reject(error);
    }

    originalRequest.headers.Authorization = `Bearer ${nextToken}`;
    return apiClient(originalRequest);
  }
);

export { API_BASE_URL };
