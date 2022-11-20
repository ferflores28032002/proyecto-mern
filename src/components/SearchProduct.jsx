import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import sistemaApi from "../Api/sistemaApi";

const SearchProduct = ({ setproducts, products }) => {
  const [search, setsearch] = useState("");

  useEffect(() => {
    const resultado = async () => {
      const { data } = await sistemaApi.get(`/product/${search}/names`);
      setproducts(data.data);
    };
    search  && resultado();
  }, [search, products]);

  return (
    <>
      <div
        className="w-full bg-indigo-500 shadow-2xl
    pt-8 mb-4 rounded-lg pb-8 flex justify-center items-center"
      >
        <input
          className="w-[60%] py-2 text-lg px-10 bg-white rounded-tl-3xl rounded-bl-3xl  outline-none border-none focus:border-0"
          type="text"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button className=" py-2 bg-white pr-4 outline-none rounded-br-3xl rounded-tr-3xl">
          <BiSearch className="text-blue-800" size={28} />
        </button>
      </div>


      <div>

        {search === "" && <h1>Haz tu busqueda</h1>}

      </div>
    </>
  );
};

export default SearchProduct;
