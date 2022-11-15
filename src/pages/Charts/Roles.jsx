import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Header, Modal } from "../../components";
import { useForms, useRoles } from "../../hooks/";
import Datatables from "../Datatables";
import { MdDelete, MdOutlineVerifiedUser } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { sistemaApi } from "../../Api";

const Roles = () => {
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
            onClick={() => deleteRoles(row.id)}
          >
            <MdDelete size={25} className="text-white" />
          </button>
          <button
            className="p-1 rounded-lg bg-blue-600"
            onClick={()=>editar(row.id)}
          >
            <HiOutlinePencilAlt className="text-white" size={25} />
          </button>
        </div>
      ),
    },
  ];

  const { roles, loadroles, addRoles, deleteRoles, editRoles} = useRoles();
  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { onInputChange, onResetForm, setFormState, name, description, formState } = useForms({ name: "", description: ""})

  useEffect(() => {
    loadroles();
  }, [closeModal2]);

  const editar = async (id) => {

    const { data } = await sistemaApi.get(`/rol/${id}`)

    setFormState(data.data)
    setcloseModal2(!closeModal2)

  }

  const onSubmit = (data) => {
    addRoles(data);
  };

  const editarRoles = (e) => {
    e.preventDefault()
    editRoles({...formState})
  }

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">

      <Header title="Roles de usuario" bac="#22c55e" color="#fff" icono={<MdOutlineVerifiedUser/>} />

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
            <button>Crear Rol</button>
          </div>
        </form>
      </Modal>


    {/* =================== editar =========================== */}


    <Modal
        closeModal={closeModal2}
        setcloseModal={setcloseModal2}
        titulo="Editar nuevo Cargo"
      >
        <form onSubmit={editarRoles}>
          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Nombres"
            name="name"
            value={name}
            onChange={onInputChange}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="description"
            name="description"
            value={description}
            onChange={onInputChange}

          />

          <div>
            <button>Editar Rol</button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={roles} />
    </div>
  );
};

export default Roles;
