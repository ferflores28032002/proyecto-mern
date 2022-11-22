import { useEffect } from "react";
import {
  useCategorias,
  useEmpleados,
  useProductos,
  useUsuarios,
} from "../hooks/";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { BsJournalBookmark } from "react-icons/bs";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { empleados, loadempleados } = useEmpleados();
  const { usuarios, loadusuarios } = useUsuarios();
  const { productos, loadProductos } = useProductos();
  const { categorias, loadcategorias } = useCategorias();

  useEffect(() => {
    loadempleados();
    loadusuarios();
    loadProductos();
    loadcategorias();
  }, []);

  return (
    <div className="m-8 ">
      <div className="flex justify-center flex-wrap gap-2 items-center">
        <div className=" relative bg-white shadow-2xl dark:text-gray-200 dark:bg-secondary-dark-bg p-6 flex gap-5 items-center  rounded-2xl ">
          <button
            type="button"
            style={{ color: "#ffffff", backgroundColor: "rgb(254, 201, 15)" }}
            className=" opacity-0.9 rounded-full p-3  hover:drop-shadow-xl"
          >
            <MdOutlineSupervisorAccount size={40} />
          </button>
          <div>
            <p className="mt-3">
              <span className="text-lg pl-6 text-[1.6rem] font-semibold">
                {empleados.length}
              </span>
            </p>
            <p className="text-xl text-gray-400  mt-1">Empleados </p>
          </div>

          <span className="absolute rounded-bl-lg rounded-br-lg left-0 bottom-0 w-full h-2 bg-yellow-500"></span>
        </div>

        <div className=" relative bg-white shadow-2xl dark:text-gray-200 dark:bg-secondary-dark-bg p-6 flex gap-5 items-center  rounded-2xl ">
          <span className="absolute rounded-bl-lg rounded-br-lg left-0 bottom-0 w-full h-2 bg-[#3b82f6]"></span>
          <button
            type="button"
            style={{ color: "#ffffff", backgroundColor: "#3b82f6" }}
            className=" opacity-0.9 rounded-full p-4  hover:drop-shadow-xl"
          >
            <FaUserTie size={37} />
          </button>
          <div>
            <p className="mt-3">
              <span className="text-lg pl-6 text-[1.6rem] font-semibold">
                {usuarios.length}
              </span>
            </p>
            <p className="text-xl text-gray-400  mt-1">Usuarios </p>
          </div>
        </div>

        <div className=" relative bg-white shadow-2xl dark:text-gray-200 dark:bg-secondary-dark-bg p-6 flex gap-5 items-center  rounded-2xl ">
          <span className="absolute rounded-bl-lg rounded-br-lg left-0 bottom-0 w-full h-2 bg-[#c026d3]"></span>
          <button
            type="button"
            style={{ color: "#ffffff", backgroundColor: "#c026d3" }}
            className=" opacity-0.9 rounded-full p-4  hover:drop-shadow-xl"
          >
            <GoProject size={35} />
          </button>
          <div>
            <p className="mt-3">
              <span className="text-lg pl-6 text-[1.6rem] font-semibold">
                {productos.length}
              </span>
            </p>
            <p className="text-xl text-gray-400  mt-1">Productos </p>
          </div>
        </div>

        <div className="relative bg-white shadow-2xl dark:text-gray-200 dark:bg-secondary-dark-bg p-6 flex gap-5 items-center  rounded-2xl ">
          <span className="absolute rounded-bl-lg rounded-br-lg left-0 bottom-0 w-full h-2 bg-[#4ade80]"></span>
          <button
            type="button"
            style={{ color: "#ffffff", backgroundColor: "#4ade80" }}
            className=" opacity-0.9 rounded-full p-4  hover:drop-shadow-xl"
          >
            <GiProgression size={35} />
          </button>
          <div>
            <p className="mt-3">
              <span className="text-lg pl-6 text-[1.6rem] font-semibold">
                {categorias.length}
              </span>
            </p>
            <p className="text-xl text-gray-400  mt-1">Categorias </p>
          </div>
        </div>
      </div>

      <div className="px-12 pt-12">
        <span className="flex justify-center  items-center gap-2 py-2 px-4 rounded-sm bg-indigo-400 text-sm text-white font-semibold">
          <BsJournalBookmark size={24} /> Productos que tienen poco stock
        </span>
      </div>

      <div className="mt-4">
        <BarChart
          width={980}
          height={300}
          data={productos}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 3, right: 3 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="stock" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
