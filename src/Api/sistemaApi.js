import axios from "axios";

const sistemaApi = axios.create({
  baseURL: process.env.REACT_APP_SISTEMA_API,
});

//TODO: Configuraciones de los interceptores

sistemaApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default sistemaApi;
