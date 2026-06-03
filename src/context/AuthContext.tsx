import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/auth.service';
import type { LoginRequest, RegisterRequest, UserDto } from '../types/user';
import { AuthContext } from './auth-context';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        await authService.refresh();
        const currentUser = await authService.getCurrentUser();

        if (isMounted) {
          setUser(currentUser);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (payload: LoginRequest) => {
    const response = await authService.login(payload);
    setUser(response.user);
  };

  const adminLogin = async (payload: LoginRequest) => {
    const response = await authService.adminLogin(payload);
    setUser(response.user);
  };

  const register = async (payload: RegisterRequest) => {
    const response = await authService.register(payload);
    setUser(response.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'Admin',
      loading,
      login,
      adminLogin,
      register,
      logout,
      refreshUser,
    }),
    [loading, refreshUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
