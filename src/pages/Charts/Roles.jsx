import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../components";
import { useRoles } from "../../hooks/";
import Datatables from "../Datatables";

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
      name: "Opciones",
      selector: (row) => (
        <button onClick={() => deleteRoles(row.id)}>Eliminar</button>
      ),
    },
  ];

  const { roles, loadroles, addRoles, deleteRoles } = useRoles();
  const [closeModal, setcloseModal] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    loadroles();
  }, []);

  // Datos del formulario
  const onSubmit = (data) => {
    addRoles(data);
  };

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

          <div>
            <button>Crear Rol</button>
          </div>
        </form>
      </Modal>
      <Datatables columns={columns} data={roles} />
    </div>
  );
};

export default Roles;
