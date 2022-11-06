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
    onchecking: (state) => {
      state.status = false;
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = true;
      state.user = payload;
      state.errorMessage = payload.msg;
    },
    Logout: (state) =>{
      state.status = false;
      state.user = {};
      state.errorMessage = undefined;
    }
  },
});

export const { onchecking, onLogin } = authSlice.actions;
