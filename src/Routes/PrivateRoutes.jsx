import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const { status } = useSelector((store) => store.auth);

  return status ? children : <Navigate to="/login" />;
};
