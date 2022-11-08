import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardProduct from "../components/CardProduct";
import SearchProduct from "../components/SearchProduct";
// import { CardProduct } from "../components";
import { UseProduct } from "../store/hooks/UseProduct";

const RealizarVenta = () => {
  const { getProducts } = UseProduct();
  // const { product } = useSelector((state) => state.product);
  const [products, setproducts] = useState([])


  console.log(products)

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className=" px-2 md:p-10 bg-white rounded-3xl min-h-[70vh]">

      <SearchProduct setproducts={setproducts} />

      <div className="grid-cols-1  grid sm:grid-cols-4 gap-2">
        {(products != undefined) ? (
          products.map((producto) => <CardProduct key={producto.id} producto={producto} />)
        ) : (
          <h1 className="w-full text-center font-semibold py-4 rounded-lg bg-blue-800 text-white col-span-4">
            Producto no encontrado 
          </h1>
        )}
      </div>
    </div>
  );
};

export default RealizarVenta;
