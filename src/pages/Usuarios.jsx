import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Datatables from "./Datatables";
import { FaUserPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useEmpleados, useForms, useRoles, useUsuarios } from "../hooks/";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { sistemaApi } from "../Api";



const Usuarios = () => {

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
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

  const [closeModal, setcloseModal] = useState(false);
  const [closeModal2, setcloseModal2] = useState(false);
  const { handleSubmit, register, reset } = useForm()
  const { roles, loadroles } = useRoles()
  const { empleados, loadempleados } = useEmpleados()
  const { usuarios, loadusuarios, addUsuarios, deleteUsuarios, editUsuarios } = useUsuarios()
  const { onInputChange, onResetForm, setFormState,  name, email, password, idRol, idEmpleado, formState } = useForms({ name: "", email: "", password: "", idRol:"", idEmpleado:"", image: ""})


  const onSubmit = (data) => {
    addUsuarios(data)
    reset()
  }

  useEffect(() => {
    loadusuarios();
    loadroles()
    loadempleados()
  }, [closeModal2]);

  const editar =  async (id) => {
    const { data } = await sistemaApi.get(`/user/${id}`)
    setFormState(data.data)
    setcloseModal2(!closeModal2)
  }

  const editarUsuario = (e) => {
    e.preventDefault()

    editUsuarios({...formState,image: e.target.image.files })
    console.log(e.target.image.files)

  }



  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

      <button
        className="py-2 px-6 flex gap-2 items-center rounded-sm text-white bg-indigo-400"
        onClick={() => setcloseModal(!closeModal)}
      >
        <FaUserPlus />
        Agregar
      </button>


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
                  <option key={empleado.id} value={empleado.id}>{empleado.name}</option>

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




      {/* ========================== editar =============================== */}


      <Modal closeModal={closeModal2} setcloseModal={setcloseModal2}>
        <form onSubmit={editarUsuario}>

          <input
            type="text"
            className="w-full placeholder:text-sm  border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Nombre Usuario"
            name="name"
            onChange={onInputChange}
            value={name}
          />
          <input
            type="email"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Correo Electronico"
            name="email"
            onChange={onInputChange}
            value={email}
          />
          <input
            type="password"
            className="w-full placeholder:text-sm border-indigo-200 border-1 outline-none bg-indigo-100 mb-4 px-4 py-2 rounded focus:border-2"
            placeholder="Contraseña"
            name="password"
            onChange={onInputChange}
          />

          <div>
            <select
              name="idRol"
              onChange={onInputChange}
              value={idRol}
            >

              {
                roles.map(rol => (

                  <option key={rol.id} value={rol.id}>{rol.name}</option>
                ))
              }

            </select>
          </div>

          <div>
            <select 
              name="idEmpleado"
              onChange={onInputChange}
              value={idEmpleado}
            >

              {
                empleados.map(empleado => (
                  <option key={empleado.id} value={empleado.id}>{empleado.name}</option>

                ))
              }
            </select>
          </div>

          <input 
            type="file" 
            name="image"
          
          />

          <div>
            <button>Editar usuario</button>
          </div>

        </form>
      </Modal>

      <Datatables columns={columns} data={usuarios} />
    </div>
  );
};

export default Usuarios;
