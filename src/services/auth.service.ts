import { apiClient, setAccessToken } from '../api/axios';
import type { AuthResponse, LoginRequest, RegisterRequest, UserDto } from '../types/user';

const normalizeToken = (response: AuthResponse | { accessToken?: string; token?: string }) =>
  response.accessToken ?? response.token ?? null;

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload, { withCredentials: true });
    const token = normalizeToken(response.data);
    setAccessToken(token);
    return response.data;
  },

  async adminLogin(payload: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/admin/login', payload, { withCredentials: true });
    const token = normalizeToken(response.data);
    setAccessToken(token);
    return response.data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload, { withCredentials: true });
    const token = normalizeToken(response.data);
    setAccessToken(token);
    return response.data;
  },

  async refresh(): Promise<string | null> {
    const response = await apiClient.post<{ accessToken?: string; token?: string }>('/auth/refresh', null, {
      withCredentials: true,
    });
    const token = normalizeToken(response.data);
    setAccessToken(token);
    return token;
  },

  async getCurrentUser(): Promise<UserDto> {
    const response = await apiClient.get<UserDto>('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', null, { withCredentials: true });
    } finally {
      setAccessToken(null);
    }
  },
};
