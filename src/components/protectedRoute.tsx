import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie'; 

type ProtectedRouteProps = RouteProps & {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = Cookies.get('admintoken');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/pagenotfound" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
