import { useState } from "react";
import CardProduct from "../components/CardProduct";
import SearchProduct from "../components/SearchProduct";

const RealizarVenta = () => {
  const [products, setproducts] = useState([]);

  return (
    <div className=" px-2 md:p-10 bg-white rounded-3xl min-h-[70vh]">
      <SearchProduct setproducts={setproducts} products={products} />

      <div className="grid-cols-1  grid sm:grid-cols-4 gap-2">
        {products != undefined ? (
          products.map((producto) => (
            <CardProduct key={producto.id} producto={producto} />
          ))
        ) : (
          <h1 className="w-full text-center py-4 rounded-lg bg-indigo-500 text-white col-span-4">
            Producto no encontrado
          </h1>
        )}
      </div>
    </div>
  );
};

export default RealizarVenta;
