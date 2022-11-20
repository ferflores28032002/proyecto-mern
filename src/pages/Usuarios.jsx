import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Datatables from "./Datatables";
import { FaUserFriends, FaUserPlus, FaUserTie } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEmpleados, useForms, useRoles, useUsuarios } from "../hooks/";
import { MdDelete, MdEmail } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { sistemaApi } from "../Api";
import { Header } from "../components";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { CiSaveDown2 } from "react-icons/ci";
import { Loading } from "../helpers/Loading";

const Usuarios = () => {
  const columns = [
    {
      name: "Empleado",
      selector: (row) => (
        <div className="flex gap-3 items-center">
          <img
            src={row.image_url}
            className="w-9 shadow-2xl  h-9 rounded-full object-cover "
          />

          <span>{row.empleado?.name}</span>
        </div>
      ),
    },
    {
      name: "Usuario",
      selector: (row) => row.name,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
    },
    {
      name: "Rol",
      selector: (row) => row.role.name,
    },
    {
      name: "Opciones",
      selector: (row) => (
        <div className="flex gap-2 items-center">
          <button
            className="p-1 rounded-lg bg-red-500"
            onClick={() => deleteUsuarios(row.id)}
          >
            <MdDelete size={20} className="text-white" />
          </button>
          <button
            className="p-1 rounded-lg bg-blue-600"
            onClick={() => editar(row.id)}
          >
            <HiOutlinePencilAlt className="text-white" size={20} />
          </button>
        </div>
      ),
    },
  ];

  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const { roles, loadroles } = useRoles();
  const { empleados, loadempleados } = useEmpleados();
  const { usuarios, loadusuarios, addUsuarios, deleteUsuarios, editUsuarios, loading } =
    useUsuarios();
  const {
    onInputChange,
    onResetForm,
    setFormState,
    name,
    email,
    password,
    idRol,
    idEmpleado,
    formState,
  } = useForms({
    name: "",
    email: "",
    password: "",
    idRol: "",
    idEmpleado: "",
    image: "",
  });

  const onSubmit = (data) => {
    addUsuarios(data);
    reset();
  };

  useEffect(() => {
    loadusuarios();
    loadroles();
    loadempleados();
  }, [closeModal2]);

  const editar = async (id) => {
    const { data } = await sistemaApi.get(`/user/${id}`);
    setFormState(data.data);
    setcloseModal2(!closeModal2);
  };

  const editarUsuario = (e) => {
    e.preventDefault();

    editUsuarios({ ...formState, image: e.target.image.files });
  };


  if(loading) {
    return <Loading/>
  }

  return (
    <div className="m-2  md:mx-10 p-2 md:px-10 bg-white rounded-3xl">
      <Header
        title="Usuarios"
        color="#fff"
        bac="#fcd34d"
        icono={<FaUserFriends />}
      />

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <FaUserPlus />
        Agregar
      </button>

      <Modal
        closeModal={closeModal}
        setcloseModal={setcloseModal}
        color="#fff"
        bac="#fde047"
        icono={<FaUserPlus />}
        info="Usuarios"
        titulo="Agregar nuevo usuario"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="text"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Nombres"
              {...register("name", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <FaUserTie className="h-4 w-4 mx-3 text-blue-500 " />
            </div>
          </div>

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="email"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="Correo Electronico"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <MdEmail className="h-4 w-4 mx-3 text-yellow-500 " />
            </div>
          </div>

          <div className="relative mt-2 rounded shadow-sm">
            <input
              type="password"
              className="border bg-indigo-50 text-gray-500 border-indigo-200 rounded py-2 pr-3 pl-10 w-full focus:border-indigo-100 outline-none"
              placeholder="password"
              {...register("password", {
                required: true,
              })}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <RiLockPasswordFill className="h-4 w-4 mx-3 text-green-500 " />
            </div>
          </div>

          <select
            {...register("idRol", { required: true })}
            className="border-indigo-300 text-gray-500 border w-full py-2 px-4 mt-2 focus:border-indigo-100 rounded outline-none bg-indigo-50 col-span-2"
          >
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>

          <select
            {...register("idEmpleado", { required: true })}
            className="border-indigo-300 text-gray-500 border w-full py-2 px-4 mt-2 focus:border-indigo-100 rounded outline-none bg-indigo-50 col-span-2"
          >
            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            {...register("image")}
            className="
              file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
              file:px-4 file:py-1 file:m-2
              file:border-none
              file:rounded-full
              file:text-white
              file:cursor-pointer
              file:shadow-lg file:shadow-blue-600/50
              font-semibold
              text-white/80
              text-indigo-400
              pr-4
              rounded-full
              cursor-pointer
              shadow-lg shadow-gray-700/30
              my-4


            "
          />

          <div className="block mt-3">
            <button className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center">
              <CiSaveDown2 size={25} />
              Crear Usuario
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        closeModal={closeModal2}
        setcloseModal={setcloseModal2}
        color="#fff"
        bac="#3b82f6"
        info="Usuarios"
        titulo="Editar usuarios"
      >
        <form onSubmit={editarUsuario}>
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
              placeholder="Correo Electronico"
              name="email"
              onChange={onInputChange}
              value={email}
            />

            <div className="absolute inset-y-0 left-0 flex items-center">
              <MdEmail className="h-4 w-4 mx-3 text-yellow-500 " />
            </div>
          </div>

          <select
            name="idRol"
            onChange={onInputChange}
            value={idRol}
            className="border-indigo-300 text-gray-500 border w-full py-2 px-4 mt-2 focus:border-indigo-100 rounded outline-none bg-indigo-50 col-span-2"
          >
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>
                {rol.name}
              </option>
            ))}
          </select>

          <select
            name="idEmpleado"
            onChange={onInputChange}
            value={idEmpleado}
            className="border-indigo-300 text-gray-500 border w-full py-2 px-4 mt-2 focus:border-indigo-100 rounded outline-none bg-indigo-50 col-span-2"
          >
            {empleados.map((empleado) => (
              <option key={empleado.id} value={empleado.id}>
                {empleado.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            {...register("image")}
            className="
              file:bg-gradient-to-b file:from-blue-500 file:to-blue-600
              file:px-4 file:py-1 file:m-2
              file:border-none
              file:rounded-full
              file:text-white
              file:cursor-pointer
              file:shadow-lg file:shadow-blue-600/50
              font-semibold
              text-white/80
              text-indigo-400
              pr-4
              rounded-full
              cursor-pointer
              shadow-lg shadow-gray-700/30
              my-4


            "
          />

          <div className="block mt-3">
            <button className="w-full py-2 bg-blue-600 text-center text-white rounded font-semibold hover:bg-blue-800 flex items-center gap-3 justify-center">
              <CiSaveDown2 size={25} />
              Editar Usuario
            </button>
          </div>
        </form>
      </Modal>

      <Datatables columns={columns} data={usuarios} />
    </div>
  );
};

export default Usuarios;
