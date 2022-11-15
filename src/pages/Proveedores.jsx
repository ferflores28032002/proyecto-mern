import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useProveedores } from "../hooks/useProveedores";
import Datatables from "./Datatables";

const Proveedores = () => {

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
          onClick={()=> deleteProveedores(row.id)}
        >Eliminar</button>
  
      ),
    },
  ];
  const { proveedores, loadproveedores, addProveedores, deleteProveedores } = useProveedores();
  const [closeModal, setcloseModal] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    loadproveedores();
  }, []);

  // Datos del formulario
  const onSubmit = (data) => {
    addProveedores(data);
  };

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">

      <Header title="Proveedores" color="#fff" bac="#f472b6" icono={<FaAddressCard/>} />

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
            <button>Crear Proveedor</button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={proveedores} />
    </div>
  );
};

export default Proveedores;
