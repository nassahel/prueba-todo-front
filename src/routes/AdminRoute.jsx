import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ element: Element, ...rest }) => {
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.userType);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (userType !== 'admin') {
    return <Navigate to="/todo" replace />;
  }

  return Element;
};

export default AdminRoute;
