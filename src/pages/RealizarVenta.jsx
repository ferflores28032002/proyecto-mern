import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import SearchProduct from "../components/SearchProduct";
import { UseProduct } from "../store/hooks/UseProduct";

const RealizarVenta = () => {
  // const { getProducts } = UseProduct();
  // const [products, setproducts] = useState([]);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    // <div className=" px-2 md:p-10 bg-white rounded-3xl min-h-[70vh]">
    //   <SearchProduct setproducts={setproducts} />

    //   <div className="grid-cols-1  grid sm:grid-cols-4 gap-2">
    //     {products != undefined ? (
    //       products.map((producto) => (
    //         <CardProduct key={producto.id} producto={producto} />
    //       ))
    //     ) : (
    //       <h1 className="w-full text-center font-semibold py-4 rounded-lg bg-blue-800 text-white col-span-4">
    //         Producto no encontrado
    //       </h1>
    //     )}
    //   </div>
    // </div>

    <>
      hola
    </>
  );
};

export default RealizarVenta;
