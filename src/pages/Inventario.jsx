import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import {
  useCategorias,
  useForms,
  useProductos,
  useProveedores,
} from "../hooks/";
import { UseSliceAuth } from "../store/hooks/UseSliceAuth";
import Datatables from "./Datatables";
import { MdDelete, MdOutlineInventory } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { sistemaApi } from "../Api";
import { Header } from "../components";
import { BsCalendarPlus, BsFillBagPlusFill } from "react-icons/bs";
import { TbClipboardPlus } from "react-icons/tb";
import { SiShutterstock } from "react-icons/si";
import { GiReceiveMoney } from "react-icons/gi";
import { CiSaveDown2 } from "react-icons/ci";
import { CgShutterstock } from "react-icons/cg";
import { Loading } from "../helpers/Loading";

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
      name: "Categoria",
      selector: (row) => row.category?.name,
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
            onClick={() => editar(row.id)}
          >
            <HiOutlinePencilAlt className="text-white" size={20} />
          </button>
        </div>
      ),
    },
  ];

  const {
    productos,
    loadProductos,
    addProductos,
    deleteProductos,
    editProducts,
    loading
  } = useProductos();
  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { categorias, loadcategorias } = useCategorias();

  const { user } = UseSliceAuth();
  const {
    setFormState,
    formState,
    onInputChange,
    onResetForm,
    name,
    description,
    stock,
    price,
    idCategories,
  } = useForms({
    name: "",
    description: "",
    stock: "",
    price: "",
    idCategories: "",
  });

  useEffect(() => {
    loadProductos();
    loadcategorias();
  }, [closeModal, closeModal2]);

  const editar = async (id) => {
    const { data } = await sistemaApi.get(`/product/${id}`);
    setFormState(data.data);
    setcloseModal2(!closeModal2);
  };

  const onSubmit = (data) => {
    addProductos(data);
    reset();
  };

  const editarProductos = (e) => {
    e.preventDefault();
    editProducts({ ...formState, image: e.target.image.files });
  };


  if(loading) {
    return <Loading/>
  } 
  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">
      <Header
        title="Inventario"
        bac="#22d3ee"
        color="#ecfccb"
        icono={<MdOutlineInventory />}
      />

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <BsCalendarPlus />
        Agregar
      </button>

      <Modal
        closeModal={closeModal}
        setcloseModal={setcloseModal}
        titulo="Agregar nuevo producto"
        info="Productos"
        icono={<CgShutterstock />}
        color="#ffffff"
        bac="#0ea5e9"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Nombre"
              {...register("name", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <BsFillBagPlusFill className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Description"
              {...register("description", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <TbClipboardPlus className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Stock"
              {...register("stock", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <SiShutterstock className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Price"
              {...register("price", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <GiReceiveMoney className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <select
            {...register("idCategories", { required: true })}
            className="border-indigo-300 text-gray-500 border w-full py-2 px-4 mt-2 focus:border-indigo-100 rounded outline-none bg-indigo-50 col-span-2"
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.name}
              </option>
            ))}
          </select>

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
              my-4


            "
          />

          <div className="block mt-3">
            <button className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center">
              <CiSaveDown2 size={25} />
              Crear Producto
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        closeModal={closeModal2}
        setcloseModal={setcloseModal2}
        titulo="Editar un producto"
        info="Productos"
        icono={<CgShutterstock />}
        color="#ffffff"
        bac="#0ea5e9"
      >
        <form onSubmit={editarProductos}>
          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Nombre"
              name="name"
              onChange={onInputChange}
              value={name}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <BsFillBagPlusFill className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Description"
              name="description"
              onChange={onInputChange}
              value={description}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <TbClipboardPlus className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Stock"
              name="stock"
              onChange={onInputChange}
              value={stock}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <SiShutterstock className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Precio"
              name="price"
              onChange={onInputChange}
              value={price}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <GiReceiveMoney className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <select
            name="idCategories"
            onChange={onInputChange}
            value={idCategories}
            className="border-indigo-300 text-gray-500 border w-full py-2 px-4 mt-2 focus:border-indigo-100 rounded outline-none bg-indigo-50 col-span-2"
          >
            {categorias.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

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
              my-4


            "
          />

          <div className="block mt-3">
            <button className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center">
              <CiSaveDown2 size={25} />
              Editar Producto
            </button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={productos} />
    </div>
  );
};

export default Inventario;
