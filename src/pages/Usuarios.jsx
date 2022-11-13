import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Datatables from "./Datatables";
import { FaUserPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEmpleados, useRoles, useUsuarios } from "../hooks/";



const Usuarios = () => {

  const columns = [
    {
      name: "Usuario",
      selector: (row) => row.name,
    },
    {
      name: "Correo",
      selector: (row) => row.email,
    },
    {
      name: "Opciones",
      selector: (row) => (
  
        <button
          onClick={()=> deleteUsuarios(row.id)}
        >eliminar</button>
      )
    },
  ];
  const [closeModal, setcloseModal] = useState(false);
  const { handleSubmit, register, reset } = useForm()
  const { usuarios, loadusuarios, addUsuarios, deleteUsuarios } = useUsuarios()
  const { roles, loadroles } = useRoles()
  const { empleados, loadempleados } = useEmpleados()


  const onSubmit = (data) => {
    addUsuarios(data)
    reset()
  }

  useEffect(() => {
    loadusuarios();
    loadroles()
    loadempleados()
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <FaUserPlus />
        Agregar
      </button>

      <Datatables columns={columns} data={usuarios} />

      <Modal closeModal={closeModal} setcloseModal={setcloseModal}>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Nombre Usuario"
            {...register("name")}
          />
          <input
            type="email"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Correo Electronico"
            {...register("email")}
          />
          <input
            type="password"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Contraseña"
            {...register("password")}
          />

          <div>
            <select {...register("idRol")} >

              {
                roles.map(rol => (

                  <option key={rol.id} value={rol.id}>{rol.name}</option>
                ))
              }

            </select>
          </div>

          <div>
            <select {...register("idEmpleado")}>

              {
                empleados.map(empleado => (
                  <option value={empleado.id}>{empleado.name}</option>

                ))
              }
            </select>
          </div>

          <input 
            type="file" 
            {...register("image")}
          
          />

          <div>
            <button>Crear usuario</button>
          </div>

        </form>
      </Modal>

    </div>
  );
};

export default Usuarios;
