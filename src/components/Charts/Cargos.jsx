import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCargos, useForms } from "../../hooks/";
import Datatables from "../../pages/Datatables";
import Modal from "../Modal";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilAlt, HiOutlineShieldCheck } from "react-icons/hi";
import sistemaApi from "../../Api/sistemaApi";
import Header from "../Header";
import { FaUserShield } from "react-icons/fa";
import { GiBlackHandShield } from "react-icons/gi";
import { RiFolderShield2Line } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { ImUserTie } from "react-icons/im";

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

  const { cargos, loadCargos, addCargos, deleteCargos, editCargos } =
    useCargos();
  const {
    onInputChange,
    name,
    description,
    setFormState,
    formState,
    onResetForm,
  } = useForms({ name: "", description: "" });
  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm();

  const editar = async (id) => {
    const { data } = await sistemaApi.get(`/cargo/${id}`);
    setFormState(data.data);
    setcloseModal2(!closeModal2);
  };

  const onSubmit = (data) => {
    addCargos(data);
    reset();
  };

  const editarCargos = (e) => {
    e.preventDefault();

    editCargos({ ...formState });
    onResetForm();
  };
  useEffect(() => {
    loadCargos();
  }, [closeModal2]);

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">
      <Header
        title="Cargos"
        bac="#eab308"
        color="#fff"
        icono={<FaUserShield />}
      />

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <ImUserTie />
        Agregar
      </button>

      <Modal
        closeModal={closeModal}
        setcloseModal={setcloseModal}
        titulo="Agregar nuevo Cargo"
        info="Cargo"
        icono={<GiBlackHandShield />}
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

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Descripción"
              {...register("description", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <RiFolderShield2Line className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="block mt-3">
            <button className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center">
              <CiSaveDown2 size={25} />
              Crear Cargo
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        closeModal={closeModal2}
        setcloseModal={setcloseModal2}
        titulo="Editar Cargo"
        info="Cargos"
        icono={<GiBlackHandShield />}
      >
        <form onSubmit={editarCargos}>
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
              <HiOutlineShieldCheck className="h-4 w-4 mx-3 text-blue-500 " />
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
              <RiFolderShield2Line className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="block mt-3">
            <button className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center">
              <CiSaveDown2 size={25} />
              Editar Cargo
            </button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={cargos} />
    </div>
  );
};

export default Cargos;
