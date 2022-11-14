import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { sistemaApi } from "../Api";
import { Modal } from "../components";
import { useCategorias, useForms } from "../hooks/";
import Datatables from "./Datatables";



const Categorias = () => {

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
      name: "description",
      selector: (row) => row.description,
    },
    {
      name: "Opciones",
      selector: (row) => (
        <div className="flex gap-2 items-center">
          <button
            className="p-1 rounded-lg bg-red-500"
            onClick={() => deleteCategorias(row.id)}
          >
            <MdDelete size={25} className="text-white" />
          </button>
          <button
            className="p-1 rounded-lg bg-blue-600"
            onClick={() => editar(row.id)}
          >
            <HiOutlinePencilAlt className="text-white" size={25} />
          </button>
        </div>
      ),
    },
  ];
  
  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { onInputChange, onResetForm, name, description, setFormState, formState } = useForms({name: "", description: ""})
  const { categorias, loadcategorias, addCategorias, deleteCategorias, editCategoria } = useCategorias();


  const editar = async (id) => {

    const { data } = await sistemaApi.get(`/categoria/${id}`)

    setFormState(data.data)
    setcloseModal2(!closeModal2)

  }

  useEffect(() => {
    loadcategorias();
  }, [closeModal2]);

  const onSubmit = (data) => {
    addCategorias(data);
  };


  const editarCategoria = (e) => {
    e.preventDefault()
    editCategoria({...formState})
    onResetForm()
  }
  
  

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        Agregar
      </button>

      <Modal
        closeModal={closeModal}
        setcloseModal={setcloseModal}
        titulo="Agregar nueva Categoria"
      >
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

          <div>
            <button>Crear Categoria</button>
          </div>
        </form>
      </Modal>



      
      <Modal closeModal={closeModal2} setcloseModal={setcloseModal2} titulo="Agregar nueva Categoria" >
        <form onSubmit={editarCategoria}>
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

          <div>
            <button>Editar Categoria</button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={categorias} />
    </div>
  );
};




export default Categorias;
