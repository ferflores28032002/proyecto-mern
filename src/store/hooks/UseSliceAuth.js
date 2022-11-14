import { useDispatch, useSelector } from "react-redux";
import { sistemaApi } from "../../Api";
import {
  clearErrorMessage,
  Logout,
  onChecking,
  onLogin,
  onLogout,
} from "../slices/authSlice";

export const UseSliceAuth = () => {

  const { user, status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ name, password }) => {

    try {

      dispatch(onChecking());
      const { data } = await sistemaApi.post("/login/user", { name, password });

      const resp = await sistemaApi.get(`/user/${data.usuario.id}`);
      localStorage.setItem("token", data.token);
      dispatch(onLogin(resp.data));

      
    } catch (error) {
      dispatch(onLogout("¡Credenciales Incorrectas!"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
      console.log(error);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await sistemaApi.get("/renew/token");
      const resp = await sistemaApi.get(`/user/${data.id}`);
      localStorage.setItem("token", data.token);
      dispatch(onLogin(resp.data));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const UserLogout = () => {
    dispatch(Logout());
    localStorage.removeItem("productos");
    localStorage.removeItem("token");
  };

  return {
    // Atributos
    user,
    status,
    errorMessage,

    // Métodos
    startLogin,
    checkAuthToken,
    UserLogout,
  };
};
