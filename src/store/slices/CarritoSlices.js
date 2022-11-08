import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

export const CarritoSlices = createSlice({
  name: "CarritoSlices",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const productExistente = state.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productExistente >= 0) {
        state[productExistente].cantidad += 1;
        toast.success(
          `Agregado al carrito x${state[productExistente].cantidad}`,
          {
            position: "top-right",
          }
        );
      } else {
        state.push({ ...action.payload, cantidad: 1 });
        toast.success(`Agregado al carrito`, {
          position: "top-center",
        });
      }

      localStorage.setItem("productos", JSON.stringify(state));
    },
    decrementar: (state, action) => {
      const product = state.findIndex(
        (produ) => produ.id === action.payload.id
      );

      if (action.payload.decre) {
        if (state[product].cantidad < 2) {
          const newVlorr = state.filter(
            (valor) => valor.id !== state[product].id
          );
          const resul = (state = newVlorr);
          localStorage.setItem("productos", JSON.stringify(state));
          return resul;
        } else {
          state[product].cantidad -= 1;
          toast.info("Eliminado del carrito", {
            position: "top-center",
          });
          localStorage.setItem("productos", JSON.stringify(state));
        }
        localStorage.setItem("productos", JSON.stringify(state));
      } else {
        state[product].cantidad += 1;
        toast.success("Añadido con exito", {
          position: "top-center",
        });
        localStorage.setItem("productos", JSON.stringify(state));
      }
    },
    vaciarCart: (state) => {
      toast.success("Se a vaciado el carrito", {
        position: "bottom-right",
      });
      const resp = (state = []);
      localStorage.setItem("productos", JSON.stringify(state));
      return resp;
    },
  },
});

export const { addToCart, decrementar, vaciarCart } = CarritoSlices.actions;
