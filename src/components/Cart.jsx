import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from ".";
import { decrementar, addToCart } from "../store/slices/CarritoSlices";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const sutbTotal = cart.reduce((contador,product) => contador + product.price * product.cantidad,0);

  const { currentColor } = useStateContext();

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0   ">
      <div className="float-right min-h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-[32rem] p-8" id="scroll">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Carrito de compras</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        {cart.length === 0 ? (
          <h1>El carrito esta vacio</h1>
        ) : (
          cart.slice(0,3)?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                   <img
                    className="rounded-lg h-80 w-24"
                    src={item.image_url}
                    alt="imagen-cart"
                  /> 
                  <div>
                    <p className="font-semibold ">{item.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                      Precio: <strong>{item.price}</strong>
                    </p>
                    <div className="flex gap-4 mt-2 items-center">
                      <p className="font-semibold text-lg">{item.price * item.cantidad}</p>
                      <div className="flex items-center border-1 border-r-0 border-color rounded">
                        <button 
                          onClick={()=> dispatch(decrementar({ id: item.id, decre: true })) }
                          className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 ">
                          <AiOutlineMinus />
                        </button>
                        <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
                          {item.cantidad}
                        </p>
                        <button
                          onClick={()=> dispatch( addToCart( item ) ) }
                          className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
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
          <Button
            color="white"
            bgColor={currentColor}
            text="Generar Venta"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
