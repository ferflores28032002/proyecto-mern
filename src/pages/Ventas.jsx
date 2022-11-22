import { Header } from "../components";
import { FcSalesPerformance } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GiReceiveMoney } from "react-icons/gi";
import React, { useEffect } from "react";
import Datatables from "./Datatables";
import { MdDelete } from "react-icons/md";
import { useVentas } from "../hooks/useVentas";

const Ventas = () => {
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "Usuario",
      selector: (row) => (
        <div className="flex gap-3 items-center">
          <img
            src={row.user?.image_url}
            className="w-9 shadow-2xl  h-9 rounded-full object-cover "
          />

          <span>{row.user?.name}</span>
        </div>
      ),
    },
    {
      name: "Fecha De venta",
      selector: (row) => row.createdAt,
    },
    {
      name: "Monto de venta",
      selector: (row) =><><span>C$</span> {row.monto}</>,
    },
    {
      name: "Opciones",
      selector: (row) => (
        <div className="flex gap-2 items-center">
          <button
            className="p-1 rounded-lg bg-red-500"
            onClick={() => deleteVentas(row.id)}
          >
            <MdDelete size={25} className="text-white" />
          </button>
        </div>
      ),
    },
  ];

  const { datos, deleteVentas, ventas } = useVentas();

  useEffect(() => {
    ventas();
  }, []);

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">
      <Header title="Ventas" icono={<FcSalesPerformance />} />

      <Link
        to="/realizarventas"
        className="py-2 px-6 w-48 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
      >
        <GiReceiveMoney size={21} />
        Nueva venta
      </Link>

      <Datatables columns={columns} data={datos} buscador={true} />
    </div>
  );
};

export default Ventas;
