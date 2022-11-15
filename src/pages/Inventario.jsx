import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import { useCategorias, useForms, useProductos, useProveedores } from "../hooks/";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import Datatables from "./Datatables";
import {MdDelete, MdOutlineInventory} from 'react-icons/md'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import { sistemaApi } from "../Api";
import { Header } from "../components";

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
        <div className="flex gap-2 items-center">
          <button
            className="p-1 rounded-lg bg-red-500"
            onClick={() => deleteProductos(row.id)}
          >
            <MdDelete size={20} className="text-white" />
          </button>
          <button
            className="p-1 rounded-lg bg-blue-600"
            onClick={()=>editar(row.id)}
          >
            <HiOutlinePencilAlt className="text-white" size={20} />
          </button>
        </div>
      ),
    },
  ];

  const { productos, loadProductos, addProductos, deleteProductos, editProducts } = useProductos();
  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { categorias, loadcategorias } = useCategorias();
  const { proveedores, loadproveedores } = useProveedores();
  const { user } = UseSliceAuth();
  const { setFormState, formState, onInputChange, onResetForm,name, description, stock, price, idCategories, idProveedor  } = useForms({ name: "", description: "", stock:"", price:"", idCategories:"",  idProveedor:""})

  useEffect(() => {
    loadProductos();
    loadproveedores();
    loadcategorias();
  }, [closeModal, closeModal2]);


const editar = async (id) => {
  const { data } = await sistemaApi.get(`/product/${id}`)
  setFormState(data.data)
  setcloseModal2(!closeModal2)
}


  const onSubmit = (data) => {
    addProductos(data);
    reset()
  };


  const editarProductos = (e) => {
    e.preventDefault()
    editProducts({...formState,image: e.target.image.files })


  }

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">

      <Header title="Inventario" bac="#22d3ee" color="#ecfccb" icono={<MdOutlineInventory/>} />

      <button className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400" onClick={() => setcloseModal(!closeModal)}>
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
            <select
              {...register("idCategories")}
              className="w-full py-2 outline-none focus:outline-indigo-200"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select {...register("idProveedor")} className="w-full">
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.name}
                </option>
              ))}
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
            className="
              file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
              file:px-4 file:py-1 file:m-2
              file:border-none
              file:rounded-full
              file:text-white
              file:cursor-pointer
              file:shadow-lg file:shadow-blue-600/50
              font-semibold
              text-white/80
              text-indigo-400
              pr-4
              rounded-full
              cursor-pointer
              shadow-lg shadow-gray-700/30


            "
          />

          <div className="block">
            <button className="mt-4 py-2 px-4 rounded-lg text-center w-full bg-indigo-600 hover:bg-indigo-800 text-white">
              Crear producto
            </button>
          </div>
        </form>
      </Modal>


      {/* ========================== editar ================================ */}


      
      <Modal closeModal={closeModal2} setcloseModal={setcloseModal2} titulo="editar nuevo producto">
        <form onSubmit={editarProductos}>
          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Nombres"
            name="name"
            onChange={onInputChange}
            value={name}
          />

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="description"
            name="description"
            onChange={onInputChange}
            value={description}
          />

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="stock"
            name="stock"
            onChange={onInputChange}
            value={stock}
          />

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="price"
            name="price"
            onChange={onInputChange}
            value={price}
          />

          <div>
            <select
              name="idCategories"
              onChange={onInputChange}
              value={idCategories}
              className="w-full py-2 outline-none focus:outline-indigo-200"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select 
             name="idProveedor"
              onChange={onInputChange}
              value={idProveedor}
              className="w-full">
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="file"
            name="image"
            className="
              file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
              file:px-4 file:py-1 file:m-2
              file:border-none
              file:rounded-full
              file:text-white
              file:cursor-pointer
              file:shadow-lg file:shadow-blue-600/50
              font-semibold
              text-white/80
              text-indigo-400
              pr-4
              rounded-full
              cursor-pointer
              shadow-lg shadow-gray-700/30


            "
          />

          <div className="block">
            <button className="mt-4 py-2 px-4 rounded-lg text-center w-full bg-indigo-600 hover:bg-indigo-800 text-white">
              Editar producto
            </button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={productos} />
    </div>
  );
};

export default Inventario;
