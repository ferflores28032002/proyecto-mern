import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import { useCategorias, useProductos, useProveedores } from "../hooks/";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import Datatables from "./Datatables";

const Inventario = () => {

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "Nombres",
      selector: (row) => row.name,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
    },
    {
      name: "Opciones",
      selector: (row) => (
        <button
          onClick={()=> deleteProductos(row.id)}
        >Eliminar</button>
  
      ),
    },
  ];
  
  const { productos, loadProductos, addProductos, deleteProductos } = useProductos();
  const [closeModal, setcloseModal] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { categorias, loadcategorias } = useCategorias()
  const { proveedores, loadproveedores } = useProveedores()
  const { user } = UseSliceAuth()

  useEffect(() => {
    loadProductos();
    loadproveedores()
    loadcategorias()
  }, []);

  // Datos del formulario
  const onSubmit = (data) => {
    addProductos(data);
  };


  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        Agregar
      </button>

      <Modal closeModal={closeModal} setcloseModal={setcloseModal} titulo="Agregar nuevo producto">
        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Nombres"
            {...register("name")}
          />

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="description"
            {...register("description")}
          />

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="stock"
            {...register("stock")}
          />

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="price"
            {...register("price")}
          />

          <div>

            <select {...register("idCategories")} >

              {
                categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                ))
              }

            </select>

          </div>


          <div>

            <select {...register("idProveedor")} >

              {
                proveedores.map(proveedor => (
                  <option key={proveedor.id} value={proveedor.id}>{proveedor.name}</option>
                ))
              }

            </select>

          </div>

          <input 
            type="hidden" 
            {...register("idUserCreateProduct")} 
            value={user.data.id}
          />

          
          <input 
              type="file" 
            {...register("image")}
          
          />


          <div>
            <button>Crear producto</button>
          </div>

        </form>
      </Modal>

      <Datatables columns={columns} data={productos} />
    </div>
  );
};

export default Inventario;
