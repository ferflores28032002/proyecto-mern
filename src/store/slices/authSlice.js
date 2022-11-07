import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, //'autehticated' // 'not-autehnticated'
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    onChecking: (state) => {
      state.status = false;
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = true;
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = false;
      state.user = {};
      state.errorMessage = payload;
    },
    Logout: (state) => {
      state.status = false;
      state.user = {};
      state.errorMessage = undefined;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage, Logout } = authSlice.actions;
