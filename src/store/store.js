import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { CarritoSlices } from "./slices/CarritoSlices";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: CarritoSlices.reducer,
  },
});
