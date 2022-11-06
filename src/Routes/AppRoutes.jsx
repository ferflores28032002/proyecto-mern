import { Route, Routes } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <App />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};
