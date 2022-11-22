import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAddressCard } from "react-icons/fa";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useProveedores } from "../hooks/useProveedores";
import Datatables from "./Datatables";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { CiSaveDown2 } from "react-icons/ci";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { BsPatchPlus } from "react-icons/bs";

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
        <div className="flex gap-2 items-center">
          <button
            className="p-1 rounded-lg bg-red-500"
            onClick={() => deleteProveedores(row.id)}
          >
            <MdDelete size={23} className="text-white" />
          </button>

          <button
            className="p-1 rounded-lg bg-blue-600"
            onClick={() =>
              Swal.fire(
                "Modulo en mantenimiento",
                "En mantenimiento",
                "warning"
              )
            }
          >
            <MdModeEditOutline className="text-white" size={23} />
          </button>
        </div>
      ),
    },
  ];
  const { proveedores, loadproveedores, addProveedores, deleteProveedores } =
    useProveedores();
  const [closeModal, setcloseModal] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    loadproveedores();
  }, []);

  // Datos del formulario
  const onSubmit = (data) => {
    addProveedores(data);
    reset();
  };

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">
      <Header
        title="Proveedores"
        color="#fff"
        bac="#f472b6"
        icono={<FaAddressCard />}
      />

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <BsPatchPlus />
        Agregar
      </button>

      <Modal
        closeModal={closeModal}
        setcloseModal={setcloseModal}
        titulo="Agregar nuevo Proveedor"
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
              <HiOutlineShieldCheck className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>
          <div className="block mt-3">
            <button className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center">
              <CiSaveDown2 size={25} />
              Crear Proveedor
            </button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={proveedores} />
    </div>
  );
};

export default Proveedores;
