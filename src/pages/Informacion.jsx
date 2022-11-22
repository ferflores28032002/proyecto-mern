import React, { useEffect } from "react";
import { RiStockLine } from "react-icons/ri";
import { FaProductHunt, FaUserCog } from "react-icons/fa";
import place from "../assets/imagenes/place.png";

import {
  MdAspectRatio,
  MdCalendarToday,
  MdOutlineAttachMoney,
  MdOutlineInventory,
} from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import Header from "../components/Header";
import { Navigate, useParams } from "react-router-dom";
import { SiShutterstock } from "react-icons/si";

import { useProductos } from "../hooks/useProductos";

const Informacion = () => {
  const { user } = UseSliceAuth();
  const { oneProducto, productoid } = useProductos();
  const { id } = useParams();

  useEffect(() => {
    oneProducto(id);
  }, [id]);

  if (!id) {
    return <Navigate to="/" />;
  }

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">
      <Header
        title="Productos"
        color="#fff"
        bac="#fcd34d"
        icono={<FaProductHunt />}
      />

      <div className=" m-auto px-6 sm:px-0 sm:w-10/12">
        <div className="relative group">
          <div
            role="hidden"
            className="absolute shadow-2xl inset-0 w-full h-full rounded-3xl bg-white transition duration-300  group-hover:scale-105"
          ></div>

          <div className="relative flex flex-wrap gap-6 px-14 py-10 sm:flex-nowrap">
            <div className="">
              <div className="w-[21rem]  rounded-lg">
                <img
                  src={productoid?.image_url}
                  className="w-full rounded-lg h-60"
                />

                <div className="px-4 pt-4 flex items-center gap-2">
                  <h1 className=" text-indigo-500">
                    <MdCalendarToday size={25} />
                  </h1>
                  <h1>
                    {" "}
                    <strong className="text-indigo-500">Categoria</strong>{" "}
                    {productoid?.category?.name}
                  </h1>
                </div>

                <div className="px-4 pt-1 flex items-center gap-2">
                  <h1 className=" text-yellow-500">
                    <MdAspectRatio size={25} />
                  </h1>
                  <h1>
                    <strong className="text-yellow-500">Descripcion </strong>
                    {productoid?.category?.description}
                  </h1>
                </div>

                <div className="px-4 pt-1 flex items-center gap-2">
                  <h1 className=" text-purple-500">
                    <BsCalendarDate size={25} />
                  </h1>
                  <h1>
                    {/* <strong className="text-yellow-500">Fecha Registro </strong> */}
                    {productoid?.createdAt}
                  </h1>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:w-7/12">
              <h3 className="text-2xl flex items-center gap-2 font-bold text-gray-700">
                <span className="text-indigo-500">
                  <MdOutlineInventory size={25} />
                </span>
                {productoid?.name}
              </h3>
              <p className="text-gray-600">{productoid?.description}</p>

              <span className="flex items-center gap-2 py-2 px-4 rounded-xl bg-indigo-400 text-sm text-white font-semibold">
                <RiStockLine size={24} /> Precio y Stock
              </span>

              <div className="flex  gap-10">
                <p className="text-gray-600 flex items-center">
                  <span className="text-green-500">
                    {" "}
                    <MdOutlineAttachMoney size={25} />{" "}
                  </span>
                  <span> {productoid?.price} </span>
                </p>

                <p className="text-gray-600 flex gap-1 items-center">
                  <span className="text-purple-500">
                    {" "}
                    <SiShutterstock size={19} />{" "}
                  </span>
                  <span> {productoid?.stock} </span>
                </p>
              </div>

              <span className="flex items-center gap-2 py-2 px-4 rounded-xl bg-yellow-100 text-sm text-yellow-800 font-semibold">
                <FaUserCog size={24} /> Usuario que creo el producto
              </span>

              <div className="pt-2 border-t flex gap-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={
                    productoid?.user?.image_url
                      ? productoid?.user?.image_url
                      : place
                  }
                  alt="Usuario"
                />
                <div>
                  <h6 className="text-base font-semibold text-gray-600">
                    {productoid?.user?.name}
                  </h6>
                  <span className="block text-xs tracking-wide text-gray-500">
                    {productoid?.user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informacion;
