import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCargos, useForms } from "../../hooks/";
import Datatables from "../../pages/Datatables";
import Modal from "../Modal";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import sistemaApi from "../../Api/sistemaApi";

const Cargos = () => {

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
            onClick={() => deleteCargos(row.id)}
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

  const { cargos, loadCargos,addCargos,deleteCargos,editCargos,} = useCargos();
  const {onInputChange,name,description,setFormState, formState, onResetForm} = useForms({name:"", description:""});
  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  const editar = async (id) => {
    const { data } = await sistemaApi.get(`/cargo/${id}`)
    setFormState(data.data)
    setcloseModal2(!closeModal2)
  };


  const onSubmit = (data) => {
    addCargos(data);
    reset();
  };

  const editarCargos = (e) => {
    e.preventDefault();

    editCargos({...formState})
    onResetForm()
    
  };
  useEffect(() => {
    loadCargos();
  }, [closeModal2]);


  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        Agregar
      </button>

      <Modal
        closeModal={closeModal}
        setcloseModal={setcloseModal}
        titulo="Agregar nuevo Cargo"
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
            <button>Crear Cargo</button>
          </div>
        </form>
      </Modal>

      {/* ========================== Editar =========================== */}

      <Modal
        closeModal={closeModal2}
        setcloseModal={setcloseModal2}
        titulo="editar Cargo"
      >
        <form onSubmit={editarCargos}>
          <input
            type="text"
            className="w-full placeholder:text-sm border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
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
            <button>Editar Cargo</button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={cargos} />
    </div>
  );
};

export default Cargos;
