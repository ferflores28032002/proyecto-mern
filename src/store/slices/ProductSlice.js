import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    getProductos: (state, { payload }) => {
      state.product = payload;
    },
  },
});

export const { getProductos } = ProductSlice.actions;
