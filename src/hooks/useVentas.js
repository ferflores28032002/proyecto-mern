import { useState } from "react";
import Swal from "sweetalert2";
import { sistemaApi } from "../Api";

export const useVentas = () => {
  const [datos, setDatos] = useState([]);

  const ventas = async () => {
    const { data } = await sistemaApi.get("/ventas");
    setDatos(data.ventas);
  };

  const addVentas = async ({ monto, idUserCreateVenta }) => {
    try {
      const data = await sistemaApi.post("/ventas", {
        monto,
        idUserCreateVenta,
      });

      if (data.status === 200) {
        Swal.fire(
          "Venta exitosa",
          "Se añadio un detalle de venta en el modelo ventas",
          "success"
        );
      }

      ventas();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVentas = async (id) => {
    const venta = await sistemaApi.delete(`/ventas/${id}`);

    if (venta.status === 200) {
      Swal.fire(
        "Venta Eliminada",
        "Se ha eliminado exitosamente la venta",
        "success"
      );
    }

    ventas();
  };

  return {
    datos,
    ventas,
    deleteVentas,
    addVentas,
  };
};
