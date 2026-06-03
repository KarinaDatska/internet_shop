import { createContext } from 'react';
import type { LoginRequest, RegisterRequest, UserDto } from '../types/user';

export interface AuthContextType {
  user: UserDto | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  adminLogin: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
