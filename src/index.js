import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ContextProvider } from "./contexts/ContextProvider";
import "animate.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from "./Routes/AppRoutes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ContextProvider>
          <AppRoutes />
        </ContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
