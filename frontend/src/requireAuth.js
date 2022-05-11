/* eslint-disable */
import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth() {
  const userID = localStorage.getItem('userID');
  const location = useLocation();

    return (
        (userID)
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}