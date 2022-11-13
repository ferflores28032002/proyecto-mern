import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCargos } from "../../hooks/";
import Datatables from "../../pages/Datatables";
import Modal from "../Modal";

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
      name: "Opciones",
      selector: (row) => (
        <button
          onClick={()=> deleteCargos(row.id)}
        >Eliminar</button>
  
      ),
    },
  ];
  const { cargos, loadCargos, addCargos, deleteCargos } = useCargos();
  const [closeModal, setcloseModal] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    loadCargos();
  }, []);

  // Datos del formulario
  const onSubmit = (data) => {
    addCargos(data);
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
            <button>Crear Cargo</button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={cargos} />
    </div>
  );
};

export default Cargos;
