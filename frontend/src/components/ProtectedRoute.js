import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Kiểm tra điều kiện không xác thực
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
