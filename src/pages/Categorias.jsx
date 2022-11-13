import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../components";
import { useCategorias } from "../hooks/";
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
      name: "Acciones",
      cell: (row) => (<button
      onClick={()=> deleteCategorias(row.id)}
      >Eliminar</button>)
    },
  ];
  const [closeModal, setcloseModal] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { categorias, loadcategorias, addCategorias, deleteCategorias } = useCategorias();

  useEffect(() => {
    loadcategorias();
  }, []);


  // Datos del formulario
  const onSubmit = (data) => {
    addCategorias(data);
  };

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

          <div>
            <button>Crear Categoria</button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={categorias} />
    </div>
  );
};




export default Categorias;
