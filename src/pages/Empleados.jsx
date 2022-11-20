import { useEffect, useState } from "react";
import Datatables from "./Datatables";
import Modal from "../components/Modal";
import { IoPersonAddSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useCargos, useEmpleados, useForms } from "../hooks/";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import sistemaApi from "../Api/sistemaApi";
import { Iconos } from "../helpers/Iconos";
import Header from "../components/Header";
import { FaUserEdit } from "react-icons/fa";

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
            <AiTwotoneEdit className="text-white" size={25} />
          </button>
        </div>
      ),
    },
  ];

  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset, } = useForm();
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
        color="#fff"
        bac="#0ea5e9"
        info="Empleado"
      >
        <form onSubmit={handleSubmit(onSubmit)}>

          <div>

            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Nombres"
                {...register("name", {
                  required: true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <FaUserTie className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div>

            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Apellidos"
                {...register("surnames",{
                  required: true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <RiUserStarFill className="h-4 w-4 mx-3 text-green-500 " />
              </div>
            </div>


            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Edad "
                {...register("age",{
                  required:true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <FaChild className="h-4 w-4 mx-3 text-yellow-500 " />
              </div>

            </div>
            
            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="tel"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Telefono"
                {...register("telephone",{
                  required: true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <BsFillPhoneFill className="h-4 w-4 mx-3 text-purple-600 " />
              </div>

            </div>


            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Salario"
                {...register("salary",{
                  required: true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <MdAttachMoney className="h-4 w-4 mx-3 text-green-700 " />
              </div>

            </div>

            
            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Dirección"
                {...register("direction",{
                  required:true
                })}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <SlDirections className="h-4 w-4 mx-3 text-red-400 " />
              </div>

            </div>


            <select {...register("idCargo",{required: true})}   
              className="border-indigo-300 text-gray-500 border w-full py-2 px-4 mt-2 focus:border-indigo-100 rounded outline-none bg-indigo-50 col-span-2"
            >
              {cargos.map((cargo) => (
                <option
                  key={cargo.id} value={cargo.id}>
                  {cargo.name}
                </option>
              ))}
            </select>


            <div  className="flex w-full py-4 items-center text-gray-500 justify-start gap-6">
              <div className="flex gap-2 items-center">
                <input
                  id="mas"
                  type="radio"
                  value="Masculino"
                  {...register("sex",{
                    required:true
                  })}
                />
                <label htmlFor="mas">Masculino</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  id="fem"
                  type="radio"
                  value="Femenino"
                  {...register("sex", {required:true})}
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

      <Modal
        closeModal={closeModal2}
        setcloseModal={setcloseModal2}
        titulo="Edita los datos del Empleado"
        info="Empleado"
        color="#fff"
        bac="#facc15"
        icono={<FaUserEdit/>}
      >
        <form onSubmit={editarEmpleado}>

          <div>

            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Nombres"
                name="name"
                onChange={onInputChange}
                value={name}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <FaUserTie className="h-4 w-4 mx-3 text-blue-500 " />
              </div>
            </div>

            <div className="relative mt-2 rounded shadow-sm">
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Apellidos"
                name="surnames"
                onChange={onInputChange}
                value={surnames}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <RiUserStarFill className="h-4 w-4 mx-3 text-green-500 " />
              </div>
            </div>


            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Edad "
                name="age"
                onChange={onInputChange}
                value={age}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <FaChild className="h-4 w-4 mx-3 text-yellow-500 " />
              </div>

            </div>
            
            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="tel"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Telefono"
                name="telephone"
                onChange={onInputChange}
                value={telephone}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <BsFillPhoneFill className="h-4 w-4 mx-3 text-purple-600 " />
              </div>

            </div>


            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Salario"
                name="salary"
                onChange={onInputChange}
                value={salary}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <MdAttachMoney className="h-4 w-4 mx-3 text-green-700 " />
              </div>

            </div>

            
            <div className="relative mt-2 rounded shadow-sm">
        
              <input
                type="text"
                className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
                placeholder="Dirección"
                name="direction"
                onChange={onInputChange}
                value={direction}
              />

              <div className="absolute inset-y-0 left-0 flex items-center">
                <SlDirections className="h-4 w-4 mx-3 text-red-400 " />
              </div>

            </div>


            <select name="idCargo" onChange={onInputChange} value={idCargo}   
              className="border-indigo-300 text-gray-500 border w-full py-2 px-4 mt-2 focus:border-indigo-100 rounded outline-none bg-indigo-50 col-span-2"
            >
              {cargos.map((cargo) => (
                <option
                  key={cargo.id} value={cargo.id}>
                  {cargo.name}
                </option>
              ))}
            </select>


            <div  className="flex w-full py-4 items-center text-gray-500 justify-start gap-6">
              <div className="flex gap-2 items-center">
                <input
                  id="mas"
                  type="radio"
                  value="Masculino"
                  name="sex"
                  onChange={onInputChange}
                />
                <label htmlFor="mas">Masculino</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  id="fem"
                  type="radio"
                  value="Femenino"
                  name="sex"
                  onChange={onInputChange}
                />
                <label htmlFor="fem">Femenino</label>
              </div>
            </div>

            <div className="block mt-3 col-span-2">
              <button
                className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center"
              >
                <CiSaveDown2 size={25}/>
                Editar Empleado</button>
            </div>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={empleados} />
    </div>
  );
};
export default Empleados;
