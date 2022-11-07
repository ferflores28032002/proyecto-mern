import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { UseSliceAuth } from "../store/hooks/UseSliceAuth";

export const PrivateRoutes = ({ children }) => {
  const { status, checkAuthToken } = UseSliceAuth();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return status ? children : <Navigate to="/login" />;
};
