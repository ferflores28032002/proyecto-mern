import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { sistemaApi } from "../Api";
import { Header, Modal } from "../components";
import { useCategorias, useForms } from "../hooks/";
import Datatables from "./Datatables";
import { Iconos } from "../helpers/Iconos";
import { CgMenuGridR, CgPlayPauseR } from "react-icons/cg";
import { AiOutlineBook } from "react-icons/ai";
import { CiSaveDown2 } from "react-icons/ci";



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
  const {IoMdOptions} = Iconos()

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
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">

    <Header title="Categorias" color="#fff" bac="#db2777" icono={<IoMdOptions/>} />

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <CgMenuGridR/>
        Agregar
      </button>

      <Modal
        closeModal={closeModal}
        setcloseModal={setcloseModal}
        titulo="Agregar nueva Categoria"
        info="Categorias"
        icono={<CgPlayPauseR/>}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
                
            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Nombre"
                {...register("name",{
                  required:true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <CgPlayPauseR className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div>
          

            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Descripción"
                {...register("description",{
                  required:true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <AiOutlineBook className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div>

            <div className="block mt-3">
              <button
                className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center"
              >
                <CiSaveDown2 size={25}/>
                Crear Categoria</button>
            </div>
        </form>
      </Modal>



      
      <Modal 
        closeModal={closeModal2} 
        setcloseModal={setcloseModal2} 
        titulo="Editar Categoria"
        info="Categorias"
        icono={<CgPlayPauseR/>}
        
        >
        <form onSubmit={editarCategoria}>
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
                <CgPlayPauseR className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div>
          

            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Descripción"
                name="description"
                onChange={onInputChange}
                value={description}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <AiOutlineBook className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div>

            <div className="block mt-3">
              <button
                className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center"
              >
                <CiSaveDown2 size={25}/>
                Editar Categoria</button>
            </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={categorias} />
    </div>
  );
};




export default Categorias;
