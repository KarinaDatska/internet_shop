import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-[#f6f6f4] flex items-center justify-center text-gray-500">Завантаження...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={adminOnly ? "/Admin/Login" : "/Login"} state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/Profile" replace />;
  }

  return <>{children}</>;
};
