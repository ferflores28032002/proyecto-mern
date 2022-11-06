import axios from "axios";

export const sistemaApi = axios.create({
  baseURL: process.env.REACT_APP_SISTEMA_API,
});

//TODO: Configuraciones de los interceptores
