import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from ".";
import {
  decrementar,
  addToCart,
  vaciarCart,
} from "../store/slices/CarritoSlices";
import { useDispatch, useSelector } from "react-redux";
import { useVentas } from "../hooks/useVentas";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import ButtonCerrarSesion from "./ButtonCerrarSesion";
import Swal from "sweetalert2";
import { BsJournalBookmark } from "react-icons/bs";

const Carrito = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const sutbTotal = cart.reduce(
    (contador, product) => contador + product.price * product.cantidad,
    0
  );
  const { currentColor } = useStateContext();
  const { addVentas } = useVentas();
  const { user } = UseSliceAuth();

  const generarVentas = () => {
    if (sutbTotal === 0) {
      Swal.fire(
        "Realice una venta",
        "asegurese de realizar una venta para generar un detalle de ventas",
        "info"
      );
    } else {
      addVentas({ monto: sutbTotal, idUserCreateVenta: user.data.id });
      dispatch(vaciarCart());
    }
  };

  return (
    <div className="w-full px-14 py-4">
      <div>
        <ButtonCerrarSesion
          color="white"
          bgColor={currentColor}
          text="Carrito de Compras"
          borderRadius="10px"
          width="full"
        />
        {cart.length === 0 ? (
          <h1>El carrito esta vacio</h1>
        ) : (
          cart?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                  <img
                    className="rounded-lg h-[8rem] w-48"
                    src={item.image_url}
                    alt="imagen-cart"
                  />
                  <div>
                    <p className="font-semibold ">{item.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                      Precio: <strong>{item.price}</strong>
                    </p>
                    <div className="flex gap-4 mt-2 items-center">
                      <p className="font-semibold text-lg">
                        {item.price * item.cantidad}
                      </p>
                      <div className="flex items-center border-1 border-r-0 border-color rounded">
                        <button
                          onClick={() =>
                            dispatch(decrementar({ id: item.id, decre: true }))
                          }
                          className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 "
                        >
                          <AiOutlineMinus />
                        </button>
                        <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
                          {item.cantidad}
                        </p>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="mt-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">{sutbTotal}</p>
            {/* <p className="font-semibold">$890</p> */}
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">Total a pagar</p>
            <p className="font-semibold">{sutbTotal} C$</p>
          </div>
        </div>
        <div className="mt-5">
          <ButtonCerrarSesion
            color="white"
            bgColor={currentColor}
            text="Generar detalle de Venta"
            borderRadius="10px"
            width="full"
            funcion={generarVentas}
          />
        </div>
      </div>
    </div>
  );
};

export default Carrito;
