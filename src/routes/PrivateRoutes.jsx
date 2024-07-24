import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = !!token;

  return isAuthenticated ? Element : <Navigate to="/" />;
};

export default PrivateRoute;
