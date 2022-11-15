import { useEffect, useState } from "react";
import Datatables from "./Datatables";
import Modal from "../components/Modal";
import { IoPersonAddSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useCargos, useEmpleados, useForms } from "../hooks/";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import sistemaApi from "../Api/sistemaApi";
import { Iconos } from "../helpers/Iconos";
import Header from "../components/Header";

const Empleados = () => {
  const columns = [
    {
      name: "Nombres",
      selector: (row) => row.name,
    },
    {
      name: "Apellidos",
      selector: (row) => row.surnames,
    },
    {
      name: "Sexo",
      selector: (row) => row.sex,
    },
    {
      name: "Telefono",
      selector: (row) => row.telephone,
    },

    {
      name: "Cargo",
      selector: (row) => row.cargo.name,
    },
    {
      name: "Dirección",
      selector: (row) => row.direction,
    },
    {
      name: "Opciones",
      selector: (row) => (
        <div className="flex gap-2 items-center">
          <button
            className="p-1 rounded-lg bg-red-500"
            onClick={() => deleteEmpleados(row.id)}
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
  const {
    empleados,
    loadempleados,
    addEmpleados,
    deleteEmpleados,
    editEmpleados,
  } = useEmpleados();
  const { cargos, loadCargos } = useCargos();
  const {
    onInputChange,
    onResetForm,
    name,
    surnames,
    age,
    telephone,
    salary,
    direction,
    sex,
    idCargo,
    formState,
    setFormState,
  } = useForms({
    name: "",
    surnames: "",
    age: "",
    telephone: "",
    salary: "",
    direction: "",
    sex: "",
    idCargo: "",
  });
  const { FaUserTie, RiUserStarFill,FaChild,BsFillPhoneFill, MdAttachMoney,SlDirections ,CiSaveDown2} = Iconos();

  useEffect(() => {
    loadempleados();
    loadCargos();
  }, [closeModal2]);

  // Datos del formulario
  const onSubmit = (data) => {
    addEmpleados(data);
    reset()
  };

  const editar = async (id) => {
    const { data } = await sistemaApi.get(`/empleado/${id}`);
    setFormState(data.data);
    setcloseModal2(!closeModal2);
  };

  const editarEmpleado = (e) => {
    e.preventDefault();
    editEmpleados({ ...formState });
    onResetForm();
  };

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">

      <Header title="Empleados" icono={<FaUserTie/>}/>

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <IoPersonAddSharp />
        Agregar
      </button>

      <Modal
        closeModal={closeModal}
        setcloseModal={setcloseModal}
        titulo="Agregar nuevo Empleado"
      >
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="grid grid-cols-2 gap-3">

            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-2 outline-none"
                placeholder="Nombres"
                {...register("name")}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <FaUserTie className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div>

            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-2 outline-none"
                placeholder="Apellidos"
                {...register("surnames")}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <RiUserStarFill className="h-4 w-4 mx-3 text-green-500 " />
              </div>
            </div>


            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-2 outline-none"
                placeholder="Edad "
                {...register("age")}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <FaChild className="h-4 w-4 mx-3 text-yellow-500 " />
              </div>

            </div>
            
            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="tel"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-2 outline-none"
                placeholder="Telefono"
                {...register("telephone")}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <BsFillPhoneFill className="h-4 w-4 mx-3 text-purple-600 " />
              </div>

            </div>


            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-2 outline-none"
                placeholder="Salario"
                {...register("salary")}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <MdAttachMoney className="h-4 w-4 mx-3 text-green-700 " />
              </div>

            </div>

            
            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-2 outline-none"
                placeholder="Dirección"
                {...register("direction")}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <SlDirections className="h-4 w-4 mx-3 text-red-400 " />
              </div>

            </div>


            <select {...register("idCargo")}   
              className="w-full py-2 px-4 mt-2 rounded outline-none bg-indigo-100 col-span-2"
            >
              {cargos.map((cargo) => (
                <option
                  key={cargo.id} value={cargo.id}>
                  {cargo.name}
                </option>
              ))}
            </select>


            <div  className="flex w-full py-4 items-center justify-start gap-6">
              <div className="flex gap-2">
                <input
                  id="mas"
                  type="radio"
                  value="Masculino"
                  {...register("sex")}
                />
                <label htmlFor="mas">Masculino</label>
              </div>
              <div className="flex gap-2">
                <input
                  id="fem"
                  type="radio"
                  value="Femenino"
                  {...register("sex")}
                />
                <label htmlFor="fem">Femenino</label>
              </div>
            </div>

            <div className="block mt-3 col-span-2">
              <button
                className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center"
              >
                <CiSaveDown2 size={25}/>
                Crear Empleado</button>
            </div>
          </div>
        </form>
      </Modal>

      {/* =========================editar================================== */}

      <Modal
        closeModal={closeModal2}
        setcloseModal={setcloseModal2}
        titulo="Agregar nuevo usuario"
      >
        <form onSubmit={editarEmpleado}>
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
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Apellidos"
            name="surnames"
            onChange={onInputChange}
            value={surnames}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Edad"
            name="age"
            onChange={onInputChange}
            value={age}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Teléfono"
            name="telephone"
            onChange={onInputChange}
            value={telephone}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Salario"
            name="salary"
            onChange={onInputChange}
            value={salary}
          />
          <input
            type="text"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Dirección"
            name="direction"
            onChange={onInputChange}
            value={direction}
          />
          <div>
            <div>
              <input
                id="mas"
                type="radio"
                value="Masculino"
                {...register("sex")}
              />
              <label htmlFor="mas">Masculino</label>
            </div>
            <div>
              <input
                id="fem"
                type="radio"
                value="Femenino"
                {...register("sex")}
              />
              <label htmlFor="fem">Femenino</label>
            </div>
          </div>

          <select name="idCargo" onChange={onInputChange} value={idCargo}>
            {cargos.map((cargo) => (
              <option key={cargo.id} value={cargo.id}>
                {cargo.name}
              </option>
            ))}
          </select>

          <div>
            <button>Editar Empleado</button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={empleados} />
    </div>
  );
};
export default Empleados;
