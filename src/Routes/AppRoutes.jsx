import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "../App";
import { EmailPassword, Login, UserPassword } from "../components";

import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />

        <Route path="/user/password/:id" element={<UserPassword />} />
        <Route path="/email/password" element={<EmailPassword />} />

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
